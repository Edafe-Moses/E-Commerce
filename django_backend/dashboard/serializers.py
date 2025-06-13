from rest_framework import serializers
from .models import DashboardWidget, UserDashboardPreference


class DashboardWidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardWidget
        fields = '__all__'
        read_only_fields = ('user',)


class UserDashboardPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDashboardPreference
        fields = '__all__'
        read_only_fields = ('user',)