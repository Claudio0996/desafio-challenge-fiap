import {
  setupNavigation,
  setupHeaderButtons,
  showNotification,
  setupLogoutButton,
} from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", function () {
  initCharts();
  setupNavigation();
  setupLogoutButton();
  setupHeaderButtons();
  setupCardHovers();
  setupTooltips();
  setupActionButtons();
  setupEntryAnimations();
});

function initCharts() {
  initMyStoreChart();
  initCompetitorChart();
  initCategoryChart();
}

function initMyStoreChart() {
  const ctx = document.getElementById("myStoreChart").getContext("2d");

  const chartData = {
    labels: ["05/06", "11/06", "05/06", "11/06", "24/06", "15/06", "16/06"],
    datasets: [
      {
        label: "Performance",
        data: [35, 42, 38, 28, 55, 65, 45],
        backgroundColor: "#dc2626",
        borderColor: "#dc2626",
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#888",
          font: {
            size: 10,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
}

function initCompetitorChart() {
  const ctx = document.getElementById("competitorChart").getContext("2d");

  const chartData = {
    labels: ["05/06", "11/06", "05/06", "11/06", "24/06", "15/06", "16/06"],
    datasets: [
      {
        label: "Performance",
        data: [45, 35, 55, 48, 32, 58, 52],
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#888",
          font: {
            size: 10,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
    animation: {
      duration: 2000,
      delay: 500,
      easing: "easeOutQuart",
    },
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
}

// Gráfico de Categorias (Donut)
function initCategoryChart() {
  const ctx = document.getElementById("categoryChart").getContext("2d");

  const chartData = {
    labels: ["Frangos", "Bovinos", "Legumes", "Suínos", "Tempero"],
    datasets: [
      {
        data: [45, 15, 35, 10, 5],
        backgroundColor: [
          "#dc2626",
          "#b91c1c",
          "#16a34a",
          "#7c3aed",
          "#f59e0b",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      duration: 2000,
      delay: 1000,
      easing: "easeOutQuart",
    },
    onHover: (event, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        const label = chartData.labels[index];
        const value = chartData.datasets[0].data[index];
        showTooltip(event, `${label}: ${value}%`);
      } else {
        hideTooltip();
      }
    },
  };

  new Chart(ctx, {
    type: "doughnut",
    data: chartData,
    options: chartOptions,
  });
}
function setupCardHovers() {
  const performanceCards = document.querySelectorAll(".performance-card");
  const legendItems = document.querySelectorAll(".legend-item");

  performanceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      createParticleEffect(this);
    });

    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      const percentage = this.querySelector(".performance-value").textContent;
      showNotification(`${title}: ${percentage} de performance`);
    });
  });
  legendItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.querySelector(".legend-name").textContent;
      const percentage = this.querySelector(".legend-percentage").textContent;
      showNotification(`${category}: ${percentage} das vendas`);

      highlightCategory(this.dataset.category);
    });
  });
}

function setupTooltips() {
  const tooltip = document.getElementById("tooltip");

  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((button) => {
    button.addEventListener("mouseenter", function (e) {
      const title = this.getAttribute("title");
      if (title) {
        showTooltip(e, title);
      }
    });

    button.addEventListener("mouseleave", function () {
      hideTooltip();
    });
  });
}
function setupActionButtons() {
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");

      if (icon.classList.contains("fa-sync-alt")) {
        this.style.animation = "spin 1s linear";
        setTimeout(() => {
          this.style.animation = "";
          showNotification("Dados atualizados com sucesso!");
          updateChartData();
        }, 1000);
      } else if (icon.classList.contains("fa-download")) {
        showNotification("Exportando dados...");
        setTimeout(() => {
          showNotification("Download concluído!");
        }, 2000);
      }
    });
  });
}

function setupEntryAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    ".performance-card, .vs-comparison, .category-sales-card"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  tooltip.textContent = text;
  tooltip.style.left = event.pageX + 10 + "px";
  tooltip.style.top = event.pageY - 30 + "px";
  tooltip.classList.add("show");
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.remove("show");
}

function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const particles = 8;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background-color: #dc2626;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.8;
        `;

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    particle.style.left = startX + "px";
    particle.style.top = startY + "px";

    document.body.appendChild(particle);

    // Animar partícula
    const angle = (Math.PI * 2 * i) / particles;
    const distance = 30 + Math.random() * 20;
    const duration = 800 + Math.random() * 400;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 0.8,
        },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "ease-out",
      }
    ).onfinish = () => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    };
  }
}

// Função para destacar categoria
function highlightCategory(category) {
  const legendItems = document.querySelectorAll(".legend-item");

  legendItems.forEach((item) => {
    if (item.dataset.category === category) {
      item.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
      item.style.transform = "translateX(8px) scale(1.02)";
    } else {
      item.style.backgroundColor = "";
      item.style.transform = "";
    }
  });

  // Remover destaque após 2 segundos
  setTimeout(() => {
    legendItems.forEach((item) => {
      item.style.backgroundColor = "";
      item.style.transform = "";
    });
  }, 2000);
}

// Função para atualizar dados dos gráficos
function updateChartData() {
  // Simular novos dados
  const newMyStoreData = Array.from(
    { length: 7 },
    () => Math.floor(Math.random() * 70) + 10
  );
  const newCompetitorData = Array.from(
    { length: 7 },
    () => Math.floor(Math.random() * 70) + 10
  );

  // Atualizar percentagens
  const myStorePercentage = Math.floor(Math.random() * 40) + 15;
  const competitorPercentage = Math.floor(Math.random() * 40) + 45;

  document.querySelector(".my-store .performance-value").textContent =
    myStorePercentage + "%";
  document.querySelector(".competitor-store .performance-value").textContent =
    competitorPercentage + "%";

  // Atualizar comparativo VS
  document.querySelector(".vs-left .vs-percentage").textContent =
    myStorePercentage + "%";
  document.querySelector(".vs-right .vs-percentage").textContent =
    competitorPercentage + "%";
}

// Adicionar funcionalidade de teclado
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "1":
        e.preventDefault();
        document.querySelector(".nav-item:nth-child(1) .nav-link").click();
        break;
      case "2":
        e.preventDefault();
        document.querySelector(".nav-item:nth-child(2) .nav-link").click();
        break;
      case "3":
        e.preventDefault();
        document.querySelector(".nav-item:nth-child(3) .nav-link").click();
        break;
      case "4":
        e.preventDefault();
        document.querySelector(".nav-item:nth-child(4) .nav-link").click();
        break;
      case "r":
        e.preventDefault();
        document
          .querySelector(".action-btn .fa-sync-alt")
          .parentElement.click();
        break;
    }
  }
});

// Adicionar CSS para animação de rotação
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Função para simular dados em tempo real
function startRealTimeUpdates() {
  setInterval(() => {
    // Atualizar percentagens gradualmente
    const myStoreElement = document.querySelector(
      ".my-store .performance-value"
    );
    const competitorElement = document.querySelector(
      ".competitor-store .performance-value"
    );

    const currentMyStore = parseFloat(myStoreElement.textContent);
    const currentCompetitor = parseFloat(competitorElement.textContent);

    const newMyStore = Math.max(
      0,
      Math.min(100, currentMyStore + (Math.random() - 0.5) * 2)
    );
    const newCompetitor = Math.max(
      0,
      Math.min(100, currentCompetitor + (Math.random() - 0.5) * 2)
    );

    myStoreElement.textContent = newMyStore.toFixed(1) + "%";
    competitorElement.textContent = newCompetitor.toFixed(1) + "%";

    // Atualizar VS também
    document.querySelector(".vs-left .vs-percentage").textContent =
      newMyStore.toFixed(1) + "%";
    document.querySelector(".vs-right .vs-percentage").textContent =
      newCompetitor.toFixed(1) + "%";
  }, 5000);
}

// Iniciar atualizações em tempo real após 10 segundos
setTimeout(startRealTimeUpdates, 10000);
