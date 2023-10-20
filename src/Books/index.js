import React from 'react';

import { Container, Nome, Preco, CenterView, Botao, BotaoText } from './styles';

export default function Books({ data }) {

 return (
   <Container>

    <Nome>{data.nome}</Nome>
    <Preco>R$ {data.preco}</Preco>

    <CenterView>

        <Botao onPress={() => {}}>
            <BotaoText>Editar</BotaoText>
        </Botao>

        <Botao onPress={() => {}}>
            <BotaoText>Excluir</BotaoText>
        </Botao>

    </CenterView>

   </Container>

  );
}