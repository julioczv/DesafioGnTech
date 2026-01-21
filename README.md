POKEAPI - Desafio Técnico Fullstack - GnTech

Este projeto foi desenvolvido como parte de um desafio técnico, com o objetivo de demonstrar, de forma prática,
a capacidade de integrar diferentes camadas de uma aplicação moderna: frontend, backend, banco de dados e infraestrutura.

A solução apresentada utiliza a PokeAPI como fonte de dados pública e implementa um fluxo completo de extração, persistência
e consulta dessas informações, seguindo boas práticas de organização, versionamento e arquitetura.


O que foi utilizado ? 

Linguagens: postgres (SQL), "HTML e CSS" e python.
Frameworks: Next.js


Objetivos do Projeto

1. Consumir dados de uma API pública

2. Processar e estruturar esses dados

3. Persistir informações em um banco de dados relacional

4. Expor uma API REST para consulta

5. Demonstrar integração entre frontend e backend

6. Utilizar Docker para padronização do ambiente

7. Manter clareza, organização e documentação do código


Fluxo de Dados

1. O frontend (Next.js) consome dados diretamente da PokeAPI

2. Os Pokémons são exibidos ao usuário

3. Ao acionar a opção “Salvar no banco”:

4. O frontend envia os dados já consumidos para o backend

   5. O backend (FastAPI):

    6. Recebe os dados

    7. Realiza validações

    8. Insere ou atualiza os registros no banco de dados

    9. Os dados ficam disponíveis para consulta via API REST


API Pública Utilizada

PokeAPI: https://pokeapi.co/api/v2/pokemon

Banco de Dados: PostgreSQL 16<br/>
Tabela: Pokemons

id	Chave primária<br/>
pokemon_id	ID original da PokeAPI<br/>
name	Nome do Pokémon<br/>
types	Tipos do Pokémon<br/>
abilities	Habilidades<br/>
created_at	Data de criação

Backend – FastAPI

O backend foi desenvolvido utilizando FastAPI, visando simplicidade, performance e excelente documentação automática.

Endpoints disponíveis <br/>

POST	/pokemons	Salva os Pokémons <br/>
GET	/pokemons	Lista Pokémons  <br/>
DELETE	/pokemons	Remove todos os Pokémons

Segurança: Como não há uma chave API da PokeAPI eu criei uma para poder suprir a necessidade do desafio
poke-api-key: challenge-demo-key

Disponivel via Swagger:
http://localhost:8000/docs

Conteinerização com Docker
Todo o ambiente é executado via Docker Compose, garantindo facilidade de execução e padronização.

Backend (FastAPI)	8000<br/>
PostgreSQL	5432

Para executar o projeto:
docker compose up --build<br/>
npm run dev

Váriaveis de ambiente

Backend<br/>
DATABASE_URL=postgresql+psycopg2://postgres:password@db:5432/Pokemons<br/>
POKEAPI_API_KEY=challenge-demo-key

Frontend<br/>
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000<br/>
POKEAPI_API_KEY=challenge-demo-key

