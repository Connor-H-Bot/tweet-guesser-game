#!/bin/bash

# Navigate to backend directory
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game/backend

# Activate the virtual environment
source venv/bin/activate

# Start Django server in the background with nohup
nohup python3 manage.py runserver 0.0.0.0:8000 &

# Navigate to frontend directory
cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game/frontend

# Start the frontend server in the background with nohup
nohup serve -s build &
