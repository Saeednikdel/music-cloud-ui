from django.contrib import admin
from .models import Post, Favorite, PlayList, Notification

admin.site.register(Post)
admin.site.register(Favorite)
admin.site.register(PlayList)
admin.site.register(Notification)
