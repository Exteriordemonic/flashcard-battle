import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient


@pytest.fixture(autouse=True)
def user():
    User = get_user_model()
    User.objects.create_user(username="alice", password="correct-horse")


@pytest.fixture
def client():
    return APIClient()


@pytest.mark.django_db
def test_token_obtain_pair_success(client):

    client = APIClient()
    url = reverse("token_obtain_pair")

    response = client.post(
        url, {"username": "alice", "password": "correct-horse"}
    )

    assert response.status_code == 200
    assert "refresh" in response.data
    assert "access" in response.data


@pytest.mark.django_db
def test_token_obtain_pair_invalid_credentials(client):
    url = reverse("token_obtain_pair")

    response = client.post(
        url, {"username": "alice", "password": "wrong-horse"}
    )

    assert response.status_code == 401


@pytest.mark.django_db
def test_token_refresh_success(client):
    url_obtain = reverse("token_obtain_pair")

    obtain_response = client.post(
        url_obtain, {"username": "alice", "password": "correct-horse"}
    )

    refresh_token = obtain_response.data.get("refresh")

    assert refresh_token is not None

    url = reverse("token_refresh")
    response = client.post(url, {"refresh": refresh_token})

    assert response.status_code == 200
    assert "access" in response.data


@pytest.mark.django_db
def test_token_refresh_fail(client):
    url = reverse("token_refresh")

    response = client.post(url, {"refresh": "xxx"})

    assert response.status_code == 401
