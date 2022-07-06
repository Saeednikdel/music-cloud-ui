from django.urls import path
from . import views

urlpatterns = [
    path('song/<str:id>/', views.song, name="song"),
    path('newsong/', views.newSong, name="new_song"),
    path('removesong/', views.removeSong, name="remove_song"),
    path('editsong/', views.editSong, name="edit_song"),
    path('songlist/<str:page>/', views.songList, name="song_list"),
    path('usersonglist/<str:user>/<str:page>/',
         views.userSongList, name="user_song_list"),

    path('playlist/<str:id>/<str:page>/', views.playList, name="play_list"),
    path('userplaylists/<str:user>/<str:page>/',
         views.userPlayLists, name="user_play_lists"),
    path('newplaylist/', views.newPlayList, name="new_play_list"),
    path('removeplaylist/', views.removePlayList, name="remove_play_list"),
    path('editplaylist/', views.editPlayList, name="edit_play_list"),
    path('addtoplaylist/', views.addToPlayList, name="add_to_play_list"),

    path('userfavorites/<str:user>/<str:page>/',
         views.userFavorites, name="user_favorites"),
    path('favorite/<str:user>/<str:id>/', views.favorite, name="favorite"),

    path('notification/<str:user>/<str:page>/',
         views.notification, name="notification"),
]
