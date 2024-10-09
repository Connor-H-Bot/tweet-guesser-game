import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render #chaptgpr code
from django.db import reset_queries
from .models import Tweet, Tweet_v2
import json

def random_trump_tweet(request):
    real_tweets = Tweet.objects.filter(is_trump=True)
    tweet_count = real_tweets.count()

    if tweet_count == 0:
        return JsonResponse({"errormsg": "nothing in the DB"}, status=418)

    random_index = random.randint(0,tweet_count-1)
    random_tweet = real_tweets[random_index]
    return JsonResponse({"tweet": random_tweet.text})

def random_fake_tweet(request):
    real_tweets = Tweet.objects.filter(is_trump=False)
    tweet_count = real_tweets.count()

    if tweet_count == 0:
        return JsonResponse({"errormsg": "nothing in the DB"}, status=418)

    random_index = random.randint(0,tweet_count-1)
    random_tweet = real_tweets[random_index]
    return JsonResponse({"tweet": random_tweet.text})

# function for calling two random tweets. Returns as an array with the two tweets that have fields for true/false, id, content, year
def random_tweets_view(request):
    reset_queries()
    # Call the custom manager method
    result = Tweet_v2.objects.get_random_tweets()

    tweets = []
    for row in result:
        tweets.append({
            'tweet_type': row[0],
            'id': row[1],
            'tweet_content': row[2],
            'tweet_year': row[3],
        })

    random.shuffle(tweets)
    
    return JsonResponse({'tweets': tweets})

@csrf_exempt 
def get_tweet_pair(request):
    # Fetch one real and one fake tweet from the database
    real_tweet = Tweet.objects.filter(is_trump=True).order_by('?').first()
    fake_tweet = Tweet.objects.filter(is_trump=False).order_by('?').first()
    
    tweet_pair = [
        {
            "id": real_tweet.id,
            "content": real_tweet.text,
        },
        {
            "id": fake_tweet.id,
            "content": fake_tweet.text,
        }
    ]

    # Shuffle the pair so the real/fake ordering is random
    random.shuffle(tweet_pair)

    return JsonResponse({"tweets": tweet_pair})



@csrf_exempt 
def submit_guess(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # Extract selected tweet id and user streak from frontend
        selected_tweet_id = data.get('selected_tweet_id')
        current_streak = data.get('streak', 0)

        try:
            # Get the selected tweet from the database
            selected_tweet = Tweet.objects.get(id=selected_tweet_id)

            # Check if the tweet is real
            if selected_tweet.is_trump:
                # Correct guess, increment streak
                current_streak += 1
                return JsonResponse({
                    "correct": True,
                    "streak": current_streak
                })
            else:
                # Incorrect guess, reset streak
                return JsonResponse({
                    "correct": False,
                    "streak": 0
                })

        except Tweet.DoesNotExist:
            return JsonResponse({
                "error": "Tweet not found"
            }, status=404)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)

