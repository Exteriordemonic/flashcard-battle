from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from django.contrib.auth import get_user_model

User = get_user_model()


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["id", "url", "username", "email", "is_staff"]


# ViewSets define the view behavior.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r"users", CustomUserViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
