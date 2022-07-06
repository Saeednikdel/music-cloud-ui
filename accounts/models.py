from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)  # set_password hashes the password for us
        user.save()
        return user

    def create_superuser(self, email, name, password):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name,
                          is_staff=True, is_superuser=True)
        user.set_password(password)
        user.save()
        return user


alphanumeric = RegexValidator(
    r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=50, unique=True,
                            validators=[alphanumeric])
    profile_name = models.CharField(max_length=50, blank=True, null=True)
    bio = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    join_date = models.DateTimeField(auto_now_add=True)
    birth_date = models.DateField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    header = models.ImageField(blank=True, null=True)
    follower = models.ManyToManyField(
        'self', symmetrical=False, related_name='user_follower')
    following = models.ManyToManyField(
        'self', symmetrical=False, related_name='user_following')
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_name(self):
        return self.name

    def __str__(self):
        return self.email

    def follower_count(self):
        return self.follower.exclude(follower=self).count()

    def following_count(self):
        return self.following.exclude(following=self).count()

    def follower_list(self):
        return self.follower.exclude(follower=self)

    def following_list(self):
        return self.following.exclude(following=self)
