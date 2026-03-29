from django.urls import path, include
from rest_framework import routers, serializers, viewsets

from flashcards.models import Flashcard


class FlashcardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flashcard
        fields = ["id", "question", "answer"]


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer


router = routers.DefaultRouter()
router.register(r"flashcards", FlashcardViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
