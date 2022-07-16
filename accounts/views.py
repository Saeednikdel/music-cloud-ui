from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from .serializers import AvatarSerializer, UserSetSerializer, HeaderSerializer, UserSerializer, ProfileSerializer, FollowerSerializer
from rest_framework import status
from cloud.models import Notification


@api_view(['POST'])
@permission_classes([AllowAny])
def follow(request):
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    target = get_object_or_404(
        UserAccount, name=request.data.get('target_name'))
    if target in user.following.all():
        user.following.remove(target)
        target.follower.remove(user)
        notif = get_object_or_404(
            Notification, sender=user, receiver=target, kind="followed you")
        notif.delete()
        return Response({"unfollowed"})
    else:
        if user.following.count() == 0:
            user.following.add(user)
            user.follower.add(user)
        user.following.add(target)
        target.follower.add(user)
        notif, created = Notification.objects.get_or_create(
            sender=user, receiver=target, kind="followed you")
        notif.save()
        return Response({"followed"})


@api_view(['POST'])
@permission_classes([AllowAny])
def avatar(request):
    user = get_object_or_404(UserAccount, id=request.data.get('id'))
    serializer = AvatarSerializer(data=request.data, instance=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def header(request):
    user = get_object_or_404(UserAccount, id=request.data.get('id'))
    serializer = HeaderSerializer(data=request.data, instance=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def userSet(request):
    user = get_object_or_404(UserAccount, id=request.data.get('id'))
    serializer = UserSetSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def userList(request, page):
    if request.data.get('keyword'):
        users = UserAccount.objects.filter(
            name__contains=request.data.get('keyword'), is_active=True)
    else:
        users = UserAccount.objects.filter(is_active=True)
    itemperpage = 10
    paginator = Paginator(users, itemperpage)
    count = len(users)
    users = paginator.get_page(page)
    serializer = UserSerializer(users, many=True)
    new_dict = {"count": count}
    new_dict.update({"users": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def followerList(request, name, page):
    user = get_object_or_404(UserAccount, name=name)
    follower = user.follower.exclude(follower=user)
    itemperpage = 10
    paginator = Paginator(follower, itemperpage)
    count = len(follower)
    follower = paginator.get_page(page)
    serializer = FollowerSerializer(follower, many=True)
    new_dict = {"count": count}
    new_dict.update({"follower": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def followingList(request, name, page):
    user = get_object_or_404(UserAccount, name=name)
    following = user.following.exclude(following=user)
    itemperpage = 10
    paginator = Paginator(following, itemperpage)
    count = len(following)
    following = paginator.get_page(page)
    serializer = FollowerSerializer(following, many=True)
    new_dict = {"count": count}
    new_dict.update({"following": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def profile(request):
    followed = False
    target = get_object_or_404(UserAccount, name=request.data.get('name'))
    if request.data.get('user'):
        user = get_object_or_404(UserAccount, id=request.data.get('user'))
        if target in user.following.all():
            followed = True
    serializer = ProfileSerializer(target, many=False)
    new_dict = {"followed": followed}
    new_dict.update(serializer.data)
    return Response(new_dict)
