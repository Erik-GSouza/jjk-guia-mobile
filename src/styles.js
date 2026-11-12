import { StyleSheet } from 'react-native';

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

    botaoFavorito: {
        backgroundColor: '#59359a',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },

});

export default styles;