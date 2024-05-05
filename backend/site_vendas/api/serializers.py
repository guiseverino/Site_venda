from rest_framework import serializers
from .models import Jogo, Compra, Avaliacao, Carrinho
from django.contrib.auth.models import User
from django.db.models import Avg




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = '__all__'

    def get_media_avaliacao(self, obj):
        media = Avaliacao.objects.filter(jogo=obj).aggregate(Avg('classificacao'))['classificacao__avg']
        return round(media, 1) if media is not None else None
    
class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'
00
class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = '__all__'

class CarrinhoSerializer(serializers.ModelSerializer):
    jogo = JogoSerializer()
    class Meta:
        model =  Carrinho
        fields = '__all__'
        extra_kwargs = {
            'quantidade': {'required': False}
        }

            
    
