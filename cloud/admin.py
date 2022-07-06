from django.contrib import admin
from .models import Song, Favorite, PlayList, Notification

admin.site.register(Song)
admin.site.register(Favorite)
admin.site.register(PlayList)
admin.site.register(Notification)
