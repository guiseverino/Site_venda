from django.contrib import admin

from .models import Avaliacao, Compra, Jogo, Carrinho

# Register your models here.
admin.site.register(Jogo)
admin.site.register(Compra)
admin.site.register(Avaliacao)
admin.site.register(Carrinho)
