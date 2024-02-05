from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import User, UserProfile


User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password','is_superuser','is_staff']
        
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff']

        
        

#serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ('first_name', 'last_name', 'email','password', 'avatar')

    # def validate_email(self, value):
    #     if User.objects.filter(email=value).exists():
    #         raise serializers.ValidationError("This email address is already in use.")
    #     return value     
    def validate_email(self, value):
        # Get the instance if it exists (for update operation)
        instance = getattr(self, 'instance', None)

        # Check if the email is already used by another user
        if User.objects.exclude(pk=instance.id if instance else None).filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True  # Set partial=True to allow partial updates
        super(AdminSerializer, self).__init__(*args, **kwargs)
    
    def validate_email(self, value):
        # Get the instance if it exists (for update operation)
        instance = getattr(self, 'instance', None)

        # Check if the email is already used by another user
        if User.objects.exclude(pk=instance.id if instance else None).filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    
