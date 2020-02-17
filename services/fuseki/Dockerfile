FROM java:8-jre-alpine

RUN apk add --no-cache --update pwgen bash curl wget ca-certificates && rm -rf /var/cache/apk/*

ENV FUSEKI_SHA512 e934431a4b76c347c71480c620b19263b46cde359d3da508acffbe92ef21168eea2a17478f68e4b583a55a4e3a8b0c6b0e1b558ee8eba54bd777b3909669e7da
ENV FUSEKI_VERSION 3.12.0
ENV JENA_SHA512 d1eba835acd0d15f959dd403918e17bc7e44312d3788640ab6a0d3453b22105f40a2c5feea675137d2773db74e4ca15dd018ff16d8576e01fdceba81e36f04fa
ENV JENA_VERSION 3.12.0

ENV MIRROR http://www.eu.apache.org/dist/
ENV ARCHIVE http://archive.apache.org/dist/

#VOLUME /fuseki
# Config and data
ENV FUSEKI_BASE /fuseki
# Installation folder
ENV FUSEKI_HOME /jena-fuseki

ENV JENA_HOME /jena
ENV JENA_BIN $JENA_HOME/bin

WORKDIR /tmp
# sha512 checksum
RUN echo "$FUSEKI_SHA512  fuseki.tar.gz" > fuseki.tar.gz.sha512
# Download/check/unpack/move Fuseki in one go (to reduce image size)
RUN wget -O fuseki.tar.gz $MIRROR/jena/binaries/apache-jena-fuseki-$FUSEKI_VERSION.tar.gz || \
    wget -O fuseki.tar.gz $ARCHIVE/jena/binaries/apache-jena-fuseki-$FUSEKI_VERSION.tar.gz && \
    sha512sum -c fuseki.tar.gz.sha512 && \
    tar zxf fuseki.tar.gz && \
    mv apache-jena-fuseki* $FUSEKI_HOME && \
    rm fuseki.tar.gz* && \
    cd $FUSEKI_HOME && rm -rf fuseki.war

# Get tdbloader2 from Jena
# sha512 checksum
RUN echo "$JENA_SHA512  jena.tar.gz" > jena.tar.gz.sha512
# Download/check/unpack/move Jena in one go (to reduce image size)
RUN wget -O jena.tar.gz $MIRROR/jena/binaries/apache-jena-$JENA_VERSION.tar.gz || \
    wget -O jena.tar.gz $ARCHIVE/jena/binaries/apache-jena-$JENA_VERSION.tar.gz && \
    sha512sum -c jena.tar.gz.sha512 && \
    tar zxf jena.tar.gz && \
	mkdir -p $JENA_BIN && \
	mv apache-jena*/lib $JENA_HOME && \
	mv apache-jena*/bin/tdbloader2* $JENA_BIN && \
    rm -rf apache-jena* && \
rm jena.tar.gz*


COPY ./config/shiro.ini $FUSEKI_HOME/shiro.ini
COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh


ENV ASSEMBLER $FUSEKI_HOME/configuration/assembler.ttl
COPY ./config/assembler.ttl $ASSEMBLER
COPY ./config/config.ttl $FUSEKI_HOME/config.ttl


ENV JAVA_CMD java -cp "$FUSEKI_HOME/fuseki-server.jar:/javalibs/*"
ENV TEXTINDEXER $JAVA_CMD jena.textindexer --desc=$FUSEKI_BASE/configuration/core.ttl

WORKDIR /jena-fuseki

EXPOSE 3030
USER 9008
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/jena-fuseki/fuseki-server"]