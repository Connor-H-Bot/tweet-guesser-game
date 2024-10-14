# Trumpter

Written for testing on mac, deployment on ubuntu server

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

## Running the Frontend (macOS)

1. Ensure you have a `node_modules` folder. This folder is ignored by `.gitignore`, but the default `npx` installation will handle it.

2. If you do not have `node_modules` installed:
    ```bash
    sudo apt install nodejs npm
    npm install
    ```

## Database Query to Fetch Random Tweets

To retrieve a random combination of tweets from the database, run the following SQL query:
```sql
SELECT * FROM random_tweets_view;
