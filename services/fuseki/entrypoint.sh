#!/bin/bash

set -e

if [ ! -f "$FUSEKI_BASE/shiro.ini" ] ; then
  # First time
  echo "###################################"
  echo "Initializing Apache Jena Fuseki"
  echo ""
  cp "$FUSEKI_HOME/shiro.ini" "$FUSEKI_BASE/shiro.ini"
  if [ -z "$ADMIN_PASSWORD" ] ; then
    ADMIN_PASSWORD=$(pwgen -s 15)
    echo "Randomly generated admin password:"
    echo ""
    echo "admin=$ADMIN_PASSWORD"
  fi
  echo ""
  echo "###################################"
fi

if [ ! -d "$FUSEKI_BASE/configuration" ] ; then 
  mkdir "$FUSEKI_BASE/configuration"
fi

cp "$ASSEMBLER" "$FUSEKI_BASE/configuration/core.ttl"
cp "$FUSEKI_HOME/config.ttl" "$FUSEKI_BASE/config.ttl"
# $ADMIN_PASSWORD can always override
if [ -n "$ADMIN_PASSWORD" ] ; then
  sed -i "s/^admin=.*/admin=$ADMIN_PASSWORD/" "$FUSEKI_BASE/shiro.ini"
fi

exec "$@" &

echo "Wait until server is up:"

while [[ $(curl -I http://localhost:3030 2>/dev/null | head -n 1 | cut -d$' ' -f2) != '200' ]]; do
  sleep 1s
done

#echo "Loading  $FILE to Fuseki TDB database core:"
echo "#########"
#echo "# Indexing... "
#exec chgrp -R 0 $FUSEKI_BASE \
#    && chmod -R g+rwX $FUSEKI_BASE
#exec $TEXTINDEXER
echo "### DONE ###"
#if [ "$FILE" ] ; then
  #exec $FUSEKI_HOME/load.sh core $FILE
#fi

# Convert env to datasets
printenv | egrep "^FUSEKI_DATASET_" | while read env_var
do
    dataset=$(echo $env_var | egrep -o "=.*$" | sed 's/^=//g')
    curl -s 'http://localhost:3030/$/datasets'\
         -H "Authorization: Basic $(echo -n admin:${ADMIN_PASSWORD} | base64)" \
         -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8'\
         --data "dbName=${dataset}&dbType=tdb"
done

wait