from django.db import models
from accounts.models import UserAccount

NOTIF_CHOICES = (
    ("followed you", "followed you"),
    ("liked your post",  "liked your post"),
)


class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    lyrics = models.CharField(max_length=2500, blank=True)
    date = models.DateTimeField(auto_now=True)
    artwork = models.ImageField(blank=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    url = models.FileField(upload_to='uploads/%Y/%m/%d/')
    like = models.IntegerField(default=0)
    view = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Favorite(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class PlayList(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    songs = models.ManyToManyField(Song, blank=True)

    def __str__(self):
        return self.user.email

    def songs_count(self):
        return self.songs.all().count()


class Notification(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        UserAccount, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        UserAccount, related_name="receiver", on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)
    kind = models.CharField(choices=NOTIF_CHOICES, max_length=15)
    song = models.ForeignKey(
        Song, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.receiver.email

    def count(self):
        return self.filter(seen=False).count()
