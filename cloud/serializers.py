from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Favorite, Post, PlayList, Notification
from accounts.models import UserAccount


class PostsSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')

    class Meta:
        model = Post
        fields = ('id', 'title', 'artist', 'album',
                  'date', 'artwork', 'url', 'user_name', 'profile_name', 'user_image', 'user_verified', 'view', 'like')


class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    profile_name = serializers.ReadOnlyField(source='user.profile_name')
    user_image = serializers.ImageField(source='user.image')
    user_verified = serializers.BooleanField(source='user.is_verified')

    class Meta:
        model = Post
        fields = ('id', 'title', 'artist', 'album',
                  'lyrics', 'date', 'artwork', 'url', 'user_name', 'profile_name', 'user_image', 'user_verified', 'view', 'like')


class NewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'artist', 'album',
                  'lyrics', 'artwork', 'url', 'user')


class EditPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'artist', 'album', 'lyrics', 'artwork')


class PlayListSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(source='posts_count')

    class Meta:
        model = PlayList
        fields = ('id', 'title', 'date', 'count')


class NewPlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        fields = ('id', 'title', 'user')


class FavoriteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="post.id")
    title = serializers.CharField(source="post.title")
    url = serializers.CharField(source="post.url")
    artist = serializers.CharField(source="post.artist")
    artwork = serializers.ImageField(source="post.artwork")
    user_name = serializers.ReadOnlyField(source='post.user.name')

    class Meta:
        model = Favorite
        fields = ('id', 'user_name', 'url', 'title', 'artist', 'artwork')


class NotificationSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='sender.name')
    profile_name = serializers.ReadOnlyField(source='sender.profile_name')
    image = serializers.ImageField(source='sender.image')
    id = serializers.IntegerField(source='sender.id')
    is_verified = serializers.BooleanField(source='sender.is_verified')

    class Meta:
        model = Notification
        fields = ('name', 'profile_name', 'image',
                  'is_verified',  'id', 'date', 'seen', 'kind', 'post')


class UserDetailSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'profile_name', 'followers', 'header', 'is_verified',
                  'followings', 'email', 'name', 'image', 'join_date', 'bio')


class LikeSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='user.name')
    image = serializers.ImageField(source='user.image')
    profile_name = serializers.CharField(source='user.profile_name')
    is_verified = serializers.BooleanField(source='user.is_verified')

    class Meta:
        model = Favorite
        fields = ('user', 'name', 'image', 'profile_name', 'is_verified')


class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='id')

    class Meta:
        model = UserAccount
        fields = ('user', 'name', 'image', 'profile_name', 'is_verified')
