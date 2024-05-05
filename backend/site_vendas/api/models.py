from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Jogo(models.Model):
    id_jogo = models.AutoField(primary_key=True)
    nome_jogo = models.CharField(max_length=100)
    descricao = models.TextField()
    preco = models.FloatField()
    data_lancamento = models.DateField()
    classificacao_etaria = models.CharField(max_length=10)
    genero = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/',default='none')
    desenvolvedor = models.CharField(max_length=100)

    def __str__(self):
        return self.nome_jogo

class Carrinho(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)
    data_pedido = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.quantidade} x {self.jogo.nome_jogo}'

class Compra(models.Model):
    id_compra = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    data_compra = models.DateTimeField(auto_now_add=True)
    metodo_pagamento = models.CharField(max_length=50)
    valor_compra = models.DecimalField(max_digits=10, decimal_places=2)

class Avaliacao(models.Model):
    id_avaliacao = models.AutoField(primary_key=True)
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)  
    classificacao = models.FloatField(validators=[MinValueValidator(1), MaxValueValidator(5)]) 
    comentario = models.TextField()

    def __str__(self):
        return f"Avaliação de {self.usuario.username} para {self.jogo.nome_jogo}"

