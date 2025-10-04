import {
  setupNavigation,
  setupHeaderButtons,
  showNotification,
  setupLogoutButton,
} from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", function () {
  initProgressBars();
  setupNavigation();
  setupHeaderButtons();
  setupLogoutButton();
  setupGoalCards();
  setupModal();
  setupTooltips();
  setupEntryAnimations();

  setTimeout(startRealTimeUpdates, 5000);
});

function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  progressBars.forEach((bar, index) => {
    const targetProgress = parseInt(bar.dataset.progress);
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = targetProgress + "%";

      animateCounter(
        bar.closest(".goal-card").querySelector(".progress-percentage"),
        0,
        targetProgress,
        1500
      );
    }, index * 300 + 800);
  });
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * easeOutQuart(progress));
    element.textContent = current + "%";

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Função de easing
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Configurar cards de metas
function setupGoalCards() {
  const goalCards = document.querySelectorAll(".goal-card");
  const actionButtons = document.querySelectorAll(".action-btn");

  // Configurar hover e clique nos cards
  goalCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Criar efeito de partículas
      createParticleEffect(this);
    });

    card.addEventListener("click", function (e) {
      // Evitar clique se foi num botão de ação
      if (e.target.closest(".action-btn")) return;

      const goalType = this.dataset.goal;
      const goalTitle = this.querySelector(".goal-title").textContent;
      const currentValue = this.querySelector(".current-value").textContent;
      const progress = this.querySelector(".progress-percentage").textContent;

      showGoalDetails(goalType, goalTitle, currentValue, progress);
    });
  });

  // Configurar botões de ação
  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const icon = this.querySelector("i");
      const goalCard = this.closest(".goal-card");
      const goalTitle = goalCard.querySelector(".goal-title").textContent;

      if (icon.classList.contains("fa-info-circle")) {
        const goalType = goalCard.dataset.goal;
        const currentValue =
          goalCard.querySelector(".current-value").textContent;
        const progress = goalCard.querySelector(
          ".progress-percentage"
        ).textContent;
        showGoalDetails(goalType, goalTitle, currentValue, progress);
      } else if (icon.classList.contains("fa-edit")) {
        showNotification(`Editando meta: ${goalTitle}`);
        // Aqui poderia abrir um modal de edição
      }
    });
  });
}

// Configurar modal
function setupModal() {
  const modal = document.getElementById("goalModal");
  const closeBtn = document.querySelector(".modal-close");

  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Fechar modal ao clicar fora
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar modal com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

// Mostrar detalhes da meta
function showGoalDetails(goalType, title, currentValue, progress) {
  const modal = document.getElementById("goalModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  modalTitle.textContent = `Detalhes - ${title}`;

  const goalData = getGoalData(goalType);

  modalContent.innerHTML = `
        <div class="goal-detail">
            <div class="detail-section">
                <h4>Progresso Atual</h4>
                <div class="detail-value">${currentValue}</div>
                <div class="detail-progress">${progress} concluído</div>
            </div>
            
            <div class="detail-section">
                <h4>Meta</h4>
                <div class="detail-target">${goalData.target}</div>
                <div class="detail-deadline">Prazo: ${goalData.deadline}</div>
            </div>
            
            <div class="detail-section">
                <h4>Histórico</h4>
                <div class="detail-history">
                    ${goalData.history
                      .map(
                        (item) => `
                        <div class="history-item">
                            <span class="history-date">${item.date}</span>
                            <span class="history-value">${item.value}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Próximos Passos</h4>
                <div class="detail-tips">
                    ${goalData.tips
                      .map((tip) => `<div class="tip-item">• ${tip}</div>`)
                      .join("")}
                </div>
            </div>
        </div>
    `;

  modal.style.display = "block";
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById("goalModal");
  modal.style.display = "none";
}

// Obter dados da meta (simulado)
function getGoalData(goalType) {
  const data = {
    monthly: {
      target: "R$ 25.000",
      deadline: "31 de Dezembro",
      history: [
        { date: "01/12", value: "R$ 2.500" },
        { date: "08/12", value: "R$ 6.200" },
        { date: "15/12", value: "R$ 9.800" },
        { date: "22/12", value: "R$ 12.250" },
      ],
      tips: [
        "Foque em produtos de maior margem",
        "Aumente o ticket médio por cliente",
        "Implemente estratégias de upselling",
      ],
    },
    points: {
      target: "5.000 pontos",
      deadline: "31 de Dezembro",
      history: [
        { date: "01/12", value: "320 pts" },
        { date: "08/12", value: "890 pts" },
        { date: "15/12", value: "1.650 pts" },
        { date: "22/12", value: "2.550 pts" },
      ],
      tips: [
        "Complete mais missões diárias",
        "Participe de desafios especiais",
        "Mantenha consistência nas vendas",
      ],
    },
    crosssell: {
      target: "300 vendas",
      deadline: "31 de Dezembro",
      history: [
        { date: "01/12", value: "28 vendas" },
        { date: "08/12", value: "67 vendas" },
        { date: "15/12", value: "145 vendas" },
        { date: "22/12", value: "222 vendas" },
      ],
      tips: [
        "Sugira produtos complementares",
        "Treine técnicas de cross-selling",
        "Use dados de compras anteriores",
      ],
    },
  };

  return data[goalType] || data.monthly;
}

// Configurar tooltips
function setupTooltips() {
  const tooltip = document.getElementById("tooltip");

  // Adicionar tooltips aos botões de ação
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

    button.addEventListener("mousemove", function (e) {
      updateTooltipPosition(e);
    });
  });
}

// Configurar animações de entrada
function setupEntryAnimations() {
  // Observador de interseção para animações
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  // Observar elementos animáveis
  const animatedElements = document.querySelectorAll(
    ".goal-card, .goals-summary"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Função para mostrar tooltip
function showTooltip(event, text) {
  const tooltip = document.getElementById("tooltip");
  tooltip.textContent = text;
  updateTooltipPosition(event);
  tooltip.classList.add("show");
}

function updateTooltipPosition(event) {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.left = event.pageX + 10 + "px";
  tooltip.style.top = event.pageY - 30 + "px";
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.remove("show");
}

function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const particles = 6;
  const isCompleted = element.classList.contains("completed");
  const color = isCompleted ? "#16a34a" : "#dc2626";

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background-color: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.8;
            box-shadow: 0 0 10px ${color};
        `;

    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    particle.style.left = startX + "px";
    particle.style.top = startY + "px";

    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / particles;
    const distance = 40 + Math.random() * 30;
    const duration = 1000 + Math.random() * 500;

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

function updateGoalProgress(goalType, newProgress) {
  const goalCard = document.querySelector(`[data-goal="${goalType}"]`);
  if (!goalCard) return;

  const progressFill = goalCard.querySelector(".progress-fill");
  const progressPercentage = goalCard.querySelector(".progress-percentage");
  const currentValue = goalCard.querySelector(".current-value");

  progressFill.style.width = newProgress + "%";

  const currentPercentage = parseInt(progressPercentage.textContent);
  animateCounter(progressPercentage, currentPercentage, newProgress, 1000);

  const goalData = {
    monthly: { max: 25000, prefix: "R$ ", suffix: "" },
    points: { max: 5000, prefix: "pts ", suffix: "" },
    crosssell: { max: 300, prefix: "vendas ", suffix: "" },
  };

  if (goalData[goalType]) {
    const data = goalData[goalType];
    const newValue = Math.floor((data.max * newProgress) / 100);
    const formattedValue =
      data.prefix + newValue.toLocaleString("pt-BR") + data.suffix;
    currentValue.textContent = formattedValue;
  }

  if (newProgress >= 100 && !goalCard.classList.contains("completed")) {
    goalCard.classList.add("completed");
    showNotification("🎉 Meta concluída! Parabéns!", "success");

    if (!goalCard.querySelector(".achievement-badge")) {
      const badge = document.createElement("div");
      badge.className = "achievement-badge";
      badge.innerHTML = '<i class="fas fa-trophy"></i>';
      goalCard.appendChild(badge);
    }
  }
}

function startRealTimeUpdates() {
  setInterval(() => {
    const goalCards = document.querySelectorAll(".goal-card");

    goalCards.forEach((card) => {
      const goalType = card.dataset.goal;
      const currentProgress = parseInt(
        card.querySelector(".progress-percentage").textContent
      );

      if (currentProgress < 100) {
        const increment = Math.random() * 2;
        const newProgress = Math.min(100, currentProgress + increment);

        if (Math.random() > 0.7) {
          updateGoalProgress(goalType, Math.floor(newProgress));
        }
      }
    });
  }, 10000);
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
      case "m":
        e.preventDefault();
        document.querySelector('[data-goal="monthly"]').click();
        break;
      case "p":
        e.preventDefault();
        document.querySelector('[data-goal="points"]').click();
        break;
      case "c":
        e.preventDefault();
        document.querySelector('[data-goal="crosssell"]').click();
        break;
    }
  }
});

const modalStyles = `
    .goal-detail {
        color: #ffffff;
    }
    
    .detail-section {
        margin-bottom: 24px;
    }
    
    .detail-section h4 {
        color: #dc2626;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    
    .detail-value {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 4px;
    }
    
    .detail-progress, .detail-deadline {
        color: #888;
        font-size: 14px;
    }
    
    .detail-target {
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 4px;
    }
    
    .history-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #3a3a3a;
    }
    
    .history-item:last-child {
        border-bottom: none;
    }
    
    .history-date {
        color: #888;
        font-size: 14px;
    }
    
    .history-value {
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
    }
    
    .tip-item {
        color: #ccc;
        font-size: 14px;
        margin-bottom: 8px;
        line-height: 1.4;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
