import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render  # chaptgpr code
from django.db import reset_queries
from .models import Tweet, Tweet_v2
import json


# function for calling two random tweets. Returns as an array with the two tweets that have fields for true/false, id, content, year
def random_tweets_view(request):
    reset_queries()
    # Call the custom manager method
    result = Tweet_v2.objects.get_random_tweets()

    tweets = []
    for row in result:
        tweets.append(
            {
                "tweet_type": row[0],
                "id": row[1],
                "tweet_content": row[2],
                "tweet_year": row[3],
            }
        )

    random.shuffle(tweets)

    return JsonResponse({"tweets": tweets})
