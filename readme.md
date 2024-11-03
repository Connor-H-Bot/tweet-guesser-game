# Help me! Trumpter

## Running when the code on the server is up to date:
Once you have ssh'd into the server, from the trumpter_admin folder (default when first logged in):
1. Run the start script
   ```bash
   chmod +x start_servers.sh
    ./start_servers.sh
    ```
2. Verify the server is live by going to the website http://40.83.206.141:3000/

## Updating code from Github and updating:
1. Pull git changes (from `/home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game` base) (the required passphrase is 'help me!')
    ```
    cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game
    git fetch origin
    git reset --hard origin/main
    
    ```
2. Navigate to the backend directory and modify the settings file (alter settings.py)
   ```bash
   cd /home/trumpter_admin/tweet_guesser_v2/tweet-guesser-game/backend/trumptweetguesser
   ```
3. Inside settings.py make the following changes:
     Line 21-22: (comment out default secret key, use the environment variable)
         ```bash

         #SECRET_KEY = 'django-insecure-mfx5u3qr6x*a*v&1wrmfl64vw=s%e+*ksb^iju!zaxpbyvq7dq'
         SECRET_KEY = os.environ["SECRET_KEY"] # # TODO: use the env variable in production
          ```
      Line 25: (set debug to False, which is true by default)
         ```bash
   
          DEBUG = False
          ```

## Running the Backend (macOS)

1. Navigate to the `/backend` directory:
    ```bash
    cd backend
    ```

2. Set up and activate the virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Once the virtual environment is active, install Django:
    ```bash
    python3 -m pip install Django
    ```

4. Run the development server:
    ```bash
    python3 manage.py runserver
    ```

5. (Optional) Install `django-cors-headers`:
    ```bash
    pip install django-cors-headers
    ```

## Running the Frontend 

1. Ensure you have a `node_modules` folder. This folder is ignored by `.gitignore`, but the default `npx` installation will handle it. You can also skip to step 2

2. If you do not have `node_modules` installed:
    ```bash
    sudo apt install nodejs npm
    npm install
    ```
3. Run the commands:
   ```bash
    npm run build
    serve -s build
    ```

## Database Query to Fetch Random Tweets

To retrieve a random combination of tweets from the database, run the following SQL query:
```sql
SELECT * FROM random_tweets_view;
