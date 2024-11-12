#!/bin/bash

# Pull the latest content from github
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game
git fetch origin
git reset --hard origin/main

# Navigate to backend directory
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game/backend

# Activate the virtual environment
source venv/bin/activate

# Start Django server in the background with nohup
nohup python3 manage.py runserver 0.0.0.0:8000 > /dev/null 2>&1 &