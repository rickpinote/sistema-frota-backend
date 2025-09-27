# Análise de Requisitos e Planejamento da Arquitetura

## Contexto do Projeto

O objetivo é desenvolver um sistema web completo para controle de frota veicular para a Secretaria de Saúde de Irecê-BA. O sistema deve aprimorar a solução existente, adicionando funcionalidades avançadas e módulos novos.

## Requisitos Técnicos

*   **Arquitetura:** MVC (Model-View-Controller)
*   **Acesso:** Online e responsivo
*   **Banco de Dados:** Relacional
*   **Integrações:** API REST
*   **Interface:** Moderna e intuitiva

## Funcionalidades Principais

### Módulo de Combustível

*   Registro de abastecimentos (data, valor, litros, posto)
*   Cálculo automático de consumo (km/l)
*   Relatórios de custo por veículo/período
*   Alertas de consumo fora da média
*   Controle de tanque cheio/parcial

### Dashboard Avançado

*   Mapas interativos com localização dos veículos
*   Gráficos em tempo real de utilização
*   Métricas de custo operacional por km
*   Alertas inteligentes de manutenção
*   KPIs de eficiência da frota

### Rastreamento GPS

*   Integração com dispositivos GPS ou app mobile
*   Visualização em tempo real no mapa
*   Histórico de rotas e trajetos
*   Relatórios de tempo de utilização
*   Geofencing com áreas permitidas

### Módulos Existentes (Evolução)

*   Controle de veículos (dados completos)
*   Gestão de motoristas
*   Registros de utilização
*   Controle de manutenções
*   Relatórios personalizados
*   Backup e restauração

### Novos Módulos

*   Controle de documentação (seguros, licenciamento)
*   Gestão de multas e infrações
*   Ordens de serviço para manutenção
*   App mobile para motoristas
*   Notificações push e por email

## Tecnologias Sugeridas

### Backend

*   **Framework:** Node.js + Express.js ou PHP Laravel
*   **Banco de Dados:** PostgreSQL ou MySQL
*   **Autenticação:** JWT
*   **API:** RESTful

### Frontend

*   **Framework:** React.js ou Vue.js
*   **CSS Framework:** Bootstrap ou Tailwind CSS
*   **Gráficos:** Chart.js
*   **Mapas:** Leaflet ou Google Maps

### Integrações

*   API Google Maps ou OpenStreetMap
*   Serviços de SMS/Email para notificações
*   APIs de consulta de multas (quando disponível)

## Entregáveis Esperados

1.  **Plano de Desenvolvimento:** Diagrama de arquitetura MVC, modelagem do banco de dados, cronograma de implementação.
2.  **Protótipo:** Wireframes das principais telas, diagrama de navegação, design system básico.
3.  **Documentação:** Especificação técnica, manual de instalação, guia do usuário.

## Premissas

*   Escalabilidade
*   Código bem documentado
*   Interface responsiva
*   Segurança de dados
*   Fácil manutenção

## Diferenciais Desejados

*   Relatórios exportáveis em PDF/Excel
*   Sistema de notificações inteligentes
*   Análise preditiva para manutenções
*   Controle de custos detalhado
*   Multi-tenancy (se necessário)

## Escolha de Tecnologias (Proposta Inicial)

Considerando os requisitos e as sugestões, propõe-se a seguinte pilha tecnológica para o desenvolvimento:

*   **Backend:** Node.js com Express.js (pela flexibilidade e ecossistema JavaScript, que pode ser compartilhado com o frontend).
*   **Banco de Dados:** PostgreSQL (pela robustez, escalabilidade e suporte a funcionalidades avançadas).
*   **Frontend:** React.js (pela popularidade, grande comunidade e capacidade de construir SPAs complexas e responsivas).
*   **CSS Framework:** Tailwind CSS (pela flexibilidade e otimização do desenvolvimento de interfaces personalizadas).
*   **Gráficos:** Chart.js (já sugerido e amplamente utilizado).
*   **Mapas:** Google Maps API (pela riqueza de recursos e precisão, embora OpenStreetMap seja uma alternativa viável se houver restrições de custo).
*   **Autenticação:** JWT (conforme sugerido).
*   **Integrações:** Serviços de SMS/Email (a serem definidos conforme provedor) e APIs de multas (a serem pesquisadas).



## Diagrama de Arquitetura MVC

```mermaid




graph TD
    A[Usuário] --> B(Frontend: React.js/Tailwind CSS)
    B --> C{API REST: Node.js/Express.js}
    C --> D[Controller]
    D --> E[Service Layer]
    E --> F[Model: ORM/PostgreSQL]
    F --> G[Banco de Dados: PostgreSQL]
    G --> F
    F --> E
    E --> D
    D --> C
    C --> B

    subgraph Backend
        D
        E
        F
        G
    end

    subgraph Frontend
        B
    end

    subgraph Integrações
        H[API Google Maps] --> C
        I[Serviços de Notificação SMS_Email] --> C
        J[APIs de Multas] --> C
        K[Dispositivos GPS_App_Mobile] --> C
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#ccf,stroke:#333,stroke-width:2px
    style D fill:#cfc,stroke:#333,stroke-width:2px
    style E fill:#ffc,stroke:#333,stroke-width:2px
    style F fill:#fcf,stroke:#333,stroke-width:2px
    style G fill:#ccc,stroke:#333,stroke-width:2px
    style H fill:#fcc,stroke:#333,stroke-width:2px
    style I fill:#fcc,stroke:#333,stroke-width:2px
    style J fill:#fcc,stroke:#333,stroke-width:2px
    style K fill:#fcc,stroke:#333,stroke-width:2px
```

![Diagrama de Arquitetura MVC](https://private-us-east-1.manuscdn.com/sessionFile/Zk3YH397ykNnlH9Rux8UP7/sandbox/LirSlZuZAb0lal6XSQMnUd-images_1758858106201_na1fn_L2hvbWUvdWJ1bnR1L2FycXVpdGV0dXJhX212Yw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWmszWUgzOTd5a05ubEg5UnV4OFVQNy9zYW5kYm94L0xpclNsWnVaQWIwbGFsNlhTUU1uVWQtaW1hZ2VzXzE3NTg4NTgxMDYyMDFfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyRnljWFZwZEdWMGRYSmhYMjEyWXcucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Aj6Fe8lKVlgJxYf1p-Gb9E3psFbkbrF2wKbN3x9of0ZvAGc023E2cfcm5FFdA0Kb14qs1TD~IyA1veJ5o6Dkz506ALHQw8rzY3N0cEBu3uBNP2TXt~MMVrRMjlEv3c13C3rDogVm2prlV9lfFOyCrHv93SFWgYHtuTqN9AIfImXah1AFrAQTh-qf2lquETh5IFiPH1qRTCiPpqtdLL2ZV5bgH2MLBtpCTQRnHsrNZ7X7ERqtMuTqR75JteVHKXZSZNbjFEsnAkoldcZKvFkLQK7yfm~1kjRUdjxcrvozsggOY1grOnHzUjH08~PALyzpCSw-vhTNh01l4tdihIVOvw__)

