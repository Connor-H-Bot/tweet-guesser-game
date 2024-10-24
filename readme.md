# Help me! Trumpter

Written for testing on mac, deployment on ubuntu server. Once you have ssh'd into the server, from the trumpter_admin folder (default when first logged in):
1. Run the start script
   ```bash
    ./start_servers.sh
    ```
2. Verify the server is live by going to the website http://40.83.206.141:3000/

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
