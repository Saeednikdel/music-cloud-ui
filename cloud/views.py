from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserAccount
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from .models import Favorite, Song, PlayList, Notification
from .serializers import SongsSerializer, PlayListSerializer, FavoriteSerializer, NotificationSerializer, NewSongSerializer, EditSongSerializer, NewPlayListSerializer
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
def newSong(request):
    serializer = NewSongSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([AllowAny])
def removeSong(request):
    post = get_object_or_404(Song, user=request.data.get(
        'user'), id=request.data.get('id'))
    post.delete()
    return Response({"id": request.data.get('id')})


@api_view(['POST'])
@permission_classes([AllowAny])
def editSong(request):
    song = get_object_or_404(Song, id=request.data.get(
        'id'), user=request.data.get('user'))
    serializer = EditSongSerializer(instance=song, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def song(request, id):
    song = get_object_or_404(Song, id=id)
    serializer = SongsSerializer(song, many=False)
    favorite = False
    if request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        query = Favorite.objects.filter(user=user, song=song)
        if query.exists():
            favorite = True
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    print(ip)
    new_dict = {"favorite": ip}
    new_dict.update(serializer.data)
    return Response(new_dict)


@api_view(['POST'])
@permission_classes([AllowAny])
def songList(request, page):
    if request.data.get('keyword'):
        keyword = request.data.get('keyword')
        songs = Song.objects.filter(
            title__contains=keyword).order_by('-date')
    elif request.data.get('user'):
        user = UserAccount.objects.get(id=request.data.get('user'))
        songs = Song.objects.filter(
            user__in=user.following.all()).order_by('-date')
        if songs.count() == 0:
            songs = Song.objects.all().order_by('-date')
    else:
        songs = Song.objects.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(songs, itemperpage)
    count = len(songs)
    songs = paginator.get_page(page)
    serializer = SongsSerializer(songs, many=True)
    new_dict = {"count": count}
    new_dict.update({"songs": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def userSongList(request, user, page):
    user = get_object_or_404(UserAccount, id=user)
    songs = Song.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(songs, itemperpage)
    count = len(songs)
    songs = paginator.get_page(page)
    serializer = SongsSerializer(songs, many=True)
    new_dict = {"count": count}
    new_dict.update({"songs": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def playList(request, id, page):
    playlist = get_object_or_404(PlayList, id=id)
    songs = playlist.songs.all().order_by('-date')
    itemperpage = 10
    paginator = Paginator(songs, itemperpage)
    count = len(songs)
    songs = paginator.get_page(page)
    serializer = SongsSerializer(songs, many=True)
    new_dict = {"count": count}
    new_dict.update({"songs": serializer.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([AllowAny])
def userPlayLists(request, user, page):
    user = get_object_or_404(UserAccount, id=user)
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
    song = get_object_or_404(Song, id=request.data.get('song'))
    if song in playList.songs.all():
        playList.songs.remove(song)
        return Response({"removed"})
    else:
        playList.songs.add(song)
        return Response({"added"})


@api_view(['GET'])
@permission_classes([AllowAny])
def userFavorites(request, user, page):
    user = get_object_or_404(UserAccount, id=user)
    favorites = Favorite.objects.filter(user=user).order_by('-date')
    itemperpage = 10
    paginator = Paginator(favorites, itemperpage)
    count = len(favorites)
    favorites = paginator.get_page(page)
    serializer = FavoriteSerializer(favorites, many=True)
    new_dict = {"count": count}
    new_dict.update({"favorites": serializer.data})
    return Response(new_dict)


@api_view(['Get'])
@permission_classes([AllowAny])
def favorite(request, user, id):
    user = get_object_or_404(UserAccount, id=user)
    song = get_object_or_404(Song, id=id)
    query = Favorite.objects.filter(user=user, song=song)
    if query.exists():
        fave = Favorite.objects.get(user=user, song=song)
        fave.delete()
        notif = get_object_or_404(
            Notification, sender=user, song=song, receiver=song.user, kind="liked your post")
        notif.delete()
        song.like -= 1
        song.save()
        return Response({"removed from Favorites"})
    else:
        fave, created = Favorite.objects.get_or_create(user=user, song=song)
        fave.save()
        notif, created = Notification.objects.get_or_create(
            sender=user, song=song, receiver=song.user, kind="liked your post")
        notif.save()
        song.like += 1
        song.save()
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
