from django.db import models

class Tweet (models.Model):
    text = models.CharField(max_length=281)
    created_at = models.DateTimeField(auto_now_add=True)
    is_trump = models.BooleanField(default=False)

    def __str__(self):
        return self.text
