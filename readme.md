Help me! I need to build the Trumpter initial codebase:

steps to run on macos:
navigate to /backend and run:
    python3 -m venv venv
    source venv/bin/activate
... once the venv is live
    python3 -m pip install Django
    python3 manage.py runserver 
(optional)
    pip install django-cors-headers

and in the front end:
    make sure you have a /nodemodules/ folder (it is ignored by gitignore, but the default npx nodemodules is enough)
    
To get a tweet combo, run this on the database:
    SELECT * FROM random_tweets_view;

Ubuntu deployment server:
    ssh trumpter_admin@40.83.206.141 
update if on a new server
    sudo apt update
    sudo apt upgrade -y
    sudo apt install nginx -y
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    sudo apt install python3 python3-pip python3-venv -y
    sudo pip3 install gunicorn
    sudo apt install sqlite3