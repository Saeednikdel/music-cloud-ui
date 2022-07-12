from django.urls import path
from . import views

urlpatterns = [
    path('post/<str:id>/', views.post, name="post"),
    path('newpost/', views.newPost, name="new_post"),
    path('removepost/', views.removePost, name="remove_post"),
    path('postlist/<str:page>/', views.postList, name="post_list"),
    path('userpostlist/<str:name>/<str:page>/',
         views.userPostList, name="user_post_list"),

    path('playlist/<str:id>/<str:page>/', views.playList, name="play_list"),
    path('userplaylists/<str:username>/<str:page>/',
         views.userPlayLists, name="user_play_lists"),
    path('newplaylist/', views.newPlayList, name="new_play_list"),
    path('removeplaylist/', views.removePlayList, name="remove_play_list"),
    path('editplaylist/', views.editPlayList, name="edit_play_list"),
    path('addtoplaylist/', views.addToPlayList, name="add_to_play_list"),

    path('userfavorites/<str:user>/<str:page>/',
         views.userFavorites, name="user_favorites"),
    path('favorite/', views.favorite, name="favorite"),

    path('notification/<str:user>/<str:page>/',
         views.notification, name="notification"),

    path('profile-detail/', views.profileDetail, name="profile-detail"),
]
