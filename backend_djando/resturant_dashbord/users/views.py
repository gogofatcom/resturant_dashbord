
from rest_framework import generics


from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import User
from .serializers import UserSerializer


from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def check_authentication(request):  
    return Response({'ok': True})



@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
def user_retrieve(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
# @permission_classes([permissions.IsAuthenticated])
def user_update(request, id):
    
    try:
        user = User.objects.get(id=id)
        print('Request Data:', request.data)

        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

## dispplay users to admin
from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer,AdminSerializer
from rest_framework.permissions import IsAdminUser

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer
    # permission_classes = [IsAdminUser]


from rest_framework.permissions import IsAdminUser, IsAuthenticated

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer
    # permission_classes = [IsAdminUser]  # Restrict access to admin users

    # Allow PUT (update) and DELETE methods
    def get_permissions(self):
        if self.request.method in ('PUT', 'DELETE'):
            print("Request data:", self.request.data)  # Print the request data

            # self.permission_classes = [IsAdminUser]
            pass
        return super(UserDetail, self).get_permissions()

from rest_framework.generics import CreateAPIView


# class CreateUserView(CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = AdminSerializer

#     def perform_create(self, serializer):
#         # Additional logic can be added here if needed
#         serializer.save()

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
class CreateUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Perform validation
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserInfoSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserInfoSerializer(user)
    return Response(serializer.data)
