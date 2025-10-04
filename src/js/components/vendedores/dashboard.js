import {
  animateProgressBars,
  setupNavigation,
  setupHeaderButtons,
  setupLogoutButton,
} from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", function () {
  initChart();
  animateProgressBars();
  setupNavigation();
  setupLogoutButton();
  setupHeaderButtons();
  setupCardHovers();

  animateStatValues();
});
function initChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  const chartData = {
    labels: ["10/06", "11/06", "12/06", "13/06", "14/06", "15/06", "16/06"],
    datasets: [
      {
        label: "Vendas",
        data: [45, 52, 48, 35, 65, 75, 58],
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
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#3a3a3a",
          borderColor: "#3a3a3a",
        },
        ticks: {
          color: "#888",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#888",
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  };

  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
}

function setupCardHovers() {
  const statCards = document.querySelectorAll(".stat-card");
  const leaderboardItems = document.querySelectorAll(".leaderboard-item");
  const missionItems = document.querySelectorAll(".mission-item");

  statCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 8px 25px rgba(220, 38, 38, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
    });

    card.addEventListener("click", function () {
      const title = this.querySelector(".stat-title").textContent;
      showNotification(`Clicou em: ${title}`);
    });
  });

  leaderboardItems.forEach((item) => {
    item.addEventListener("click", function () {
      const playerName = this.querySelector(".player-name").textContent;
      showNotification(`Visualizando perfil de: ${playerName}`);
    });
  });

  missionItems.forEach((item) => {
    item.addEventListener("click", function () {
      const missionName = this.querySelector(".mission-name").textContent;
      showNotification(`Missão selecionada: ${missionName}`);
    });
  });
}

function animateStatValues() {
  const statValues = document.querySelectorAll(".stat-value");

  statValues.forEach((element) => {
    const finalValue = element.textContent;
    const isMonetary = finalValue.includes("R$");
    const numericValue = parseFloat(
      finalValue.replace(/[^\d.,]/g, "").replace(",", ".")
    );

    if (!isNaN(numericValue)) {
      let currentValue = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          currentValue = numericValue;
          clearInterval(timer);
        }

        if (isMonetary) {
          if (numericValue >= 1000) {
            element.textContent = `R$ ${(currentValue / 1000).toFixed(1)}k`;
          } else {
            element.textContent = `R$ ${currentValue
              .toFixed(2)
              .replace(".", ",")}`;
          }
        } else {
          element.textContent =
            Math.floor(currentValue).toLocaleString("pt-BR");
        }
      }, 20);
    }
  });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2a2a2a;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid #3a3a3a;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function updateRealTimeData() {
  const pointsElement = document.querySelector(
    ".stat-card:last-child .stat-value"
  );
  if (pointsElement) {
    const currentPoints = parseInt(
      pointsElement.textContent.replace(/\D/g, "")
    );
    const newPoints = currentPoints + Math.floor(Math.random() * 10);
    pointsElement.textContent = newPoints.toLocaleString("pt-BR");
  }

  const progressBars = document.querySelectorAll(
    ".mission-item .progress-fill"
  );
  progressBars.forEach((bar) => {
    const currentWidth = parseFloat(bar.style.width);
    if (currentWidth < 100) {
      const newWidth = Math.min(100, currentWidth + Math.random() * 2);
      bar.style.width = newWidth + "%";
      const progressText = bar.parentElement.querySelector(".progress-text");
      if (progressText) {
        progressText.textContent = newWidth.toFixed(1) + "%";
      }
    }
  });
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

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
        updateRealTimeData();
        showNotification("Dados atualizados!");
        break;
    }
  }
});

document.querySelectorAll(".show-all").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const section = this.closest(".leaderboard, .missions-today");
    const sectionName = section.classList.contains("leaderboard")
      ? "Leaderboard"
      : "Missões";
    showNotification(`Expandindo ${sectionName}...`);
  });
});

loadSavedTheme();

setInterval(updateRealTimeData, 30000);

function addParticleEffect() {
  const achievementCard = document.querySelector(".achievement-card");
  if (achievementCard) {
    achievementCard.addEventListener("click", function () {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background-color: #ffd700;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;

        const rect = this.getBoundingClientRect();
        particle.style.left = rect.left + rect.width / 2 + "px";
        particle.style.top = rect.top + rect.height / 2 + "px";

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 10;
        const distance = 50 + Math.random() * 50;
        const duration = 1000 + Math.random() * 500;

        particle.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
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
          document.body.removeChild(particle);
        };
      }

      showNotification("🏆 Rei do Frango! Parabéns pela conquista!");
    });
  }
}

setTimeout(addParticleEffect, 1000);
