from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import UserAccount

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'name', 'password', 'is_active')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'image', 'profile_name', 'is_verified')


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'image')


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'header')


class UserDetailSerializer(serializers.ModelSerializer):
    # follower_list = UserSerializer(source="follower", read_only=True, many=True)
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'profile_name', 'followers', 'followings', 'header', 'email', 'name',
                  'image', 'header', 'birth_date', 'join_date', 'is_staff', 'bio')


class UserSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'profile_name', 'bio')


class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='id')

    class Meta:
        model = UserAccount
        fields = ('user', 'name', 'image', 'profile_name', 'is_verified')


class ProfileSerializer(serializers.ModelSerializer):
    followers = serializers.IntegerField(source='follower_count')
    followings = serializers.IntegerField(source='following_count')

    class Meta:
        model = UserAccount
        fields = ('id', 'profile_name', 'followers', 'header', 'is_verified',
                  'followings', 'name', 'image', 'join_date', 'bio')
