Trumpter initial codebase. 

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
    