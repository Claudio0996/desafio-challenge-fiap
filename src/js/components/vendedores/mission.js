import {
  setupNavigation,
  setupHeaderButtons,
  showNotification,
  createParticleEffect,
  setupTooltips,
  animateValueChange,
  setupLogoutButton,
} from "../../../tests/util/shared-functions.js";

document.addEventListener("DOMContentLoaded", function () {
  initProgressBars();
  setupNavigation();
  setupHeaderButtons();
  setupMissionCardInteractions();
  setupLogoutButton();
  setupTooltips();
  setupEntryAnimations();

  setTimeout(startRealTimeUpdates, 5000);
});

function initProgressBars() {
  const progressBars = document.querySelectorAll(
    ".mission-card .progress-fill"
  );

  progressBars.forEach((bar, index) => {
    const targetProgress = parseFloat(bar.dataset.progress);
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = targetProgress + "%";

      const percentageElement = bar
        .closest(".mission-card")
        .querySelector(".progress-percentage");
      if (percentageElement) {
        animateValueChange(
          percentageElement,
          0,
          targetProgress,
          (value) => `${value.toFixed(1)}%`,
          1500
        );
      }
    }, index * 200 + 500);
  });
}

function setupMissionCardInteractions() {
  const missionCards = document.querySelectorAll(".mission-card");

  missionCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      createParticleEffect(
        this,
        card.classList.contains("completed") ? "success" : "primary"
      );
    });

    card.addEventListener("click", function () {
      const missionTitle = this.querySelector(".mission-title").textContent;
      const isCompleted = this.classList.contains("completed");

      if (isCompleted) {
        showNotification(`Missão "${missionTitle}" já foi concluída!`, "info");
      } else {
        showNotification(`Clicou na missão: "${missionTitle}"`, "info");
      }
    });
  });
}

function setupEntryAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  const animatedElements = document.querySelectorAll(".mission-card");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
}

function updateMissionProgress(missionId, newProgress) {
  const missionCard = document.querySelector(
    `[data-mission-id="${missionId}"]`
  );
  if (!missionCard) return;

  const progressFill = missionCard.querySelector(".progress-fill");
  const progressPercentage = missionCard.querySelector(".progress-percentage");

  progressFill.style.width = newProgress + "%";

  const currentPercentage = parseFloat(progressPercentage.textContent);
  animateValueChange(
    progressPercentage,
    currentPercentage,
    newProgress,
    (value) => `${value.toFixed(1)}%`,
    1000
  );

  if (newProgress >= 100 && !missionCard.classList.contains("completed")) {
    missionCard.classList.add("completed");
    showNotification("🎉 Missão concluída! Parabéns!", "success");

    const timeElement = missionCard.querySelector(".mission-time");
    if (timeElement) {
      timeElement.innerHTML = `<i class="fas fa-check"></i><span>Concluído</span>`;
      timeElement.classList.add("completed");
    }

    if (!missionCard.querySelector(".achievement-badge")) {
      const badge = document.createElement("div");
      badge.className = "achievement-badge";
      badge.innerHTML = `<i class="fas fa-award"></i>`;
      missionCard.appendChild(badge);
    }
  }
}

function startRealTimeUpdates() {
  setInterval(() => {
    const missionCards = document.querySelectorAll(".mission-card");

    missionCards.forEach((card) => {
      const missionId = card.dataset.missionId;
      const currentProgress = parseFloat(
        card.querySelector(".progress-percentage").textContent
      );

      if (currentProgress < 100) {
        const increment = Math.random() * 5;
        const newProgress = Math.min(100, currentProgress + increment);

        if (Math.random() > 0.6) {
          updateMissionProgress(missionId, parseFloat(newProgress.toFixed(1)));
        }
      }
    });
  }, 7000);
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
      case "u":
        e.preventDefault();
        const randomMissionId = Math.floor(Math.random() * 4) + 1;
        const missionCard = document.querySelector(
          `[data-mission-id="${randomMissionId}"]`
        );
        if (missionCard && !missionCard.classList.contains("completed")) {
          const currentProgress = parseFloat(
            missionCard.querySelector(".progress-percentage").textContent
          );
          const newProgress = Math.min(
            100,
            currentProgress + 10 + Math.random() * 10
          );
          updateMissionProgress(
            randomMissionId,
            parseFloat(newProgress.toFixed(1))
          );
          showNotification(
            `Progresso da Missão ${randomMissionId} atualizado!`,
            "info"
          );
        } else if (missionCard && missionCard.classList.contains("completed")) {
          showNotification(
            `Missão ${randomMissionId} já está concluída!`,
            "info"
          );
        }
        break;
    }
  }
});
