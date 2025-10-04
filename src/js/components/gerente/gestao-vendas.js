import { setupLogoutButton } from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  const currentUser = window.dataManager.getCurrentUser();
  if (!currentUser || currentUser.role !== "gerente") {
    window.location.href = "login.html";
    return;
  }

  loadSalesData();
  setupNavigation();
  setupLogoutButton();
});

function loadSalesData() {
  const sales = window.dataManager.getSales();
  const stats = window.dataManager.getStats();

  // Atualiza estatísticas
  updateSalesStats(stats);

  // Carrega vendas recentes
  loadRecentSales(sales);

  // Cria gráfico de categorias
  createCategoryChart(sales);
}

function updateSalesStats(stats) {
  // Atualiza vendas totais
  const salesCard = document.querySelector(".stat-card:nth-child(1) h2");
  if (salesCard) {
    salesCard.textContent = `R$ ${stats.totalSales.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  }

  const salesItems = document.querySelector(".stat-card:nth-child(1) p");
  if (salesItems) {
    salesItems.textContent = `${stats.totalItems} itens`;
  }

  // Atualiza cross-sell
  const crossSellCard = document.querySelector(".stat-card:nth-child(2) h2");
  if (crossSellCard) {
    const crossSellValue = Math.floor(stats.totalItems * 0.8);
    crossSellCard.innerHTML = `${crossSellValue.toLocaleString()} <span class="unit">vendidos</span>`;
  }

  // Atualiza ticket médio
  const ticketCard = document.querySelector(".stat-card:nth-child(3) h2");
  if (ticketCard && stats.totalItems > 0) {
    const ticketMedio = stats.totalSales / stats.totalItems;
    ticketCard.textContent = `R$ ${ticketMedio.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  }
}

function loadRecentSales(sales) {
  const salesList = document.querySelector(".sales-list");
  if (!salesList) return;

  salesList.innerHTML = "";

  // Pega as 4 vendas mais recentes
  sales.slice(0, 4).forEach((sale) => {
    const listItem = document.createElement("li");
    listItem.className = "sale-item";

    listItem.innerHTML = `
      <div class="sale-info">
        <span class="product-name">${sale.product}</span>
        <span class="time-ago">${sale.timeAgo}</span>
      </div>
      <div class="sale-details">
        <span class="price">R$ ${sale.price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</span>
        <span class="status-ready"><i class="fas fa-check"></i> ${
          sale.status
        }</span>
      </div>
    `;

    salesList.appendChild(listItem);
  });
}

function createCategoryChart(sales) {
  // Agrupa vendas por categoria
  const categoryGroups = {};
  sales.forEach((sale) => {
    const category = sale.category || "Outros";
    if (!categoryGroups[category]) {
      categoryGroups[category] = { count: 0, total: 0 };
    }
    categoryGroups[category].count++;
    categoryGroups[category].total += sale.price;
  });

  // Converte para formato do gráfico
  const categoryData = Object.entries(categoryGroups).map(
    ([label, data], index) => ({
      label,
      value: Math.round((data.count / sales.length) * 100),
      color: ["#8e44ad", "#1abc9c", "#27ae60", "#f39c12", "#e74c3c"][index % 5],
    })
  );

  createDoughnutChart(categoryData);
  createLegend(categoryData);
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active de todos os itens
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Adiciona active ao item clicado
      this.parentElement.classList.add("active");

      // Navegação baseada no link
      const linkText = this.querySelector("span").textContent;
      navigateToPage(linkText);
    });
  });
}

function navigateToPage(pageName) {
  switch (pageName) {
    case "Painel Gerente":
      window.location.href = "gerente-dashboard.html";
      break;
    case "Ranking Regional":
      window.location.href = "ranking-regional.html";
      break;
    case "Disputas":
      window.location.href = "gerente-disputa.html";
      break;
    case "Gestão de Missões":
      window.location.href = "gerente-missao.html";
      break;
    case "Gestão de Vendas":
      // Já está na página
      break;
  }
}

function createDoughnutChart(data) {
  const svg = document.getElementById("categoryChart");
  if (!svg) return;

  const strokeWidth = 15;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedValue = 0;

  data.forEach((item) => {
    const arc = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    const dashLength = (item.value / 100) * circumference;
    const offset = (accumulatedValue / 100) * circumference;

    arc.setAttribute("cx", "50");
    arc.setAttribute("cy", "50");
    arc.setAttribute("r", radius);
    arc.setAttribute("fill", "none");
    arc.setAttribute("stroke", item.color);
    arc.setAttribute("stroke-width", strokeWidth);
    arc.setAttribute("stroke-dasharray", `${dashLength} ${circumference}`);
    // O -25 é para rotacionar o início do gráfico para o topo
    arc.setAttribute(
      "transform",
      `rotate(${(offset / circumference) * 360 - 90} 50 50)`
    );

    svg.appendChild(arc);
    accumulatedValue += item.value;
  });
}

function createLegend(data) {
  const legendList = document.querySelector(".legend-list");
  if (!legendList) return;

  data.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("legend-item");

    const dot = document.createElement("span");
    dot.classList.add("legend-dot");
    dot.style.backgroundColor = item.color;

    const label = document.createElement("span");
    label.classList.add("legend-label");
    label.textContent = item.label;

    const percentage = document.createElement("span");
    percentage.classList.add("legend-percentage");
    percentage.textContent = `${item.value}%`;

    li.appendChild(dot);
    li.appendChild(label);
    li.appendChild(percentage);
    legendList.appendChild(li);
  });
}
