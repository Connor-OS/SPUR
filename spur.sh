#!/bin/bash

# Exit immediately on error
set -e

# Create the Docker network if it doesn't already exist
docker network inspect spur-network >/dev/null 2>&1 || \
  docker network create spur-network

# Stop and remove existing containers if running
docker rm -f spur spur-app 2>/dev/null || true

# Start MongoDB container
docker run -d \
  --name spur \
  --network spur-network \
  -p 27017:27017 \
  mongo:latest

# Build your Node.js app image
docker build -t spur-app .

# Start your app container
docker run -d \
  --name spur-app \
  --network spur-network \
  -p 3000:3000 \
  spur-app

echo "✅ All containers are up and running."
echo "🌐 App: http://localhost:3000"
