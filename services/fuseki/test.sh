#!/bin/bash

echo ". $(curl -I http://localhost:8080 2>/dev/null | head -n 1 | cut -d$' ' -f2)"
while [[ $(curl -I http://localhost:3030 2>/dev/null | head -n 1 | cut -d$' ' -f2) != '200' ]]; do
  sleep 1s
  echo ". $(curl -I http://localhost:3030 2>/dev/null | head -n 1 | cut -d$' ' -f2)"
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080)"
done