from django.contrib import admin
from .models import Post, Favorite, PlayList, Notification, Genre, RePost

admin.site.register(Post)
admin.site.register(Favorite)
admin.site.register(PlayList)
admin.site.register(Notification)
admin.site.register(Genre)
admin.site.register(RePost)
