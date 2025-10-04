import { setupLogoutButton } from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  const currentUser = window.dataManager.getCurrentUser();
  if (!currentUser || currentUser.role !== "gerente") {
    window.location.href = "login.html";
    return;
  }

  loadDashboardData();
  setupNavigation();
  setupLogoutButton();
});

function loadDashboardData() {
  const currentUser = window.dataManager.getCurrentUser();
  const stats = window.dataManager.getStats();
  const ranking = window.dataManager.getRanking();

  updateUserInfo(currentUser);
  updateStats(stats);

  updateEmployeeRanking(ranking);
}

function updateUserInfo(user) {
  const userName = document.querySelector(".user-name");
  const userPosition = document.querySelector(".user-position");

  if (userName) userName.textContent = user.name;
  if (userPosition) userPosition.textContent = user.position;
}

function updateStats(stats) {
  const salesElement = document.querySelector(".stat-item:nth-child(2) h2");
  if (salesElement) {
    salesElement.textContent = `R$ ${stats.totalSales.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  }
  const crossSellElement = document.querySelector(".stat-item:nth-child(3) h2");
  if (crossSellElement) {
    const crossSellValue = Math.floor(stats.totalItems * 0.8);
    crossSellElement.innerHTML = `${crossSellValue.toLocaleString()} <span class="unit">vendidos</span>`;
  }

  const ticketElement = document.querySelector(".stat-item:nth-child(4) h2");
  if (ticketElement && stats.totalItems > 0) {
    const ticketMedio = stats.totalSales / stats.totalItems;
    ticketElement.textContent = `R$ ${ticketMedio.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  }
}

function updateEmployeeRanking(ranking) {
  const employeeList = document.querySelector(".employee-sales-list");
  if (!employeeList) return;

  employeeList.innerHTML = "";

  ranking.slice(0, 4).forEach((employee, index) => {
    const listItem = document.createElement("li");
    listItem.className = "employee-item";

    const salesAmount = Math.random() * 100000 + 50000; // Simula vendas
    const salesPercentage = Math.floor(Math.random() * 30) + 70; // 70-100%

    listItem.innerHTML = `
      <div class="employee-info">
        <span class="initial-circle">${employee.name.charAt(0)}</span>
        <span class="employee-name">${employee.name}</span>
      </div>
      <div class="sales-data">
        <span class="sales-amount">R$ ${salesAmount.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</span>
        <span class="sales-percentage">${salesPercentage}%</span>
      </div>
    `;

    employeeList.appendChild(listItem);
  });
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      this.parentElement.classList.add("active");

      const linkText = this.querySelector("span").textContent;
      navigateToPage(linkText);
    });
  });
}

function navigateToPage(pageName) {
  switch (pageName) {
    case "Painel Gerente":
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
      window.location.href = "gestao-vendas.html";
      break;
  }
}
