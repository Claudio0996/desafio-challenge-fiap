import { setupLogoutButton } from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  const currentUser = window.dataManager.getCurrentUser();
  if (!currentUser || currentUser.role !== "gerente") {
    window.location.href = "login.html";
    return;
  }

  loadDisputesData();
  setupDisputeForm();
  setupNavigation();
  setupLogoutButton();
});

function loadDisputesData() {
  const disputes = window.dataManager.getDisputes();

  // Carrega disputas em andamento
  loadOngoingDisputes(disputes.filter((d) => d.status === "em_andamento"));

  // Carrega disputas finalizadas
  loadFinishedDisputes(disputes.filter((d) => d.status === "finalizada"));
}

function loadOngoingDisputes(disputes) {
  const disputesList = document.querySelector(".dispute-list");
  if (!disputesList) return;

  disputesList.innerHTML = "";

  disputes.forEach((dispute) => {
    const listItem = document.createElement("li");
    listItem.className = "dispute-item";
    listItem.dataset.disputeId = dispute.id;

    listItem.innerHTML = `
      <div class="dispute-info">
        <span class="store-name green">${dispute.store1}</span>
        <span class="vs">vs</span>
        <span class="store-name red">${dispute.store2}</span>
        <span class="date-range">${formatDate(
          dispute.startDate
        )} - ${formatDate(dispute.endDate)}</span>
      </div>
      <div class="dispute-actions">
        <span class="score">R$ ${dispute.score1.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</span>
        <button class="close-btn" onclick="closeDispute(${
          dispute.id
        })">&times;</button>
      </div>
    `;

    disputesList.appendChild(listItem);
  });
}

function loadFinishedDisputes(disputes) {
  const finishedList = document.querySelector(".dispute-list-finished");
  if (!finishedList) return;

  finishedList.innerHTML = "";

  disputes.forEach((dispute) => {
    const listItem = document.createElement("li");
    listItem.className = "dispute-item-finished";

    listItem.innerHTML = `
      <div class="dispute-teams">
        <span class="team-name">${dispute.store1}</span>
        <span class="vs-light">vs ${dispute.store2}</span>
        <span class="winner">${dispute.winner || "Finalizada"}</span>
      </div>
      <div class="dispute-status">
        <span class="date">${formatDate(
          dispute.completedAt || dispute.endDate
        )}</span>
        <span class="status-tag status-${
          dispute.status === "finalizada" ? "closed" : "open"
        }">${dispute.status === "finalizada" ? "Fechada" : "Aberta"}</span>
      </div>
    `;

    finishedList.appendChild(listItem);
  });
}

function setupDisputeForm() {
  const form = document.querySelector(".dispute-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const storeSelect = document.getElementById("store-select");
    const typeSelect = document.getElementById("type-select");

    if (storeSelect.value === "Escolha uma loja" || !typeSelect.value) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Cria nova disputa
    const disputeData = {
      store1: storeSelect.value,
      store2: "Loja Concorrente", // Simulado
      type: typeSelect.value,
      score1: 0,
      score2: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    };

    const newDispute = window.dataManager.createDispute(disputeData);

    if (newDispute) {
      alert("Disputa criada com sucesso!");
      loadDisputesData(); // Recarrega os dados
      form.reset();
    }
  });
}

function closeDispute(disputeId) {
  if (confirm("Tem certeza que deseja fechar esta disputa?")) {
    // Implementar lógica para fechar disputa
    alert("Disputa fechada com sucesso!");
    loadDisputesData(); // Recarrega os dados
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
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
      // Já está na página
      break;
    case "Gestão de Missões":
      window.location.href = "gerente-missao.html";
      break;
    case "Gestão de Vendas":
      window.location.href = "gestao-vendas.html";
      break;
  }
}
