# Manual de Instalação Detalhado do Sistema de Controle de Frota

Este manual fornece um guia passo a passo, com explicações didáticas e imagens, para configurar e executar o Sistema de Controle de Frota em um ambiente de desenvolvimento local e para implantá-lo em um servidor web de produção. As instruções serão adaptadas para usuários de **Windows 10**.

## 1. Execução em Ambiente Local (Desenvolvimento) no Windows 10

Para rodar o sistema em sua máquina local com Windows 10, siga os passos abaixo. Certifique-se de ter os pré-requisitos instalados.

### 1.1. Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados em sua máquina. Para Windows, usaremos os instaladores oficiais e o **Prompt de Comando (CMD)** ou **PowerShell** para executar os comandos.

#### 1.1.1. Node.js

O Node.js é o ambiente de execução JavaScript necessário para o backend e o frontend. Recomenda-se a versão LTS (Long Term Support).

1.  **Baixe e instale o Node.js:**
    Acesse o site oficial do Node.js: [https://nodejs.org/](https://nodejs.org/)
    Baixe o instalador `.msi` da versão LTS recomendada para Windows e siga as instruções do instalador. Ele geralmente inclui o npm (Node Package Manager).

    ![Download Node.js](https://private-us-east-1.manuscdn.com/sessionFile/Zk3YH397ykNnlH9Rux8UP7/sandbox/634ZV3jGXUMTrLS9g4Gs5h-images_1758951552740_na1fn_L2hvbWUvdWJ1bnR1L3NjcmVlbnNob3RzL25vZGVqc19kb3dubG9hZA.webp?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWmszWUgzOTd5a05ubEg5UnV4OFVQNy9zYW5kYm94LzYzNFpWM2pHWFVNVHJMUzlnNEdzNWgtaW1hZ2VzXzE3NTg5NTE1NTI3NDBfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzTmpjbVZsYm5Ob2IzUnpMMjV2WkdWcWMxOWtiM2R1Ykc5aFpBLndlYnAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dgQZ0vGmaH9DYrNsMY3vvJWmOm8fqbDrVi4tueSZed~J8ZvG1Vs3PcjdLLIgyYfT93qs~RJ5Ulhbyihv14HawanYKvIuFT4xZBqWFM1iK0uibE~BulAwDsTP9c4LDeiWIQQxBhSfMJy5zoKMdZ9UTCUJOLviXAj6qtZikiYGdYmmFDzP1hLhwfcO7nwmNfGUMDiEj3-CmD7ktOgMOV3O0Swxgjex2e1y6P3dYDM~rQ8uDO6ZZDyplkJF4NctsF-hIik4POAxzFsiNIPIqagxjZFhySTwMh7JsfZ~qyEVYcl1Irj2VzdQoVT~-Fi3o21u1y67qUULLK5TKYaDfw4Anw__)
    *Figura 1: Página de download do Node.js. Escolha o instalador para Windows.*

2.  **Verifique a instalação:**
    Abra o **Prompt de Comando (CMD)** ou **PowerShell** e execute:
    ```bash
    node -v
    npm -v
    ```
    Você deverá ver as versões instaladas do Node.js e do npm.

#### 1.1.2. pnpm

O pnpm é um gerenciador de pacotes alternativo ao npm/yarn, conhecido por ser mais rápido e eficiente no uso de espaço em disco.

1.  **Instale o pnpm globalmente:**
    No **Prompt de Comando (CMD)** ou **PowerShell**, execute:
    ```bash
    npm install -g pnpm
    ```
    ![Instalação do pnpm](https://via.placeholder.com/600x200?text=Instala%C3%A7%C3%A3o+do+pnpm)
    *Figura 2: Instalação global do pnpm via npm.*

2.  **Verifique a instalação:**
    ```bash
    pnpm -v
    ```

#### 1.1.3. PostgreSQL

O PostgreSQL é o sistema de gerenciamento de banco de dados relacional utilizado pelo sistema.

1.  **Baixe e instale o PostgreSQL:**
    Acesse o site oficial do PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
    Escolha o instalador para **Windows** e siga as instruções. Durante a instalação, você será solicitado a definir uma senha para o usuário `postgres` (o usuário administrador padrão). **Anote essa senha**, pois ela será necessária para configurar o banco de dados.

    ![Download PostgreSQL](https://private-us-east-1.manuscdn.com/sessionFile/Zk3YH397ykNnlH9Rux8UP7/sandbox/634ZV3jGXUMTrLS9g4Gs5h-images_1758951552742_na1fn_L2hvbWUvdWJ1bnR1L3NjcmVlbnNob3RzL3Bvc3RncmVzcWxfZG93bmxvYWQ.webp?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWmszWUgzOTd5a05ubEg5UnV4OFVQNy9zYW5kYm94LzYzNFpWM2pHWFVNVHJMUzlnNEdzNWgtaW1hZ2VzXzE3NTg5NTE1NTI3NDJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzTmpjbVZsYm5Ob2IzUnpMM0J2YzNSbmNtVnpjV3hmWkc5M2JteHZZV1Eud2VicCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lFrn2~lQBnNxJUUjKwJUpkTfRhK1~ZldjQxb2UhtNe3HiPIqrFIVegF4mV-hM0sinjDtJ1DaqwCWGsaNTulgS89ulZGd4~i03wwB~6-RoaAOf-8IzbOUjxuAuhrC5hLhiVrvV9tIBrASUa1~Kd4LtOm2qX-75QOBjYrFG26PYAyP~g1~Q1jZw9Cin2nafCEsNB3rkoAVUdVrapdFvPbiPuB0pwqQo1PQ0EXVqnuOYYSRxTMThpR3Q6Zf7RGWc4B3RpbYqmHb00Y5W2dTUr-3jVnzeSD1AtY3OKpMa2hM34If8i8AE4mrLE~sLJYAkkWtz-vLnPUSozXoixaqB-ns7g__)
    *Figura 3: Página de download do PostgreSQL. Escolha o instalador para Windows.*

2.  **Ferramenta de Gerenciamento (Opcional, mas Recomendado):**
    É altamente recomendável instalar uma ferramenta gráfica para gerenciar seu banco de dados, como o **pgAdmin**. Ele geralmente vem junto com o instalador do PostgreSQL ou pode ser baixado separadamente em [https://www.pgadmin.org/download/](https://www.pgadmin.org/download/).

#### 1.1.4. Git

O Git é um sistema de controle de versão essencial para baixar o código-fonte do projeto.

1.  **Instale o Git:**
    Baixe o instalador para Windows em [https://git-scm.com/downloads](https://git-scm.com/downloads) e siga as instruções. Durante a instalação, você pode optar por usar o Git Bash, que oferece um ambiente de terminal similar ao Linux.

2.  **Verifique a instalação:**
    Abra o **Prompt de Comando (CMD)**, **PowerShell** ou **Git Bash** e execute:
    ```bash
    git --version
    ```

### 1.2. Configuração do Backend (Node.js/Express.js)

1.  **Clonar o Repositório do Backend:**
    Abra o **Prompt de Comando (CMD)**, **PowerShell** ou **Git Bash** e clone o repositório do backend. Substitua `<URL_DO_REPOSITORIO_BACKEND>` pela URL real do seu repositório Git.
    ```bash
    git clone <URL_DO_REPOSITORIO_BACKEND>
    cd sistema-frota-backend # Ou o nome da pasta do seu backend
    ```

2.  **Instalar Dependências:**
    Dentro do diretório do backend, execute:
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do diretório `sistema-frota-backend` com base no `.env.example` fornecido. Preencha as informações do seu banco de dados PostgreSQL e outras variáveis necessárias. Certifique-se de que `DB_HOST` seja `localhost` para instalação local.

    Exemplo de `.env`:
    ```dotenv
    PORT=3000
    NODE_ENV=development
    DATABASE_URL="postgresql://user:password@localhost:5432/fleet_control_db"
    DB_NAME=fleet_control_db
    DB_USER=user
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta_jwt_para_desenvolvimento
    FRONTEND_URL=http://localhost:5173
    # Outras variáveis como EMAIL_USER, EMAIL_PASS, etc.
    ```
    *Substitua `user` e `password` pelas credenciais do seu PostgreSQL.*

4.  **Configurar o Banco de Dados:**
    *   **Crie o banco de dados:** Usando o pgAdmin (recomendado) ou o terminal `psql` (disponível após a instalação do PostgreSQL), crie um banco de dados com o nome definido em `DB_NAME` (ex: `fleet_control_db`).
        ```bash
        # Exemplo via terminal (no Prompt de Comando ou PowerShell, como administrador)
        # Primeiro, acesse o psql como o usuário postgres
        "C:\Program Files\PostgreSQL\<versao>\bin\psql.exe" -U postgres
        
        # Dentro do psql, execute os comandos:
        CREATE DATABASE fleet_control_db;
        CREATE USER seu_usuario WITH ENCRYPTED PASSWORD 'sua_senha';
        GRANT ALL PRIVILEGES ON DATABASE fleet_control_db TO seu_usuario;
        \q
        ```
        *Substitua `<versao>` pela versão do PostgreSQL instalada (ex: `16`).*

    *   **Execute as migrações:** No terminal, dentro do diretório do backend, execute para criar as tabelas:
        ```bash
        npx sequelize-cli db:migrate
        ```
    *   **(Opcional) Popule o banco de dados com dados de exemplo:** Se houver *seeders* disponíveis, você pode executá-los:
        ```bash
        npx sequelize-cli db:seed:all
        ```

5.  **Iniciar o Servidor Backend:**
    No terminal, dentro do diretório do backend, execute:
    ```bash
    pnpm run dev
    ```
    O servidor estará acessível em `http://localhost:3000` (ou a porta definida em `PORT`). Você verá mensagens no terminal indicando que o servidor está rodando.

### 1.3. Configuração do Frontend (React.js)

1.  **Clonar o Repositório do Frontend:**
    Abra um **novo terminal** (Prompt de Comando, PowerShell ou Git Bash) e clone o repositório do frontend. Substitua `<URL_DO_REPOSITORIO_FRONTEND>` pela URL real do seu repositório Git.
    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND>
    cd sistema-frota # Ou o nome da pasta do seu frontend
    ```

2.  **Instalar Dependências:**
    Dentro do diretório do frontend, execute:
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do diretório `sistema-frota` (ou o nome da pasta do seu frontend). O frontend precisará saber onde encontrar a API do backend.

    Exemplo de `.env` (para projetos Vite/React):
    ```dotenv
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
    *Certifique-se de que a URL e a porta correspondem ao seu backend local.*

4.  **Iniciar o Servidor de Desenvolvimento Frontend:**
    No terminal, dentro do diretório do frontend, execute:
    ```bash
    pnpm run dev
    ```
    O terminal indicará a URL onde o frontend está rodando, geralmente `http://localhost:5173` ou `http://localhost:5174`. Abra essa URL no seu navegador web.

    ![Protótipo Dashboard](https://private-us-east-1.manuscdn.com/sessionFile/Zk3YH397ykNnlH9Rux8UP7/sandbox/634ZV3jGXUMTrLS9g4Gs5h-images_1758951552794_na1fn_L2hvbWUvdWJ1bnR1L3NjcmVlbnNob3RzL2xvY2FsaG9zdF8yMDI1LTA5LTI2XzAzLTM1LTAwXzMzMTg.webp?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWmszWUgzOTd5a05ubEg5UnV4OFVQNy9zYW5kYm94LzYzNFpWM2pHWFVNVHJMUzlnNEdzNWgtaW1hZ2VzXzE3NTg5NTE1NTI3OTRfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzTmpjbVZsYm5Ob2IzUnpMMnh2WTJGc2FHOXpkRjh5TURJMUxUQTVMVEkyWHpBekxUTTFMVEF3WHpNek1UZy53ZWJwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=slbmQrnyizmw9Sjhw5qOfITxgr1bJEuC1VCfHZ9q3wVnNEmn1DsgsHRaBfwJkTZWg8ymDl1PFvvOQyeOaBll-Aoa1eitTkirRt3Gv6hXuURpDdhow7DoNRyJRMljMgboZAbhfNlE1GzI9DNTY7eZTYvpoTTDrcp8Ee73oRDzOej8sl2-SGslXHIhLKgeIiCFdnNqnBoiNbaT~~Vk7ORA6g4dV~x7EFDF9nMXuHgdDqTszSyYltja2PVyQMgtDii3cCwx67syZ-BdI9dPKQ25k7sB6pwtH9QHYzQAyMC9hm1GCWpaCbb8boY1VVgq4npgWIlwZ2bAaNDqgBW7KN50sQ__)
    *Figura 4: Exemplo da tela de Dashboard do protótipo do sistema.*

## 2. Implantação em Servidor Web (Produção)

A implantação em um servidor web de produção é um processo mais complexo, focado em segurança, desempenho e disponibilidade. Recomenda-se ter um bom conhecimento de administração de sistemas Linux, pois a maioria dos servidores de produção roda Linux.

### 2.1. Pré-requisitos no Servidor

Conecte-se ao seu servidor via SSH (você pode usar o PowerShell no Windows para isso) e instale os seguintes softwares:

*   **Sistema Operacional:** Linux (Ubuntu 22.04 LTS é uma boa escolha).
*   **Node.js:** Versão 18.x ou superior. Instale usando `nvm` ou os pacotes oficiais.
*   **PostgreSQL:** Servidor de banco de dados. Instale e configure-o para aceitar conexões.
*   **Nginx:** Servidor web para atuar como **proxy reverso** para o backend Node.js e para **servir os arquivos estáticos** do frontend React.js.
*   **PM2:** Gerenciador de processos para Node.js, que garante que sua aplicação backend permaneça online, reiniciando-a automaticamente em caso de falhas.
*   **Git:** Para clonar o código-fonte do projeto.

Exemplo de instalação de alguns pré-requisitos no Ubuntu:
```bash
sudo apt update
sudo apt install -y curl git nginx postgresql postgresql-contrib

# Instalar NVM (Node Version Manager) e Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc # Ou ~/.zshrc
nvm install --lts
nvm use --lts

# Instalar pnpm globalmente
npm install -g pnpm

# Instalar PM2 globalmente
npm install -g pm2
```

### 2.2. Configuração do Banco de Dados no Servidor

1.  **Crie um novo usuário e banco de dados para a aplicação:**
    ```bash
    sudo -u postgres psql
    CREATE DATABASE fleet_control_db;
    CREATE USER seu_usuario_producao WITH ENCRYPTED PASSWORD 'sua_senha_segura_producao';
    GRANT ALL PRIVILEGES ON DATABASE fleet_control_db TO seu_usuario_producao;
    \q
    ```
    *Substitua `seu_usuario_producao` e `sua_senha_segura_producao` por credenciais fortes.*

2.  **Configure o acesso remoto (se necessário):**
    Se o backend e o banco de dados estiverem em servidores diferentes, você precisará configurar o PostgreSQL para aceitar conexões remotas. Edite os arquivos `postgresql.conf` e `pg_hba.conf` (geralmente em `/etc/postgresql/<versao>/main/`).

### 2.3. Implantação do Backend

1.  **Crie o diretório do projeto e clone o repositório:**
    ```bash
    sudo mkdir -p /var/www/fleet-control/backend
    sudo chown -R $USER:$USER /var/www/fleet-control
    git clone <URL_DO_REPOSITORIO_BACKEND> /var/www/fleet-control/backend
    cd /var/www/fleet-control/backend
    ```

2.  **Instale as Dependências de Produção:**
    ```bash
    pnpm install --prod
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie o arquivo `.env` com as variáveis de ambiente para produção. Use senhas fortes e chaves JWT seguras. `DB_HOST` pode ser `localhost` se o banco de dados estiver no mesmo servidor, ou o IP/hostname do servidor de banco de dados.

    Exemplo de `.env` para produção:
    ```dotenv
    PORT=3000
    NODE_ENV=production
    DATABASE_URL="postgresql://seu_usuario_producao:sua_senha_segura_producao@localhost:5432/fleet_control_db"
    DB_NAME=fleet_control_db
    DB_USER=seu_usuario_producao
    DB_PASSWORD=sua_senha_segura_producao
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta_muito_segura_para_producao
    FRONTEND_URL=https://seu_dominio.com
    # Outras variáveis de produção
    ```

4.  **Execute as Migrações:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5.  **Gerencie o Processo com PM2:**
    Inicie a aplicação com PM2. Isso garantirá que ela reinicie automaticamente em caso de falha ou reinício do servidor.
    ```bash
    pm2 start server.js --name fleet-control-backend
    pm2 save
    pm2 startup
    ```
    Siga as instruções do `pm2 startup` para configurar o serviço de inicialização automática.

### 2.4. Implantação do Frontend

1.  **Crie o diretório do projeto e clone o repositório:**
    ```bash
    sudo mkdir -p /var/www/fleet-control/frontend
    sudo chown -R $USER:$USER /var/www/fleet-control
    git clone <URL_DO_REPOSITORIO_FRONTEND> /var/www/fleet-control/frontend
    cd /var/www/fleet-control/frontend
    ```

2.  **Instale as Dependências de Produção:**
    ```bash
    pnpm install --prod
    ```

3.  **Construa a Aplicação para Produção:**
    ```bash
    pnpm run build
    ```
    Este comando criará uma pasta `dist` (ou `build`) com os arquivos estáticos otimizados para serem servidos pelo Nginx.

4.  **Configurar Nginx como Proxy Reverso e Servidor de Estáticos:**
    Crie um arquivo de configuração para o seu domínio em `/etc/nginx/sites-available/seu_dominio.com`:

    ```nginx
    server {
        listen 80;
        server_name seu_dominio.com www.seu_dominio.com;

        location / {
            root /var/www/fleet-control/frontend/dist; # Caminho para a pasta build do React
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://localhost:3000; # Porta do seu backend Node.js (PM2)
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Adicione outras configurações de segurança e cache aqui
    }
    ```

5.  **Ativar a Configuração do Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/seu_dominio.com /etc/nginx/sites-enabled/
    sudo nginx -t # Testa a sintaxe da configuração
    sudo systemctl restart nginx
    ```

6.  **Configurar HTTPS (Altamente Recomendado com Certbot):**
    Utilize o Certbot para obter certificados SSL/TLS gratuitos do Let's Encrypt, garantindo a segurança da comunicação.
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
    ```
    Siga as instruções do Certbot para completar a configuração.

## 3. Sugestões de Provedores de Hospedagem

Para hospedar o Sistema de Controle de Frota, é recomendável utilizar provedores que ofereçam flexibilidade para Node.js, PostgreSQL e que permitam a configuração de um servidor web como Nginx. Abaixo estão algumas sugestões:

### 3.1. Provedores de Cloud (IaaS/PaaS)

Estes provedores oferecem maior controle e escalabilidade, sendo ideais para aplicações que podem crescer.

*   **DigitalOcean:** Oferece Droplets (VMs) e Managed Databases para PostgreSQL. É conhecido pela sua simplicidade e bom custo-benefício [1].
*   **AWS (Amazon Web Services):** Oferece uma vasta gama de serviços como EC2 (máquinas virtuais), RDS (banco de dados gerenciado, incluindo PostgreSQL) e S3 (armazenamento de arquivos). É altamente escalável, mas pode ter uma curva de aprendizado mais íngreme [2].
*   **Google Cloud Platform (GCP):** Similar à AWS, com serviços como Compute Engine (VMs) e Cloud SQL (PostgreSQL gerenciado). Possui uma infraestrutura robusta e ferramentas de IA/ML integradas [3].
*   **Microsoft Azure:** A plataforma de nuvem da Microsoft, com Virtual Machines e Azure Database for PostgreSQL. Boa integração com ecossistemas Microsoft, mas também complexa [4].

### 3.2. Provedores PaaS (Platform as a Service)

Estes provedores abstraem a infraestrutura, permitindo que o desenvolvedor se concentre mais no código.

*   **Heroku:** Uma plataforma PaaS popular que suporta Node.js e PostgreSQL (via Heroku Postgres). É fácil de usar e ideal para prototipagem e MVPs, mas pode se tornar caro em larga escala [5].
*   **Render:** Uma alternativa moderna ao Heroku, oferecendo hospedagem para serviços web (Node.js), bancos de dados (PostgreSQL) e serviços estáticos. Possui um modelo de preços transparente e é fácil de configurar [6].

### 3.3. Servidores Privados Virtuais (VPS)

Para quem busca um equilíbrio entre controle e custo, um VPS é uma boa opção.

*   **Hostinger, Vultr, Linode:** Oferecem VPS com bom desempenho e preços competitivos. Você terá que configurar o ambiente (Node.js, PostgreSQL, Nginx) manualmente, o que exige mais conhecimento técnico [7].

## 4. Considerações Finais para Hospedagem

Ao escolher um provedor de hospedagem, considere os seguintes fatores:

*   **Custo:** Avalie o modelo de preços e compare com o orçamento disponível.
*   **Escalabilidade:** O provedor pode suportar o crescimento futuro da sua aplicação?
*   **Facilidade de Uso:** Quão fácil é configurar, implantar e gerenciar a aplicação?
*   **Suporte:** A qualidade do suporte técnico oferecido.
*   **Localização dos Servidores:** Escolha um servidor geograficamente próximo aos seus usuários para menor latência.
*   **Segurança:** Recursos de segurança oferecidos pelo provedor.

Recomenda-se começar com um provedor que ofereça um bom equilíbrio entre custo e facilidade de uso, como DigitalOcean ou Render, e escalar para soluções mais robustas como AWS/GCP/Azure conforme a necessidade da Secretaria de Saúde de Irecê-BA evoluir.

## Referências

[1] DigitalOcean. *Cloud Computing for Developers*. Disponível em: [https://www.digitalocean.com/](https://www.digitalocean.com/)
[2] Amazon Web Services. *Cloud Computing Services*. Disponível em: [https://aws.amazon.com/](https://aws.amazon.com/)
[3] Google Cloud. *Cloud Computing Services*. Disponível em: [https://cloud.google.com/](https://cloud.google.com/)
[4] Microsoft Azure. *Cloud Computing Services*. Disponível em: [https://azure.microsoft.com/](https://azure.microsoft.com/)
[5] Heroku. *Cloud Application Platform*. Disponível em: [https://www.heroku.com/](https://www.heroku.com/)
[6] Render. *The Fastest Way to Host All Your Apps*. Disponível em: [https://render.com/](https://render.com/)
[7] Hostinger. *VPS Hosting*. Disponível em: [https://www.hostinger.com/vps-hosting](https://www.hostinger.com/vps-hosting)

