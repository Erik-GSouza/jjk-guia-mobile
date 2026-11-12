import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';

import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';

// Componentes de navegação
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas do aplicativo
import Personagens from './src/screens/Personagens';
import Favoritos from './src/screens/Favoritos';

// Cria o navegador de abas inferiores
const Tab = createBottomTabNavigator();

//para identificar favoritos no armazenamento
const CHAVE_FAVORITOS = '@jjk_guia_favoritos';

export default function App() {

  //Guarda os personagens favoritos enquanto o aplicativo está aberto
  const [favoritos, setFavoritos] = useState([]);

    // Indica se a leitura inicial dos favoritos terminou
  const [favoritosCarregados, setFavoritosCarregados] = useState(false);

  // Impede salvar dados caso a leitura inicial tenha falhado
  const [leituraFuncionou, setLeituraFuncionou] = useState(false);


  // Adiciona ou remove um personagem dos favoritos
  function alternarFavorito(personagem) {

    setFavoritos(function (listaAtual) {

      // Verifica se o personagem já está nos favoritos
      const existe = listaAtual.some(function (favorito) {
        return favorito.id === personagem.id;
      });

      if (existe) {

        // Remove o personagem caso já esteja na lista
        return listaAtual.filter(function (favorito) {
          return favorito.id !== personagem.id;
        });

      }

      // Adiciona o personagem caso ainda não esteja na lista
      return [...listaAtual, personagem];

    });
  }


  // Recupera os favoritos salvos quando o aplicativo inicia
  useEffect(() => {

    async function carregarFavoritos() {

      try {

        // Busca os dados armazenados no dispositivo
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_FAVORITOS);

        if (dadosSalvos !== null) {

          // Converte o texto armazenado para uma lista
          const listaSalva = JSON.parse(dadosSalvos);

          if (!Array.isArray(listaSalva)) {
            throw new Error('Lista de favoritos inválida');
          }

          // Recupera os favoritos anteriores
          setFavoritos(listaSalva);

        }

        setLeituraFuncionou(true);

      } catch (error) {

        console.error('Erro ao carregar favoritos:', error);

        Alert.alert(
          'Aviso',
          'Não foi possível recuperar os favoritos salvos.'
        );

      } finally {

        setFavoritosCarregados(true);

      }
    }

    carregarFavoritos();

  }, []);


  // Salva os favoritos sempre que a lista for alterada
  useEffect(() => {

    // Aguarda a leitura inicial antes de permitir gravações
    if (!favoritosCarregados || !leituraFuncionou) {
      return;
    }

    async function salvarFavoritos() {

      try {

        // Converte a lista de favoritos para texto
        const listaEmTexto = JSON.stringify(favoritos);

        // Salva os dados no dispositivo
        await AsyncStorage.setItem(
          CHAVE_FAVORITOS,
          listaEmTexto
        );

      } catch (error) {

        console.error('Erro ao salvar favoritos:', error);

        Alert.alert(
          'Aviso',
          'Não foi possível salvar os favoritos no dispositivo.'
        );

      }
    }

    salvarFavoritos();

  }, [favoritos, favoritosCarregados, leituraFuncionou]);



  // Aguarda a recuperação dos favoritos antes de mostrar as telas
  if (!favoritosCarregados) {

    return (
      <PaperProvider theme={MD3DarkTheme}>

        <StatusBar style="light" />

        <View style={{
          flex: 1,
          backgroundColor: '#111111',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <ActivityIndicator size="large" color="#bb99ff" />

          <Text style={{ color: '#ffffff', marginTop: 12 }}>
            Carregando favoritos...
          </Text>

        </View>

      </PaperProvider>
    );
  }


  return (
    <PaperProvider theme={MD3DarkTheme}>

      <StatusBar style="light" />

      <NavigationContainer theme={DarkTheme}>

        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#bb99ff',
            tabBarInactiveTintColor: '#cccccc',
            tabBarStyle: {
              backgroundColor: '#222222'
            }
          }}
        >

          {/* Primeira aba: personagens da API */}
          <Tab.Screen
            name="Personagens"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? 'people' : 'people-outline'}
                  size={size}
                  color={color}
                />
              )
            }}
          >

            {() => (
              <Personagens
                favoritos={favoritos}
                alternarFavorito={alternarFavorito}
              />
            )}
          </Tab.Screen>

          {/* Segunda aba: favoritos pessoais */}
          
          <Tab.Screen
            name="Favoritos"
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? 'heart' : 'heart-outline'}
                  size={size}
                  color={color}
                />
              )
            }}
          >

            {() => (
              <Favoritos
                favoritos={favoritos}
                alternarFavorito={alternarFavorito}
              />
            )}
          </Tab.Screen>

        </Tab.Navigator>

      </NavigationContainer>

    </PaperProvider>
  );
}
