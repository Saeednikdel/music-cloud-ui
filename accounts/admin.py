from django.contrib import admin
from .models import UserAccount
from import_export.admin import ImportExportModelAdmin


class UserAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('email', 'name', 'is_active', 'is_staff')
    list_editable = ('is_active',)
    list_per_page = 10
    search_fields = ('email', 'name')
    list_filter = ('is_active', 'is_staff', 'join_date')


admin.site.register(UserAccount, UserAdmin)
