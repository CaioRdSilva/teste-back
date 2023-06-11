## Descrição

Projeto teste-back Ti.saúde, feito com NestJs, JWT, typeORM.

Finalidade - Criar uma API-(CRUD) que possuisse um usuario onde o mesmo possuisse notas e consequentemente as mesmas possuissem categorias.

## Configuração de ambiente

1. Necessário NodeJs instalado - Versão utilizada 18.16.0

2. Banco de dados
   Banco mysql - database: 'test-back' - host: 'localhost'- port: '3306' - user: 'root' - password: 'root';

3. Aplicação Utilizada para fazer requisições (Postman).

- Na area de Tests executar o seguibte comando para guardar o token em uma variavel 'token' 
 ```js
  var res = pm.response.json();
  pm.globals.set('token', res.token);
```
- Necessário definir a seção de autorização como (Bearer Token) - exceto nas rotas de criação e login de usuario, em todas as outras a falta do token causara erro de permissão negada.

- Definir que a token passada na seção acima será a variavel 'token' criada na primeira seção.

## Instalação de NodeModules para iniciar a aplicação

```bash
$ npm install
```

## Execução da aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Lista de Rotas da aplicação

Informações via Post devem ser passadas pelo Body.

A senha do usuario é case sensitive e necessita numeros e caracteres especiais Exemplo: Animal@123

### Rotas de Autenticação e usuario

(Registro do usuario) (Post request) `http://localhost:3000/auth/register`

(Login do usuario) (Post request) `http://localhost:3000/auth/login`

### Rotas de Notas

(Busca todas as notas) (Get request) `http:/localhost:3000/notas`

(Busca a nota especificada e sua(s) categoria(s)) (Get request) `http:/localhost:3000/notas/:id`

(Cria nova nota) (Post request) `http:/localhost:3000/notas`

(Atualiza descrição da nota especificada) (Patch request) `http:/localhost:3000/notas/:id`

(Deleta nota especificada) (Delete request) `http:/localhost:3000/notas/:id`

### Rotas de Categorias

(Busca todas as categorias) (Get request) `localhost:3000/categoria/`

(Busca categoria especificada) (Get request) `localhost:3000/categoria/:id`

(Cria categoria da nota especificada) (Post request) `localhost:3000/categoria/:id`

(Atualiza categoria especificada especificada) (Patch request) `http:/localhost:3000/categoria/:id`

(Deleta categoria especificada) (Delete request) `localhost:3000/categoria/:id`
