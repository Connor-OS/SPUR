#!/bin/bash

# Create the Docker network if it doesn't already exist
docker network inspect spur-network >/dev/null 2>&1 || \
  docker network create spur-network

# Stop and remove existing containers if running
echo "Removing old containers"
docker rm -f spur-app spur-redis email-worker 3>/dev/null || true

# Check if container 'spur' is already running or exists
if [ "$(docker ps -a -q -f name=^/spur$)" ]; then
  echo "MongoDB container 'spur' already exists. Skipping startup."
else
  echo "Starting MongoDB container..."
  docker run -d \
    --name spur \
    --network spur-network \
    -p 27017:27017 \
    mongo:latest
fi

echo "Staring Redis"
# Start Redis container
docker run -d \
  --name spur-redis \
  --network spur-network \
  -p 6379:6379 \
  redis:latest

# Build your Node.js app image
docker build -t spur-app .

echo "Staring application"
# Start your app container
docker run -d \
  --name spur-app \
  --network spur-network \
  -p 3000:3000 \
  spur-app

docker build -f Dockerfile.worker -t email-worker .

echo "Staring Email worker"
# Start the email worker container
docker run -d \
  --name email-worker \
  --network spur-network \
  -p 587:587 \
  email-worker

echo "✅ All containers are up and running."
echo "🌐 App: http://localhost:3000"
