from email.policy import default
from django.db import models
from accounts.models import UserAccount

NOTIF_CHOICES = (
    ("followed you", "followed you"),
    ("liked your post",  "liked your post"),
)


class Genre(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100, blank=True)
    album = models.CharField(max_length=100, blank=True)
    lyrics = models.CharField(max_length=2500, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    artwork = models.ImageField(
        blank=True, null=True, upload_to='artwork/%Y/%m/%d/', default='placeholder-image.png')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    url = models.FileField(upload_to='uploads/%Y/%m/%d/')
    like = models.IntegerField(default=0)
    view = models.IntegerField(default=0)
    genre = models.ForeignKey(
        Genre, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title


class Favorite(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class PlayList(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post, blank=True)

    def __str__(self):
        return self.user.email

    def posts_count(self):
        return self.posts.all().count()


class Notification(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        UserAccount, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        UserAccount, related_name="receiver", on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)
    kind = models.CharField(choices=NOTIF_CHOICES, max_length=15)
    post = models.ForeignKey(
        Post, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.receiver.email

    def count(self):
        return self.filter(seen=False).count()
