# Instalação das Dependências
Antes de executar o projeto, é necessário instalar as dependências. Siga os passos abaixo:

Certifique-se de que você tem o Node.js instalado em sua máquina. Você pode verificar se o Node.js está instalado usando o comando:

```bash
node -v
```
E para verificar a versão do npm:


```bash
npm -v
```
No diretório raiz do projeto, execute o comando abaixo para instalar todas as dependências necessárias:


```bash
npm install
```
Esse comando irá ler o arquivo package.json e instalar todas as bibliotecas listadas como dependências do projeto.


# Configuração do Banco de Dados
Este projeto utiliza o MongoDB como banco de dados. Existem duas maneiras de garantir que o MongoDB esteja rodando:

1. Usando uma Instância Local do MongoDB
Se você já tem o MongoDB instalado localmente, certifique-se de que ele está em execução. O MongoDB geralmente pode ser iniciado com o seguinte comando:

```bash
mongod
```
2. Usando Docker Compose
Caso você não tenha o MongoDB instalado localmente, você pode utilizar o Docker Compose para rodar o banco de dados. Um arquivo docker-compose.yml foi disponibilizado no repositório para facilitar esse processo.

Para utilizar o Docker Compose, siga os passos abaixo:

Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.

No diretório raiz do projeto, execute o comando:

```bash
docker-compose up -d
```
Esse comando irá criar e iniciar um contêiner com o MongoDB configurado conforme as especificações do arquivo docker-compose.yml.

Verifique se o contêiner está rodando corretamente:

```bash
docker ps
```
O MongoDB deve estar listado nos contêineres em execução.

# Configuração do Ambiente (.env)
Este projeto utiliza variáveis de ambiente para configurar o acesso ao banco de dados e outras configurações essenciais. Um arquivo de exemplo chamado `.env.example` foi disponibilizado no repositório para ajudar você a configurar o seu próprio arquivo `.env`.

Passos para Configuração:
Copie o arquivo `.env.example`: No diretório raiz do projeto, copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```
Edite o arquivo `.env`: Abra o arquivo .env e configure as variáveis de ambiente conforme necessário para o seu ambiente de desenvolvimento. As variáveis disponíveis incluem:
```bash
DATABASE_USER=root
DATABASE_PASSWORD=example
HOST=192.168.0.103:3000
KEY=chave
```
- DATABASE_USER: Nome de usuário para acessar o banco de dados.
- DATABASE_PASSWORD: Senha para acessar o banco de dados.

- HOST: Endereço e porta onde o servidor está rodando.

- KEY:`Opcional` Uma chave usada para autenticação ou outros propósitos específicos do projeto.

Salve as alterações: Depois de editar, salve o arquivo .env.

# Executando o Projeto
Após configurar as dependências e o banco de dados, você pode iniciar o projeto em modo de desenvolvimento. Siga os passos abaixo:

Certifique-se de que todas as dependências foram instaladas e que o banco de dados MongoDB está em execução.

Execute o comando abaixo para iniciar o projeto:

```bash
npm run start:dev
```
Este comando iniciará o servidor em modo de desenvolvimento.

- Chave de API: Durante a inicialização, uma chave de API aleatória será gerada e exibida no console. Se você preferir definir sua própria chave de API, você pode adicioná-la no arquivo `.env` utilizando a variável KEY:

```bash
KEY=sua_chave_personalizada
```
Caso você opte por não definir a chave no .env, a chave aleatória gerada será utilizada automaticamente.

# Autenticação de Requests
Para acessar as rotas autenticadas do projeto, como a rota `"/encurta"`, você precisará incluir a chave de API no cabeçalho das suas requisições.

Instruções para Enviar Requests Autenticadas:
Rota Autenticada: A rota `"/encurta"` é protegida e requer autenticação via chave de API.

Cabeçalho `x-api-key`: Ao enviar uma requisição para essa rota, inclua a chave de API no cabeçalho `x-api-key`. A chave de API pode ser a chave gerada automaticamente durante a inicialização do projeto ou a chave que você definiu manualmente no arquivo `.env`.

| Exemplo de Request usando cURL:

```bash
Copiar código
curl -X POST http://localhost:3000/encurta \
-H "x-api-key: sua_chave_aqui" \
-d '{"url": "https://example.com"}'
```
Nesse exemplo, a chave sua_chave_aqui deve ser substituída pela chave gerada ou definida no arquivo `.env`.