Vaga da DTI digital


### Primeiros Passos

## Configuração do Backend

1. Clone o repositório:

```bash
git clone https://github.com/bragap/teste-dti-front-react.git 
```

2. Navegue até o diretório do projeto:
```bash
cd backend
```

3. Configure o banco de dados MySQL:
```bash 
No arquivo application.properties localizado em src/main/resources, ajuste as credenciais do banco de dados conforme instalado na sua máquina previamente.
```

4. Construa e execute o backend:

```bash
mvn clean install
mvn spring-boot:run
```

5. Configuração de CORS:

```bash
Certifique-se de que a classe CorsConfig esteja configurada corretamente no pacote config para permitir requisições do frontend.
```