import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { Card } from 'react-native-paper';

import styles from '../styles';

const API_URL = 'https://api.tenrai.org/v1/anime/40748/characters';

export default function Personagens({ favoritos, alternarFavorito }) {

  //guarda os personagens da API
  const [personagens, setPersonagens] = useState([]);

  //controla o carregamento/erros
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  //consulta chars na api
  async function buscarPersonagens() {

    setCarregando(true);
    setErro('');

    try {

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error('Erro ao consultar a API');
      }

      const dados = await resposta.json();

      if (!Array.isArray(dados.data)) {
        throw new Error('Resposta inválida da API');
      }

      setPersonagens(dados.data);

    } catch (error) {

      console.error('Erro na consulta:', error);
      setErro('Não foi possível carregar os personagens.');

    } finally {

      setCarregando(false);

    }
  }

  //busca os char quando a tela é montada
  useEffect(() => {
    buscarPersonagens();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Jujutsu Kaisen
      </Text>

      <Text style={styles.subtitulo}>
        Guia de Personagens
      </Text>

      {/*Botao de att */}
      <Pressable
        style={styles.botao}
        onPress={buscarPersonagens}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Carregando...' : 'Atualizar personagens'}
        </Text>
      </Pressable>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#ffffff"
        />
      )}

      {!carregando && erro !== '' && (
        <Text style={styles.mensagem}>
          {erro}
        </Text>
      )}

      {!carregando && erro === '' && (
        <ScrollView style={styles.lista}>

          {/*caso a lista esteja vazia */}
          {personagens.length === 0 && (
            <Text style={styles.mensagem}>
              Nenhum personagem encontrado.
            </Text>
          )}

          {/*cria cards dos chars */}
          {personagens.map(function (item) {
            return (
              <Card
                key={item.character.mal_id}
                style={styles.card}
                mode="contained"
              >

                {/*img do char */}
                {item.character.images?.jpg?.image_url && (
                  <Card.Cover
                    source={{
                      uri: item.character.images.jpg.image_url
                    }}
                    style={styles.imagem}
                  />
                )}

                {/*info do char */}
                <Card.Content style={styles.conteudoCard}>

                    <Text style={styles.nome}>
                    {item.character.name}
                    </Text>

                    <Text style={styles.informacao}>
                    Participação: {item.role === 'Main' ? 'Principal' : 'Secundário'}
                    </Text>

                    <Text style={styles.informacao}>
                    Mais Favoritados: {item.favorites ?? 'Não informado'}
                    </Text>   
                    
                    {/* Botão para adicionar ou remover dos favoritos */}
                    <Pressable
                    style={styles.botaoFavorito}
                    onPress={() => alternarFavorito({
                        id: item.character.mal_id,
                        nome: item.character.name,
                        imagem: item.character.images?.jpg?.image_url ?? null,
                        participacao: item.role
                    })}
                    >
                    <Text style={styles.textoBotao}>
                        {favoritos.some(function (favorito) {
                        return favorito.id === item.character.mal_id;
                        })
                        ? 'Remover dos favoritos'
                        : 'Adicionar aos favoritos'}
                    </Text>
                    </Pressable>

                </Card.Content>

              </Card>
            );
          })}

        </ScrollView>
      )}

    </View>
  );
}
