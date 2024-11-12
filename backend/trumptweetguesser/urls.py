from django.contrib import admin
from django.urls import path
from tweetguesser import views

urlpatterns = [
    path(
        "random_tweets_view/", views.random_tweets_view, name="random_tweets_view"
    ),  # simple API to get tweets
]
