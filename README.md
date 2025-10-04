# Swift - Sistema de Gamificação para Gestão de Vendas

## 📋 Visão Geral

O Swift é um sistema de gamificação desenvolvido para motivar equipes de vendas através de missões, disputas e rankings. O sistema foi desenvolvido como parte de um desafio da FIAP e implementa persistência de dados usando LocalStorage do navegador.

## 🚀 Funcionalidades

### Sistema de Autenticação
- **Login com perfis**: Gerente e Vendedor
- **Contas pré-cadastradas** para teste
- **Validação de perfil** no login
- **Sistema de logout** com confirmação

### Para Vendedores
- **Dashboard de Missões**: Visualizar missões atribuídas
- **Sistema de Progresso**: Atualizar progresso das missões
- **Sistema de Pontos**: Acumular pontos por missões concluídas
- **Animações**: Barras de progresso animadas

### Para Gerentes
- **Dashboard Gerencial**: Métricas de performance da equipe
- **Gestão de Missões**: Criar e atribuir missões
- **Sistema de Disputas**: Criar competições entre lojas
- **Gestão de Vendas**: Acompanhar vendas em tempo real
- **Ranking Regional**: Performance das lojas

## 🔐 Contas para Teste

### Gerente
- **Email**: gerente@swift.com
- **Senha**: 123456

### Vendedores
- **Email**: vendedor@swift.com
- **Senha**: 123456

- **Email**: maria@swift.com
- **Senha**: 123456

## 💾 Persistência de Dados

O sistema utiliza **LocalStorage** para persistir dados localmente:

### Dados Armazenados
- **Usuários**: Contas de login e perfis
- **Missões**: Criação, atribuição e progresso
- **Disputas**: Competições entre lojas
- **Vendas**: Histórico de vendas e estatísticas
- **Sessão**: Usuário logado atualmente

### Funcionalidades de Persistência
- ✅ **Login/Logout** com sessão persistente
- ✅ **Missões** com progresso salvo
- ✅ **Disputas** criadas e gerenciadas
- ✅ **Vendas** com histórico completo
- ✅ **Estatísticas** calculadas dinamicamente

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização e responsividade
- **JavaScript Vanilla**: Funcionalidades e interações
- **LocalStorage**: Persistência de dados
- **Font Awesome**: Ícones
- **SVG**: Gráficos interativos

## 📁 Estrutura do Projeto

```
├── public/                 # Páginas HTML
│   ├── login.html         # Página de login
│   ├── mission.html       # Dashboard de missões
│   ├── gerente-dashboard.html
│   ├── gerente-disputa.html
│   ├── gerente-missao.html
│   ├── gestao-vendas.html
│   └── ranking-regional.html
├── src/
│   ├── css/              # Estilos
│   │   ├── login.css
│   │   ├── main.css
│   │   └── [outros estilos]
│   └── js/               # JavaScript
│       ├── data-manager.js    # Sistema de persistência
│       └── components/        # Scripts das páginas
└── README.md
```

## 🎯 Como Usar

1. **Acesse** `public/login.html`
2. **Selecione** o perfil (Vendedor ou Gerente)
3. **Digite** as credenciais de teste
4. **Navegue** pelas funcionalidades do sistema
5. **Teste** a persistência recarregando a página

## 🔄 Fluxo de Dados

1. **Login** → Validação → Redirecionamento baseado no perfil
2. **Missões** → Carregamento dinâmico → Atualização de progresso
3. **Disputas** → Criação → Gerenciamento → Histórico
4. **Vendas** → Registro → Estatísticas → Gráficos

## ✨ Recursos Implementados

- 🔐 **Sistema de autenticação** completo
- 💾 **Persistência de dados** com LocalStorage
- 🎮 **Gamificação** com missões e pontos
- 📊 **Dashboard** com métricas em tempo real
- 🏆 **Sistema de disputas** entre lojas
- 📈 **Gráficos interativos** SVG
- 🎨 **Interface responsiva** e moderna
- 🔄 **Navegação** entre páginas
- 📱 **Design mobile-friendly**

## 🚀 Melhorias Futuras

- [ ] Sistema de notificações em tempo real
- [ ] Gráficos mais avançados
- [ ] Exportação de relatórios
- [ ] Sistema de metas personalizadas
- [ ] Integração com APIs externas

---

**Desenvolvido para o Desafio FIAP** 🎓

