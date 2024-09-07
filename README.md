![alt text](image.png)
lembre é uma aplicação full-stack que permite aos usuários controlar seus lembretes mais importantes. O backend é construído com Java e Spring Boot, seguindo os padrões RESTful, enquanto o frontend é desenvolvido usando React e TypeScript com Vite como ferramenta de build. Para estilização, foi utilizado o pré-processador Sass. Para manipular dados, foram criados hooks customizados junto do Redux. A aplicação é responsiva e os testes unitários se encontram em: 

*******

## Índice
1. [Funcionalidades](#funcionalidades)
2. [Requisitos](#requisitos)
3. [Configuração do Backend](#backend)
4. [Configuração do Frontend](#frontend)
5. [Endpoints da API](#endpoints)
6. [Premissas Assumidas](#premissas)
7. [Decisões de Projeto](#decisoes)

*******

<div id='funcionalidades'/>

## Funcionalidades 

 - Backend:
   - API RESTful com endpoints para criar, buscar e deletar lembretes.
   - Integração com um banco de dados MySQL para armazenar os lembretes
   - Configuração de CORS para permitir requisições do frontend.

 - Frontend:
   - Interface amigável para inserir dados e exibir resultados.
   - Seletor de data para escolher a data.
   - Campo de formulário para inserir as informações do lembrete.
   - Exibição dos lembretes por ordem cronológica e agrupados por dias.
   - Opção de deletar um lembrete.


<div id='requisitos'/>  

## Requisitos
Certifique-se de ter as seguintes dependências instaladas no seu ambiente:
 - Node.js (versão 16 ou superior)
 - npm (versão 7 ou superior)
 - Java (versão 17 ou superior)
 - MySQL


<div id='backend'/>  

## Configuração do Backend

1. Clone o repositório:

```bash
git clone https://github.com/bragap/teste-dti-front-react.git 
```

2. Navegue até o diretório do projeto backend:
```bash
cd backend
```

3. Configure o banco de dados MySQL:

No arquivo application.properties localizado em src/main/resources, ajuste as credenciais do banco de dados conforme instalado na sua máquina previamente.


4. Construa e execute o backend:

```bash
mvn clean install
mvn spring-boot:run
```

5. Configuração de CORS:

Certifique-se de que a classe CorsConfig esteja configurada corretamente no pacote config para permitir requisições do frontend. Altere para a porta em que rodará o seu frontend. Por padrão, utiliza-se a porta 5173.


<div id='frontend'/>

## Configuração do Frontend

1. Navegue até o diretório do projeto frontend (você deve estar na raíz do projeto!):
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o frontend:
```bash
npm run dev
```

4. Acesse a aplicação:
Abra seu navegador e navegue para [http://localhost:5173](http://localhost:5173).



<div id='endpoints'/>

## Endpoints da API

1. Retorna todos os lembretes cadastrados pelo usuário:

GET : [/reminders](http://localhost:8080/reminders)

Resposta: 
```bash
[
  {
    "id": 1,
    "name": "Consulta médica",
    "date": "2024-09-10"
  },
  {
    "id": 2,
    "name": "Reunião de Sprint",
    "date": "2024-09-15"
  }
]
```

2. Buscar lembretes por data:

GET : [/reminders/date/{date}](http://localhost:8080/reminders/date/2024-09-15)

Parâmetros:
 - date (path variable): Data no formato yyyy-MM-dd

Resposta: 
```bash
[
  {
    "id": 2,
    "name": "Reunião de Sprint",
    "date": "2024-09-15"
  }
]
```

3. Criar um novo lembrete. Se a data já existir, o lembrete será listado na mesma data; caso contrário, um novo dia será exibido:

POST: [/reminders](http://localhost:8080/reminders)

Corpo da requisição:
```bash
{
  "name": "Deadline Final",
  "date": "2024-09-20"
}
```
Resposta:
```bash
{
  "id": 3,
  "name": "Deadline Final",
  "reminder_date": "2024-09-20"
}
```

4. Deletar um lembrete:

DELETE: [/reminders/{id}](http://localhost:8080/reminders/date/3)

Parâmetros:
 - id (path variable): ID do lembrete a ser deletado.



<div id='premissas'/>

## Premissas assumidas

1. A aplicação assume que os dispositivos dos usuários podem variar (desktop, tablet, mobile), mas a estrutura está desenhada para ser responsiva com base em tamanhos de tela padrão.

2. O estado do sistema é mantido na interface via Redux, com persistência no backend.


<div id='decisoes'/>

## Decisões de Projeto
1. Arquitetura baseada em componentes: A aplicação segue o padrão de desenvolvimento com componentes no React, garantindo uma estrutura modular e reutilizável. Cada funcionalidade do sistema (criação de lembretes, exibição de lembretes) está encapsulada em componentes independentes.

2. Gerenciamento de Estado com Redux: Redux foi utilizado para centralizar o estado global da aplicação. Isso permite que diferentes partes da aplicação acessem e modifiquem o estado de forma previsível e eficiente.

3. Hooks Customizados: A lógica para comunicação com a API foi abstraída em hooks customizados (useCreateReminder, useReadReminder, useDeleteReminder).

4. Uso de Dialogs Dinâmicos para Feedback ao Usuário: Para melhorar a experiência do usuário, modais/dialogs são exibidos dinamicamente quando ações são concluídas com sucesso ou falham.

5. Estilização Modular com SCSS: Cada componente possui seu próprio arquivo de estilos .scss, garantindo que o escopo de estilos seja isolado. Isso facilita a manutenção e permite que cada parte da interface tenha sua estilização de forma independente, seguindo as boas práticas de CSS modular.

6. Configuração de CORS e Comunicação com API: A aplicação utiliza Axios para realizar requisições HTTP ao backend Spring Boot. O backend está configurado para permitir requisições CORS vindas do frontend em React.

7. Princípios SOLID no Backend: Aplicação dos princípios SOLID para garantir um código mais modular e de fácil manutenção.

8. Padrão MVC (Model-View-Controller) no Backend: Foi utilizado o padrão MVC no backend para organizar a lógica de negócio e a interação com o banco de dados.

9. Padrão RESTful para APIs: As APIs desenvolvidas seguem o padrão RESTful, garantindo que as rotas estejam organizadas de forma semântica e intuitiva. 