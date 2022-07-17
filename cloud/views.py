from itertools import chain
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from .models import Favorite, Post, PlayList, Notification, Genre
from .serializers import PostsSerializer, PlayListSerializer, FavoriteSerializer, NotificationSerializer, NewPostSerializer, EditPostSerializer, NewPlayListSerializer, UserDetailSerializer, PostSerializer, LikeSerializer, FollowerSerializer, GenreSerializer
from rest_framework import status
from itertools import chain


@api_view(['GET'])
@permission_classes([AllowAny])
def likeList(request, id, page):
    post = Post.objects.get(id=id)
    likes = Favorite.objects.filter(post=post)
    itemperpage = 10
    paginator = Paginator(likes, itemperpage)
    count = len(likes)
    likes = paginator.get_page(page)
    serializer = LikeSerializer(likes, many=True)
    new_dict = {"count": count}
    new_dict.update({"likes": serializer.data})
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
def newPost(request):
    if request.data.get('id'):
        post = get_object_or_404(Post, id=request.data.get(
            'id'), user=request.data.get('user'))
        serializer = EditPostSerializer(instance=post, data=request.data)
    else:
        serializer = NewPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([AllowAny])
def removePost(request):
    post = get_object_or_404(Post, user=request.data.get(
        'user'), id=request.data.get('id'))
    post.delete()
    return Response({"id": request.data.get('id')})


@api_view(['POST'])
@permission_classes([AllowAny])
def post(request, id):
    post = get_object_or_404(Post, id=id)
    serializer = PostSerializer(post, many=False)
    favorite = False
    if request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        query = Favorite.objects.filter(user=user, post=post)
        if query.exists():
            favorite = True
    new_dict = {"favorite": favorite}
    new_dict.update(serializer.data)
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def postList(request, page):
    if request.data.get('keyword'):
        keyword = request.data.get('keyword')
        if request.data.get('genre'):
            gen = request.data.get('genre')
            post1 = Post.objects.filter(title__contains=keyword, genre=gen)
            post2 = Post.objects.filter(artist__contains=keyword, genre=gen)
            posts = list(chain(post1, post2))
        else:
            post1 = Post.objects.filter(title__contains=keyword)
            post2 = Post.objects.filter(artist__contains=keyword)
            posts = list(chain(post1, post2))
    elif request.data.get('genre'):
        gen = request.data.get('genre')
        posts = Post.objects.filter(genre=gen)
    elif request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        posts = Post.objects.filter(
            user__in=user.following.all()).order_by('-date')
        if posts.count() == 0:
            posts = Post.objects.all().order_by('-date')
    else:
        posts = Post.objects.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(posts, itemperpage)
    count = len(posts)
    posts = paginator.get_page(page)
    serializer = PostsSerializer(posts, many=True)
    new_dict = {"count": count}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def userPostList(request, name, page):
    user = get_object_or_404(UserAccount, name=name)
    posts = Post.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(posts, itemperpage)
    count = len(posts)
    posts = paginator.get_page(page)
    serializer = PostsSerializer(posts, many=True)
    new_dict = {"count": count}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def playList(request, id, page):
    playlist = get_object_or_404(PlayList, id=id)
    posts = playlist.posts.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(posts, itemperpage)
    count = len(posts)
    posts = paginator.get_page(page)
    serializer = PostsSerializer(posts, many=True)
    new_dict = {"count": count, "user": playlist.user.id}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def userPlayLists(request, username, page):
    user = get_object_or_404(UserAccount, name=username)
    playlists = PlayList.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(playlists, itemperpage)
    count = len(playlists)
    playlists = paginator.get_page(page)
    serializer = PlayListSerializer(playlists, many=True)
    new_dict = {"count": count}
    new_dict.update({"playlists": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def newPlayList(request):
    serializer = NewPlayListSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([AllowAny])
def removePlayList(request):
    playList = get_object_or_404(PlayList, user=request.data.get(
        'user'), id=request.data.get('id'))
    playList.delete()
    return Response({"id": request.data.get('id')})


@api_view(['POST'])
@permission_classes([AllowAny])
def editPlayList(request):
    playList = get_object_or_404(PlayList, id=request.data.get(
        'id'), user=request.data.get('user'))
    serializer = NewPlayListSerializer(instance=playList, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def addToPlayList(request):
    playList = get_object_or_404(PlayList, user=request.data.get(
        'user'), id=request.data.get('id'))
    post = get_object_or_404(Post, id=request.data.get('post'))
    if post not in playList.posts.all():
        playList.posts.add(post)
        return Response({"added"})
    else:
        return Response({"already exists"})


@api_view(['POST'])
@permission_classes([AllowAny])
def removeFromPlayList(request):
    playList = get_object_or_404(PlayList, user=request.data.get(
        'user'), id=request.data.get('id'))
    post = get_object_or_404(Post, id=request.data.get('post'))
    if post in playList.posts.all():
        playList.posts.remove(post)
        return Response({"removed"})
    else:
        return Response({"does not exists"})


@api_view(['GET'])
@permission_classes([AllowAny])
def userFavorites(request, username, page):
    user = get_object_or_404(UserAccount, name=username)
    favorites = Favorite.objects.filter(user=user)
    itemperpage = 10
    paginator = Paginator(favorites, itemperpage)
    count = len(favorites)
    favorites = paginator.get_page(page)
    serializer = FavoriteSerializer(favorites, many=True)
    new_dict = {"count": count}
    new_dict.update({"posts": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def favorite(request):
    user = get_object_or_404(UserAccount, id=request.data.get('user'))
    post = get_object_or_404(Post, id=request.data.get('id'))
    query = Favorite.objects.filter(user=user, post=post)
    if query.exists():
        fave = Favorite.objects.get(user=user, post=post)
        fave.delete()
        notif = get_object_or_404(
            Notification, sender=user, post=post, receiver=post.user, kind="liked your post")
        notif.delete()
        post.like -= 1
        post.save()
        return Response({"removed from Favorites"})
    else:
        fave, created = Favorite.objects.get_or_create(user=user, post=post)
        fave.save()
        notif, created = Notification.objects.get_or_create(
            sender=user, post=post, receiver=post.user, kind="liked your post")
        notif.save()
        post.like += 1
        post.save()
        return Response({"added to Favorites"})


@api_view(['GET'])
@permission_classes([AllowAny])
def notification(request, user, page):
    user = get_object_or_404(UserAccount, id=user)
    notif = Notification.objects.filter(
        receiver=user).exclude(sender=user).order_by('-date')
    count = len(notif)
    itemperpage = 10
    paginator = Paginator(notif, itemperpage)
    notif = paginator.get_page(page)
    serializer = NotificationSerializer(notif, many=True)
    new_dict = {"count": count}
    new_dict.update({"notification": serializer.data})
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def profileDetail(request):
    followed = False
    target = get_object_or_404(
        UserAccount, name=request.data.get('name'), is_active=True)
    if request.data.get('user'):
        user = get_object_or_404(UserAccount, id=request.data.get('user'))
        if target in user.following.all():
            followed = True
    serializer = UserDetailSerializer(target, many=False)
    new_dict = {"followed": followed}
    new_dict.update(serializer.data)
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def genreList(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)
