import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3DarkTheme, Card } from 'react-native-paper';


const API_URL = 'https://api.tenrai.org/v1/anime/40748/characters';

export default function App() {

  //armazena os personagens recebidos da API
  const [personagens, setPersonagens] = useState([]);

  //controla o carregamento e possiveis erros
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

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

  // Busca os personagens quando o aplicativo inicia
  useEffect(() => {
    buscarPersonagens();
  }, []);


  return (
    <PaperProvider theme={MD3DarkTheme}>

      <View style={styles.container}>

        <StatusBar style="light" />

        {/*cabeçalho*/}
        <Text style={styles.titulo}>
          Jujutsu Kaisen
        </Text>

        <Text style={styles.subtitulo}>
          Guia de Personagens
        </Text>
        
        {/*botao pra att char */}
        <Pressable
          style={styles.botao}
          onPress={buscarPersonagens}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Carregando...' : 'Atualizar personagens'}
          </Text>
        </Pressable>

        {/*indicador de loading */}
        {carregando && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
          />
        )}

        {/*mensagem de erro*/}
        {!carregando && erro !== '' && (
          <Text style={styles.mensagem}>
            {erro}
          </Text>
        )}

        {/*lista de char*/}
        {!carregando && erro === '' && (

          <ScrollView style={styles.lista}>

            {/*caso a lista esteja vazia*/}
            {personagens.length === 0 && (
              <Text style={styles.mensagem}>
                Nenhum personagem encontrado.
              </Text>
            )}

            {/*cria card para cada char*/}
            {personagens.map(function (item) {
              return (

                <Card
                  key={item.character.mal_id}
                  style={styles.card}
                  mode="contained"
                >

                  {/*img do char*/}
                  {item.character.images?.jpg?.image_url && (
                    <Card.Cover
                      source={{
                        uri: item.character.images.jpg.image_url
                      }}
                      style={styles.imagem}
                    />
                  )}

                  {/*infos do char */}
                  <Card.Content style={styles.conteudoCard}>

                    <Text style={styles.nome}>
                      {item.character.name}
                    </Text>

                    <Text style={styles.informacao}>
                      Participação: {item.role === 'Main'
                        ? 'Principal'
                        : 'Secundário'}
                    </Text>

                    <Text style={styles.informacao}>
                      Favoritos: {item.favorites ?? 'Não informado'}
                    </Text>

                  </Card.Content>

                </Card>

              );
            })}

          </ScrollView>

        )}

      </View>

    </PaperProvider>
  );
}


const styles = StyleSheet.create({

  botao: {
    backgroundColor: '#59359a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  lista: {
    flex: 1,
  },

  card: {
    backgroundColor: '#222222',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },

  imagem: {
    height: 230,
  },

  conteudoCard: {
    paddingTop: 16,
    paddingBottom: 16,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },

  informacao: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },

  mensagem: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },

});