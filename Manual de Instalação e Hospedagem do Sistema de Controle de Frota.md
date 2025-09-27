# Manual de Instalação e Hospedagem do Sistema de Controle de Frota

Este manual fornece instruções detalhadas para configurar e executar o Sistema de Controle de Frota em um ambiente de desenvolvimento local e para implantá-lo em um servidor web de produção. Além disso, serão apresentadas sugestões de provedores de hospedagem adequados para a aplicação.

## 1. Execução em Ambiente Local (Desenvolvimento)

Para rodar o sistema em sua máquina local, siga os passos abaixo. Certifique-se de ter os pré-requisitos instalados.

### 1.1. Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados em sua máquina:

*   **Node.js:** Versão 18.x ou superior. Pode ser baixado em [nodejs.org](https://nodejs.org/).
*   **pnpm:** Um gerenciador de pacotes rápido e eficiente para Node.js. Instale-o globalmente com `npm install -g pnpm`.
*   **PostgreSQL:** Servidor de banco de dados. Pode ser baixado em [postgresql.org](https://www.postgresql.org/download/).
*   **Git:** Para clonar o repositório do projeto. Pode ser baixado em [git-scm.com](https://git-scm.com/downloads).

### 1.2. Configuração do Backend (Node.js/Express.js)

1.  **Clonar o Repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_BACKEND>
    cd backend
    ```

2.  **Instalar Dependências:**
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do diretório `backend` com base no `.env.example` fornecido. Preencha as informações do seu banco de dados PostgreSQL e outras variáveis necessárias.

    Exemplo de `.env`:
    ```
    PORT=3000
    NODE_ENV=development
    DATABASE_URL="postgresql://user:password@localhost:5432/fleet_control_db"
    DB_NAME=fleet_control_db
    DB_USER=user
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta_jwt
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Configurar o Banco de Dados:**
    *   Crie o banco de dados `fleet_control_db` (ou o nome que você definiu em `DB_NAME`) no seu servidor PostgreSQL.
    *   Execute as migrações para criar as tabelas:
        ```bash
        npx sequelize-cli db:migrate
        ```
    *   (Opcional) Popule o banco de dados com dados de exemplo:
        ```bash
        npx sequelize-cli db:seed:all
        ```

5.  **Iniciar o Servidor Backend:**
    ```bash
    pnpm run dev
    ```
    O servidor estará acessível em `http://localhost:3000` (ou a porta definida em `PORT`).

### 1.3. Configuração do Frontend (React.js)

1.  **Navegar para o Diretório do Frontend:**
    ```bash
    cd ../frontend # Se você estiver no diretório 'backend'
    # ou
    cd sistema-frota # Se você estiver na raiz do projeto
    ```

2.  **Instalar Dependências:**
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente (se necessário):**
    O frontend pode precisar de variáveis de ambiente para apontar para a API do backend. Crie um arquivo `.env` na raiz do diretório `frontend`.

    Exemplo de `.env` (para Vite):
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Iniciar o Servidor de Desenvolvimento Frontend:**
    ```bash
    pnpm run dev
    ```
    O aplicativo frontend estará acessível em `http://localhost:5173` (ou a porta indicada pelo Vite).

## 2. Implantação em Servidor Web (Produção)

A implantação em um servidor web envolve algumas etapas adicionais para garantir segurança, desempenho e disponibilidade.

### 2.1. Pré-requisitos no Servidor

*   **Sistema Operacional:** Linux (Ubuntu, CentOS, etc.) é o mais comum.
*   **Node.js:** Instalado no servidor.
*   **PostgreSQL:** Servidor de banco de dados instalado e configurado.
*   **Nginx (ou Apache):** Servidor web para atuar como proxy reverso e servir arquivos estáticos do frontend.
*   **PM2 (ou similar):** Gerenciador de processos para manter a aplicação Node.js sempre ativa.
*   **Git:** Para clonar o repositório.

### 2.2. Configuração do Banco de Dados no Servidor

1.  **Instalar PostgreSQL:** Siga as instruções específicas para o seu sistema operacional.
2.  **Criar Banco de Dados e Usuário:**
    ```sql
    CREATE DATABASE fleet_control_db;
    CREATE USER meu_usuario WITH ENCRYPTED PASSWORD 'minha_senha';
    GRANT ALL PRIVILEGES ON DATABASE fleet_control_db TO meu_usuario;
    ```
3.  **Configurar Acesso Remoto (se necessário):** Edite `pg_hba.conf` e `postgresql.conf` para permitir conexões externas, se o backend e o banco de dados estiverem em máquinas diferentes.

### 2.3. Implantação do Backend

1.  **Clonar o Repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_BACKEND> /var/www/fleet-control/backend
    cd /var/www/fleet-control/backend
    ```

2.  **Instalar Dependências:**
    ```bash
    pnpm install --prod # Instala apenas dependências de produção
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie o arquivo `.env` com as variáveis de ambiente para produção. Assegure-se de usar senhas fortes e chaves JWT seguras.

    Exemplo de `.env` para produção:
    ```
    PORT=3000
    NODE_ENV=production
    DATABASE_URL="postgresql://meu_usuario:minha_senha@localhost:5432/fleet_control_db"
    DB_NAME=fleet_control_db
    DB_USER=meu_usuario
    DB_PASSWORD=minha_senha
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta_muito_segura_para_producao
    FRONTEND_URL=https://seu_dominio.com
    ```

4.  **Executar Migrações:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5.  **Gerenciar Processo com PM2:**
    Instale PM2 globalmente: `npm install -g pm2`.
    Inicie a aplicação com PM2:
    ```bash
    pm2 start server.js --name fleet-control-backend
    pm2 save
    pm2 startup
    ```
    Isso garantirá que a aplicação reinicie automaticamente em caso de falha ou reinício do servidor.

### 2.4. Implantação do Frontend

1.  **Clonar o Repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND> /var/www/fleet-control/frontend
    cd /var/www/fleet-control/frontend
    ```

2.  **Instalar Dependências:**
    ```bash
    pnpm install --prod
    ```

3.  **Build da Aplicação:**
    ```bash
    pnpm run build
    ```
    Isso criará uma pasta `dist` (ou `build`) com os arquivos estáticos otimizados para produção.

4.  **Configurar Nginx (Exemplo):**
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
            proxy_pass http://localhost:3000; # Porta do seu backend Node.js
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Opcional: Configuração para HTTPS com Certbot
        # listen 443 ssl;
        # ssl_certificate /etc/letsencrypt/live/seu_dominio.com/fullchain.pem;
        # ssl_certificate_key /etc/letsencrypt/live/seu_dominio.com/privkey.pem;
        # include /etc/letsencrypt/options-ssl-nginx.conf;
        # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    }
    ```

5.  **Ativar a Configuração do Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/seu_dominio.com /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

6.  **Configurar HTTPS (Recomendado):**
    Utilize o Certbot para obter certificados SSL/TLS gratuitos do Let's Encrypt:
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d seu_dominio.com -d www.seu_dominio.com
    ```

## 3. Sugestões de Provedores de Hospedagem

Para hospedar o Sistema de Controle de Frota, é recomendável utilizar provedores que ofereçam flexibilidade para Node.js, PostgreSQL e que permitam a configuração de um servidor web como Nginx. Abaixo estão algumas sugestões:

### 3.1. Provedores de Cloud (IaaS/PaaS)

Estes provedores oferecem maior controle e escalabilidade, sendo ideais para aplicações que podem crescer.

*   **DigitalOcean:** Oferece 

Droplets (VMs) e Managed Databases para PostgreSQL. É conhecido pela sua simplicidade e bom custo-benefício [1].
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

