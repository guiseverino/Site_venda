from django.urls import include, path
from django.contrib.auth import views as auth_views
from api.views import CreateUserView,AvaliacaoViewSet, JogoViewSet,CarrinhoViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from . import views
router = DefaultRouter()
router.register("avaliacao", AvaliacaoViewSet, basename="avaliacao")
router.register("carrinho", CarrinhoViewSet, basename="carrinho")
router.register("jogo", JogoViewSet, basename="jogo")


urlpatterns = [
    path('', include(router.urls)),
    path("user/register/",CreateUserView.as_view(),name="register"),
    path("token/",TokenObtainPairView.as_view(),name="get_token"),
    path("token/refresh",TokenRefreshView.as_view(),name="refresh"),
    path("carrinho/<int:pk>/add_to_cart/", CarrinhoViewSet.as_view({'post': 'add_to_cart'}), name="add_to_cart"),

    ]


