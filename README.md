# Jujutsu Kaisen — Guia de Personagens

## Sobre o projeto

O aplicativo consome uma API de personagens de Jujutsu Kaisen e apresenta suas informações em cards.

Também permite selecionar personagens favoritos e salvar essa seleção localmente no celular.

## Tecnologias utilizadas

- React Native
- Expo SDK 58
- JavaScript
- React Native Paper
- React Navigation
- AsyncStorage
- Tenrai API

## Funcionalidades

- Consulta de personagens 
- Cards com imagens e informações dos personagens
- Atualização da lista de personagens
- Navegação entre duas telas por abas inferiores
- Adição e remoção de personagens favoritos

## Telas

### Personagens

Exibe os personagens recebidos da API, incluindo imagem, nome, participação e quantidade de favoritos na API.

Permite atualizar os dados e adicionar ou remover personagens da seleção pessoal.

### Favoritos

Exibe os personagens favoritos selecionados pelo usuário.

Permite remover personagens da lista e mostra uma mensagem quando não há favoritos.

## Organização do projeto

- App.js — configuração da navegação e gerenciamento dos favoritos
- src/screens/Personagens.js — tela de personagens
- src/screens/Favoritos.js — tela de favoritos
- src/styles.js — estilos

## Como executar

1. Instale o Node.js.
2. Clone o repositório:

   git clone https://github.com/Erik-GSouza/jjk-guia-mobile.git

3. Entre na pasta do projeto.
4. Instale as dependências:

   npm install

5. Inicie o Expo:

   npx expo start

6. Abra o aplicativo utilizando o Expo Go.

## API utilizada

Tenrai API:

https://api.tenrai.org/v1/anime/40748/characters

## Armazenamento local

O aplicativo utiliza AsyncStorage para armazenar a seleção pessoal de personagens favoritos.