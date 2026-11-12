
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Card } from 'react-native-paper';

import styles from '../styles';

// Recebe a lista e a função enviadas pelo App.js
export default function Favoritos({ favoritos, alternarFavorito }) {

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <Text style={styles.titulo}>
        Meus Favoritos
      </Text>

      <Text style={styles.subtitulo}>
        Total de favoritos: {favoritos.length}
      </Text>

      {/* Mensagem quando não existem favoritos */}
      {favoritos.length === 0 && (
        <Text style={styles.mensagem}>
          Você ainda não adicionou personagens aos favoritos.
        </Text>
      )}

      {/* Lista de personagens favoritos */}
      <ScrollView style={styles.lista}>

        {favoritos.map(function (personagem) {
          return (

            <Card
              key={personagem.id}
              style={styles.card}
              mode="contained"
            >

              {/* Imagem do personagem */}
              {personagem.imagem && (
                <Card.Cover
                  source={{ uri: personagem.imagem }}
                  style={styles.imagem}
                />
              )}

              {/* Informações do personagem */}
              <Card.Content style={styles.conteudoCard}>

                <Text style={styles.nome}>
                  {personagem.nome}
                </Text>

                <Text style={styles.informacao}>
                  Participação: {personagem.participacao === 'Main'
                    ? 'Principal'
                    : 'Secundário'}
                </Text>

                {/* Remove o personagem dos favoritos */}
                <Pressable
                  style={styles.botaoFavorito}
                  onPress={() => alternarFavorito(personagem)}
                >

                  <Text style={styles.textoBotao}>
                    Remover dos favoritos
                  </Text>

                </Pressable>

              </Card.Content>

            </Card>

          );
        })}

      </ScrollView>

    </View>
  );
}
