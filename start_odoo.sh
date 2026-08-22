#!/usr/bin/env bash

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker command not found. Please install and launch Docker Desktop or OrbStack."
    exit 1
fi

echo "Starting Postgres container (pulse-db)..."
docker run -d \
  -e POSTGRES_USER=odoo \
  -e POSTGRES_PASSWORD=odoo \
  -e POSTGRES_DB=postgres \
  --name pulse-db \
  postgres:15

echo "Starting Odoo 17 container (pulse-odoo)..."
docker run -d \
  -p 8069:8069 \
  --name pulse-odoo \
  --link pulse-db:db \
  -v "$(pwd)/addons:/mnt/extra-addons" \
  -t odoo:17

echo "Checking container status..."
docker ps --filter "name=pulse-"
