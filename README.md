# <h1 align="center" id="top" border="none">🎶 Labenu Music Awards - LAMA4 🎶</h1>

<div align="center">
<a href="#link">API</a> | <a href="#sobre">Sobre</a> | <a href="#tecnologias">Tecnologias</a> | <a href="#funciona">O que foi feito</a> | <a href="#nao-funciona">Backlog</a> | <a href="#devs">Desenvolvedores</a>
</div>

## <h2 id="link">🔗 API <h2>

https://documenter.getpostman.com/view/17587459/UyxjFm6p

## <h2 id="sobre">📓 Sobre<h2>

<p align="center">🚀 Projeto backend desenvolvido conforme proposta do bootcamp ministrado pela Labenu. 🚀</p>
  
<p align="justify">O <strong>LAMA</strong>, *Labenu Musical Awards*, é um festival com vários shows de bandas famosas para a formatura da turma Vaughan, onde é possível eleger a banda que o público mais gostou! Este projeto é um sistema que permite o gerenciamento completo desses shows.</p>
  
## <h2 id="tecnologias">🛠️ Tecnologias</h2> 
As seguintes ferramentas foram usadas na construção do projeto:

* Typescript
* Express
* Knex
* MySQL
* UUID
* Bcryptjs
* Jsonwebtoken
* Postman

## <h2 id="funciona">✔️ O que foi feito</h2>
  
* Endpoint de Cadastro
    * O sistema permite o registro os usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, além do tipo do usuário. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin).
    * O usuário é logado automaticamente após o cadastro, utilizando o token retornado.

* Endpoint de Login
    * Para realizar o login, basta informar seu e-mail e a sua senha.
    * O retorno deve conter o token de autenticação do usuário.

* Endpoint de Registrar Banda
    * Para uma banda ser registrada, é preciso das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela).
    * Não podem existir duas bandas com o mesmo nome.
    * Somente administradores podem registrar bandas.
  
* Endpoint de Detalhes de Banda
    * A partir do id ou o nome da banda, é retornado todas as informações salvas sobre ela.
  
* Endpoint de Adicionar Show a um Dia
    * Para cadastrar um show, é necessário do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar.
    * Os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.
    * Não é permitido marcar um show para o mesmo dia e horário.
  
* Endpoint de Pegar Todos os Shows de uma Data
    * Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data, mostrando somente o nome da banda e o gênero musical principal.
  
## <h2 id="nao-funciona">📋 Backlog</h2>

* Realizar testes
* Melhorar os erros

## <h2 id="devs">💼 Desenvolvedores</h2>
  
  - <a href="https://www.linkedin.com/in/adria-tavares/" targe="_blank" title="Conecte-se comigo no Linkedin">Ádria Tavares</a>
  - <a href="https://www.linkedin.com/in/ronald-santiago-438685228/" targe="_blank" title="Conecte-se comigo no Linkedin">Ronald Santiago</a>

________________________________________

<a href='#top'>Voltar para o topo</a>
  
