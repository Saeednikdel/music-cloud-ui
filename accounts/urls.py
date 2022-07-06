from django.urls import path
from . import views

urlpatterns = [
    path('follow/', views.follow, name="follow"),
    path('avatar/', views.avatar, name="avatar"),
    path('header/', views.header, name="header"),
    path('user-set/', views.userSet, name="user-set"),
    path('user-list/<str:page>/', views.userList, name="user-list"),
    path('profile/', views.profile, name="profile"),
    path('follower-list/<str:name>/<str:page>/',
         views.followerList, name="follower-list"),
    path('following-list/<str:name>/<str:page>/',
         views.followingList, name="following-list"),
]
