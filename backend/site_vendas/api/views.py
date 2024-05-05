from rest_framework import viewsets,status,permissions
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Jogo,  Compra, Avaliacao, Carrinho
from .serializers import (
    CarrinhoSerializer,
    JogoSerializer, 
    CompraSerializer, 
    AvaliacaoSerializer,
    UserSerializer
)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
      
class JogoViewSet(viewsets.ModelViewSet):
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
    permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['get'])
    def product_list(self, request):
        jogo = Jogo.objects.all()
        serializer = JogoSerializer(jogo, many=True)
        return Response(serializer.data)


class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer

class AvaliacaoViewSet(viewsets.ModelViewSet):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)  

    def perform_update(self, serializer):
        serializer.save()  

    def perform_destroy(self, instance):
        instance.delete()  
class CarrinhoViewSet(viewsets.ModelViewSet):
    queryset = Carrinho.objects.all()
    serializer_class = CarrinhoSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def count_items(self, request):
        # Contar a quantidade de itens diferentes no carrinho para o usuário autenticado
        count = Carrinho.objects.filter(user=request.user).values('jogo').distinct().count()
        return Response({'count': count}, status=status.HTTP_200_OK)
    @action(detail=False, methods=['get'])
    def view_cart(self, request):
        # Filtrar os itens do carrinho pelo usuário autenticado
        cart_items = Carrinho.objects.filter(user=request.user)
        
        # Serializar os itens do carrinho
        serializer = CarrinhoSerializer(cart_items, many=True)
        
        # Calcular o preço total dos itens no carrinho
        total_price = sum(item.jogo.preco * item.quantidade for item in cart_items)
        
        # Retornar os dados serializados do carrinho e o preço total
        return Response({'cart_items': serializer.data, 'total_price': total_price}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def add_to_cart(self, request, pk=None):
        try:
            # Recupera o jogo pelo ID fornecido na URL
            jogo = Jogo.objects.get(pk=pk)
            
            # Tenta encontrar um item de carrinho existente para o usuário e o jogo
            cart_item = Carrinho.objects.filter(jogo=jogo, user=request.user).first()
            
            if cart_item:
                # Se o item de carrinho já existir, apenas incrementa a quantidade
                cart_item.quantidade += 1
                cart_item.save()
            else:
                # Caso contrário, cria um novo item de carrinho com quantidade 1
                cart_item = Carrinho.objects.create(jogo=jogo, user=request.user, quantidade=1)
            
            # Serializa o item do carrinho e retorna como resposta
            serializer = CarrinhoSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Jogo.DoesNotExist:
            return Response({"error": "Jogo não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def remove_from_cart(self, request, pk=None):
        cart_item = self.get_object()
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



    