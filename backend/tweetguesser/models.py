from django.db import models, connection

class Tweet (models.Model):
    text = models.CharField(max_length=281)
    created_at = models.DateTimeField(auto_now_add=True)
    is_trump = models.BooleanField(default=False)

    def __str__(self):
        return self.text

# Run the raw SQL query in the random tweets view to get two tweets at a time
class TweetManager(models.Manager):
    def get_random_tweets(self):
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM random_tweets_view') #really unsure about having a raw sql query in the backend like this...
            return cursor.fetchall()

class Tweet_v2(models.Model):
    tweet_content = models.TextField()
    tweet_year = models.IntegerField()

    objects = TweetManager()  # Add the custom manager