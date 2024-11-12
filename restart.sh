#!/bin/bash

# Kill existing backend (Django) and frontend (serve) processes
echo "Stopping existing server processes..."

# Find and kill Django process (port 8000)
fuser -k 8000/tcp

# Wait for a moment to ensure the processes are fully terminated
sleep 2

# Pull the latest content from github
echo "Pulling latest version of the backend from github."
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game
git fetch origin
git reset --hard origin/main

# Restart the backend server
echo "Starting backend server..."
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game/backend
source venv/bin/activate
nohup python3 manage.py runserver 0.0.0.0:8000 > /dev/null 2>&1 &

# Confirm successful restart
echo "Server restarted successfully."