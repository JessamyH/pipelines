#!/bin/sh
# wait-for.sh - Wait for MySQL to be ready

set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host 3306
do
  echo "Waiting for MySQL at $host:3306..."
  sleep 1
done

echo "MySQL is up - executing command"
exec $cmd
