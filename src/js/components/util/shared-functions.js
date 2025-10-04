export function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      this.parentElement.classList.add("active");

      console.log("Navegando para:", this.querySelector("span").textContent);
    });
  });
}

export function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  progressBars.forEach((bar, index) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = targetWidth;
    }, index * 200 + 500);
  });
}

export function setupHeaderButtons() {
  const headerButtons = document.querySelectorAll(".header-btn");

  headerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1.05)";
      }, 100);
      setTimeout(() => {
        this.style.transform = "";
      }, 200);

      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bell")) {
        console.log("Notificações clicadas");
        showNotification("Você tem 3 novas notificações!");
      } else if (icon.classList.contains("fa-user")) {
        console.log("Perfil do utilizador clicado");
        showNotification("Perfil do utilizador");
      } else if (icon.classList.contains("fa-th")) {
        console.log("Menu de aplicações clicado");
        showNotification("Menu de aplicações");
      }
    });
  });
}

export function showNotification(message) {
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
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

export function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("light-theme");

  if (isDark) {
    body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  }
}

export function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

export function setupLogoutButton() {
  const sidebarFooter = document.querySelector(".sidebar-footer");
  if (sidebarFooter) {
    const logoutButton = document.createElement("a");
    logoutButton.href = "#";
    logoutButton.className = "settings-link";
    logoutButton.innerHTML =
      '<i class="fas fa-sign-out-alt"></i><span>Sair</span>';

    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Tem certeza que deseja sair?")) {
        window.dataManager.logout();
      }
    });

    sidebarFooter.appendChild(logoutButton);
  }
}
