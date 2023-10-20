import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { Container, Logo, Title, Input, CenterView, Botao, BotaoText, List } from './styles';

import Books from './Books';
import getRealm from './services/realm';

export default function App() {

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [books, setBooks] = useState([]);

    //Pegando os dados ao iniciar o aplicativo
    useEffect(() => {

        loadBooks = async() => {

            //Abrindo a conexão
            const realm = await getRealm();

            //Buscando os itens que foram mandados pro realm
            const data = realm.objects('Book');

            //Adicionando o item na lista
            setBooks(data)
        }

        loadBooks()
    }, [])

    saveBook = async (data) =>  {
        const realm = await getRealm();

        //Pegando todos os itens por ordem crescente

        const id = realm.objects('Book').sorted('id', true).length > 0 ? realm.objects('Book').sorted('id', true)[0].id + 1 : 1;

        const dadosLivro = {
            id: id,
            nome: data.nome,
            preco: data.preco
        }

        realm.write(() =>{
            //Salvando no banco
            realm.create('Book', dadosLivro)
        })
    }

    async function addBook(){

        if(nome === '' || preco === ''){
            alert('Preencha todos os campos');
            return;
        }

        try{
            const data = {nome: nome, preco: preco}
            await saveBook(data);
            console.log(data)

            setNome('');
            setPreco('');

            Keyboard.dismiss()

        }catch(err){
            alert(err)
        }

    }

 return (
   <Container>
    <Logo>Próximos livros</Logo>

    <Title>Nome:</Title>
    <Input 
    autoCapitalize="none" 
    autoCorrect={false}
    value={nome}
    onChangeText={(text) => setNome(text)}
    />

    <Title>Preço:</Title>
    <Input 
    autoCapitalize="none" 
    autoCorrect={false}
    value={preco}
    onChangeText={(text) => setPreco(text)}
    />

    <CenterView>
        <Botao onPress={addBook}>
            <BotaoText>Cadastrar</BotaoText>
        </Botao>

        <Botao onPress={() => {}}>
            <BotaoText>Editar</BotaoText>
        </Botao>
    </CenterView>

    <List
    data={books}
    keyExtractor={ item => String(item.id)}
    renderItem={({item}) => <Books data={item}/>}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    />

   </Container>
  );
}