import {
  setupNavigation,
  setupHeaderButtons,
  showNotification,
  setupTooltips,
  showTooltip,
  hideTooltip,
  createParticleEffect,
  animateValueChange,
} from "../../tests/util/shared-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupHeaderButtons();
  setupTooltips();
  setupLogoutButton();

  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainContent = document.querySelector(".main-content");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      mainContent.classList.toggle("sidebar-collapsed");
      sidebarOverlay.classList.toggle("active");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      mainContent.classList.remove("sidebar-collapsed");
      sidebarOverlay.classList.remove("active");
    });
  }

  const metricCards = document.querySelectorAll(".metric-card");
  metricCards.forEach((card) => {
    const tooltipTitle = card.dataset.tooltipTitle;
    const tooltipContent = card.dataset.tooltipContent;

    card.addEventListener("mouseenter", (e) => {
      if (tooltipTitle && tooltipContent) {
        showTooltip(e, `<h3>${tooltipTitle}</h3><p>${tooltipContent}</p>`);
      }
    });
    card.addEventListener("mousemove", (e) => {
      if (tooltipTitle && tooltipContent) {
        showTooltip(e, `<h3>${tooltipTitle}</h3><p>${tooltipContent}</p>`);
      }
    });
    card.addEventListener("mouseleave", hideTooltip);

    card.addEventListener("click", (e) => {
      createParticleEffect(e.currentTarget, "info");
      showNotification(`Card ${tooltipTitle} clicado!`, "info");
    });
  });

  const employeeCards = document.querySelectorAll(".employee-card");
  employeeCards.forEach((card) => {
    const employeeName = card.querySelector(".employee-name").textContent;
    const salesValueElement = card.querySelector(".sales-value");
    const salesPercentageElement = card.querySelector(".sales-percentage");
    const progressFill = card.querySelector(".employee-progress-fill");

    const initialSalesValue = parseFloat(
      salesValueElement.textContent
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    );
    const initialSalesPercentage = parseFloat(
      salesPercentageElement.textContent.replace("%", "")
    );

    animateValueChange(
      salesValueElement,
      0,
      initialSalesValue,
      (value) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
    );
    animateValueChange(
      salesPercentageElement,
      0,
      initialSalesPercentage,
      (value) => `${Math.round(value)}%`
    );

    progressFill.style.width = `${initialSalesPercentage}%`;

    card.addEventListener("click", (e) => {
      createParticleEffect(e.currentTarget, "primary");
      showNotification(`Detalhes de ${employeeName} carregados.`, "info");
    });
  });

  const actionCards = document.querySelectorAll(".action-card");
  actionCards.forEach((card) => {
    const actionTitle = card.querySelector("h3").textContent;
    card.addEventListener("click", (e) => {
      createParticleEffect(e.currentTarget, "gold");
      showNotification(`Ação '${actionTitle}' ativada.`, "success");
    });
  });

  const npsValueElement = document.querySelector(".nps-card .metric-value");
  if (npsValueElement) {
    const initialNPS = parseFloat(npsValueElement.textContent);
    animateValueChange(npsValueElement, 0, initialNPS, (value) =>
      Math.round(value)
    );
  }

  const totalSalesValueElement = document.querySelector(
    ".sales-card .metric-value"
  );
  if (totalSalesValueElement) {
    const initialTotalSales = parseFloat(
      totalSalesValueElement.textContent
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    );
    animateValueChange(
      totalSalesValueElement,
      0,
      initialTotalSales,
      (value) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
    );
  }

  const crosssellValueElement = document.querySelector(
    ".crosssell-card .metric-value"
  );
  if (crosssellValueElement) {
    const initialCrosssell = parseFloat(
      crosssellValueElement.textContent.split(" ")[0]
    );
    animateValueChange(
      crosssellValueElement,
      0,
      initialCrosssell,
      (value) => `${Math.round(value)} <small>vendidos</small>`
    );
  }

  const ticketValueElement = document.querySelector(
    ".ticket-card .metric-value"
  );
  if (ticketValueElement) {
    const initialTicket = parseFloat(
      ticketValueElement.textContent.replace("R$", "").replace(",", ".")
    );
    animateValueChange(
      ticketValueElement,
      0,
      initialTicket,
      (value) =>
        `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
    );
  }
});
