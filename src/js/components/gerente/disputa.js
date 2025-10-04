document.addEventListener('DOMContentLoaded', () => {
  // Verifica se o usuário está logado
  const currentUser = window.dataManager.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  loadDisputeData();
  setupNavigation();
  setupLogoutButton();
  setupBreadcrumbs();
  animateCharts();
});

function loadDisputeData() {
  const currentUser = window.dataManager.getCurrentUser();
  const disputes = window.dataManager.getDisputes();
  
  // Carrega dados da disputa atual (simulado)
  updateDisputeComparison();
  updateSalesBreakdown();
}

function updateDisputeComparison() {
  // Simula dados de comparação entre lojas
  const myStoreData = {
    sales: 1150000,
    growth: 23.3,
    weeklyData: [130, 160, 150, 100, 200, 240, 170]
  };
  
  const competitorData = {
    sales: 1350000,
    growth: 67.7,
    weeklyData: [130, 160, 150, 100, 200, 240, 170]
  };
  
  // Atualiza estatísticas da minha loja
  const myStoreStats = document.querySelector('.my-store .store-stats');
  if (myStoreStats) {
    const salesValue = myStoreStats.querySelector('.stat:first-child .value');
    const growthValue = myStoreStats.querySelector('.stat:last-child .value');
    
    if (salesValue) salesValue.textContent = `R$ ${myStoreData.sales.toLocaleString('pt-BR')}`;
    if (growthValue) growthValue.textContent = `+${myStoreData.growth}%`;
  }
  
  // Atualiza estatísticas da loja concorrente
  const competitorStats = document.querySelector('.competitor-store .store-stats');
  if (competitorStats) {
    const salesValue = competitorStats.querySelector('.stat:first-child .value');
    const growthValue = competitorStats.querySelector('.stat:last-child .value');
    
    if (salesValue) salesValue.textContent = `R$ ${competitorData.sales.toLocaleString('pt-BR')}`;
    if (growthValue) growthValue.textContent = `+${competitorData.growth}%`;
  }
}

function updateSalesBreakdown() {
  // Dados simulados de vendas por categoria
  const categoryData = [
    { name: 'Frangos', percentage: 45, color: '#e64c3c' },
    { name: 'Bovinos', percentage: 15, color: '#E91E63' },
    { name: 'Legumes', percentage: 30, color: '#27ae60' },
    { name: 'Suínos', percentage: 5, color: '#9b59b6' },
    { name: 'Tempero', percentage: 5, color: '#f39c12' }
  ];
  
  // Atualiza a legenda
  const legend = document.querySelector('.legend');
  if (legend) {
    legend.innerHTML = '';
    
    categoryData.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <span class="legend-color" style="background-color: ${item.color};"></span>
        <span class="legend-label">${item.name}</span>
        <span class="legend-percentage">${item.percentage}%</span>
      `;
      legend.appendChild(legendItem);
    });
  }
}

function animateCharts() {
  // Anima as barras do gráfico
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    const height = bar.style.height;
    bar.style.height = '0%';
    
    setTimeout(() => {
      bar.style.height = height;
    }, index * 100 + 500);
  });
  
  // Anima o gráfico de pizza
  const pieChart = document.querySelector('.pie-chart');
  if (pieChart) {
    pieChart.style.opacity = '0';
    pieChart.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      pieChart.style.transition = 'all 0.8s ease';
      pieChart.style.opacity = '1';
      pieChart.style.transform = 'scale(1)';
    }, 1000);
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active de todos os itens
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Adiciona active ao item clicado
      this.parentElement.classList.add('active');
      
      // Navegação baseada no link
      const linkText = this.querySelector('span').textContent;
      navigateToPage(linkText);
    });
  });
}

function navigateToPage(pageName) {
  switch(pageName) {
    case 'Início':
      window.location.href = 'mission.html';
      break;
    case 'Metas':
      window.location.href = 'mission.html#metas';
      break;
    case 'Missões':
      window.location.href = 'mission.html';
      break;
    case 'Disputa':
      // Já está na página
      break;
    case 'Painel Gerente':
      window.location.href = 'gerente-dashboard.html';
      break;
    case 'Ranking Regional':
      window.location.href = 'ranking-regional.html';
      break;
    case 'Disputas':
      window.location.href = 'gerente-disputa.html';
      break;
    case 'Gestão de Missões':
      window.location.href = 'gerente-missao.html';
      break;
    case 'Gestão de Vendas':
      window.location.href = 'gestao-vendas.html';
      break;
  }
}

function setupLogoutButton() {
  // Adiciona botão de logout na sidebar
  const sidebarFooter = document.querySelector('.sidebar-footer');
  if (sidebarFooter) {
    const logoutButton = document.createElement('a');
    logoutButton.href = '#';
    logoutButton.className = 'settings-link';
    logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i><span>Sair</span>';
    
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Tem certeza que deseja sair?')) {
        window.dataManager.logout();
      }
    });
    
    sidebarFooter.appendChild(logoutButton);
  }
}

function setupBreadcrumbs() {
  // Adiciona breadcrumbs se o sistema de navegação estiver disponível
  if (window.navigationManager) {
    window.navigationManager.addBreadcrumbsToPage();
  }
}

// Adiciona interatividade aos gráficos
document.addEventListener('DOMContentLoaded', () => {
  // Hover effects para as barras
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => {
    bar.addEventListener('mouseenter', function() {
      this.style.transform = 'scaleY(1.1)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    
    bar.addEventListener('mouseleave', function() {
      this.style.transform = 'scaleY(1)';
      this.style.boxShadow = 'none';
    });
  });
  
  // Hover effects para as lojas
  const storeCards = document.querySelectorAll('.store-card');
  storeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

