from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, UserProfile, Address


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone_number', 'date_of_birth', 'avatar')}),
        (_('Account info'), {'fields': ('account_type', 'company_name', 'is_onboarded')}),
        (_('Address'), {'fields': ('street_address', 'city', 'state', 'postal_code', 'country')}),
        (_('Preferences'), {'fields': ('preferred_currency', 'preferred_language', 'email_notifications', 'sms_notifications')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'account_type'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'account_type', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'account_type', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name', 'company_name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'industry', 'company_size', 'analytics_enabled', 'marketing_emails')
    list_filter = ('industry', 'company_size', 'analytics_enabled', 'marketing_emails')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'bio')
    raw_id_fields = ('user',)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address_type', 'city', 'state', 'country', 'is_default')
    list_filter = ('address_type', 'country', 'is_default')
    search_fields = ('user__email', 'first_name', 'last_name', 'city', 'state')
    raw_id_fields = ('user',)