# 🧭 Sistema de Navegação Swift

## 📋 Visão Geral

O sistema de navegação do Swift oferece múltiplas formas de navegar entre as páginas, proporcionando uma experiência fluida e intuitiva para usuários.

## 🚀 Funcionalidades Implementadas

### 1. **Navegação por Sidebar**
- ✅ **Links clicáveis** em todas as páginas
- ✅ **Indicadores visuais** de página ativa
- ✅ **Animações** suaves ao passar o mouse
- ✅ **Atalhos de teclado** visuais (Ctrl+1, Ctrl+2, etc.)

### 2. **Breadcrumbs**
- ✅ **Navegação hierárquica** clara
- ✅ **Links clicáveis** para voltar
- ✅ **Indicador de página atual**
- ✅ **Animações** de entrada

### 3. **Navegação por Teclado**
- ✅ **Ctrl + 1-5**: Navegação rápida entre páginas
- ✅ **ESC**: Voltar ao dashboard principal
- ✅ **Tab**: Navegação por foco
- ✅ **Enter**: Ativar links

### 4. **Indicadores de Página Ativa**
- ✅ **Destaque visual** da página atual
- ✅ **Barra lateral** indicadora
- ✅ **Sincronização** automática

## 🎯 Como Usar

### **Navegação Básica**
1. **Clique** nos links da sidebar
2. **Use** os breadcrumbs para voltar
3. **Pressione** ESC para voltar ao início

### **Navegação por Teclado**
- **Ctrl + 1**: Primeira página do menu
- **Ctrl + 2**: Segunda página do menu
- **Ctrl + 3**: Terceira página do menu
- **Ctrl + 4**: Quarta página do menu
- **Ctrl + 5**: Quinta página do menu
- **ESC**: Voltar ao dashboard

### **Navegação por Breadcrumbs**
- **Clique** em "Início" para voltar ao dashboard
- **Visualize** a página atual destacada
- **Navegue** hierarquicamente

## 🔧 Estrutura Técnica

### **Arquivos Principais**
```
src/js/navigation.js          # Sistema de navegação global
src/css/navigation.css        # Estilos de navegação
```

### **Integração**
- **Automática** em todas as páginas
- **Verificação** de usuário logado
- **Redirecionamento** para login se necessário

## 📱 Responsividade

### **Desktop**
- **Sidebar fixa** com navegação completa
- **Breadcrumbs** sempre visíveis
- **Atalhos de teclado** funcionais

### **Mobile**
- **Breadcrumbs** adaptados
- **Navegação** otimizada para touch
- **Dicas** de navegação reduzidas

## 🎨 Animações e Efeitos

### **Transições**
- **Slide** suave entre páginas
- **Fade** nos breadcrumbs
- **Hover** effects na sidebar

### **Indicadores**
- **Barra lateral** para página ativa
- **Destaque** visual nos links
- **Animações** de entrada

## 🔐 Segurança

### **Verificação de Acesso**
- ✅ **Usuário logado** obrigatório
- ✅ **Redirecionamento** automático para login
- ✅ **Validação** de perfil (Gerente/Vendedor)

### **Rotas Protegidas**
- **Vendedores**: Acesso apenas às páginas de vendedor
- **Gerentes**: Acesso completo ao sistema
- **Logout**: Limpeza de sessão

## 🚀 Melhorias Futuras

### **Funcionalidades Planejadas**
- [ ] **Histórico** de navegação
- [ ] **Favoritos** de páginas
- [ ] **Busca** rápida de páginas
- [ ] **Navegação** por gestos (mobile)
- [ ] **Páginas** em abas

### **Otimizações**
- [ ] **Lazy loading** de páginas
- [ ] **Cache** de navegação
- [ ] **Preload** de páginas frequentes

## 📊 Estatísticas de Uso

### **Métricas Implementadas**
- **Páginas visitadas** (LocalStorage)
- **Tempo de navegação** por página
- **Atalhos mais usados**

### **Analytics**
- **Eventos** de navegação
- **Padrões** de uso
- **Otimizações** baseadas em dados

## 🛠️ Configuração

### **Personalização**
```javascript
// Configurar rotas personalizadas
window.navigationManager.routes = {
  'vendedor': {
    'Minha Página': 'custom-page.html'
  }
};
```

### **Temas**
```css
/* Personalizar cores de navegação */
.nav-item.active .nav-link {
  background-color: #sua-cor;
}
```

## 📝 Exemplos de Uso

### **Navegação Programática**
```javascript
// Navegar para uma página específica
window.navigationManager.navigateToPage('Gestão de Vendas');

// Adicionar breadcrumbs
window.navigationManager.addBreadcrumbsToPage();
```

### **Eventos Personalizados**
```javascript
// Escutar mudanças de página
document.addEventListener('navigationChange', (e) => {
  console.log('Nova página:', e.detail.page);
});
```

---

**Sistema de Navegação Swift** - Desenvolvido para máxima usabilidade e experiência do usuário! 🚀

