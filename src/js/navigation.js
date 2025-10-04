class NavigationManager {
  constructor() {
    this.currentUser = null;
    this.routes = {
      vendedor: {
        Início: "./pages/vendedor/dashboard.html",
        Metas: "./pages/vendedor/goals.html",
        Missões: "./pages/vendedor/mission.html",
        Disputa: "./pages/vendedor/competition.html",
      },
      gerente: {
        "Painel Gerente": "gerente-dashboard.html",
        "Ranking Regional": "ranking-regional.html",
        Disputas: "gerente-disputa.html",
        "Gestão de Missões": "gerente-missao.html",
        "Gestão de Vendas": "gestao-vendas.html",
      },
    };

    this.init();
  }

  init() {
    this.currentUser = window.dataManager?.getCurrentUser();
    if (!this.currentUser) {
      this.redirectToLogin();
      return;
    }

    this.setupNavigation();
    this.setupKeyboardNavigation();
    this.updateActivePage();
    this.showNavigationTips();
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link, index) => {
      const shortcut = index + 1;
      link.setAttribute("data-shortcut", `Ctrl+${shortcut}`);

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const linkText = link.querySelector("span")?.textContent;
        this.navigateToPage(linkText);
      });
    });
  }

  navigateToPage(pageName) {
    if (!this.currentUser) {
      this.redirectToLogin();
      return;
    }

    const userRole = this.currentUser.role;
    const routes = this.routes[userRole];

    if (!routes || !routes[pageName]) {
      console.warn(`Rota não encontrada: ${pageName} para ${userRole}`);
      return;
    }

    const targetPage = routes[pageName];

    window.location.href = targetPage;
  }

  getCurrentPageName() {
    const path = window.location.pathname;
    const fileName = path.split("/").pop();

    const pageNames = {
      "login.html": "Login",
      "mission.html": "Missões",
      "gerente-dashboard.html": "Painel Gerente",
      "gerente-disputa.html": "Disputas",
      "gerente-missao.html": "Gestão de Missões",
      "gestao-vendas.html": "Gestão de Vendas",
      "ranking-regional.html": "Ranking Regional",
    };

    return pageNames[fileName] || "Página";
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + número para navegação rápida
      if (e.ctrlKey || e.metaKey) {
        const userRole = this.currentUser?.role;
        if (!userRole) return;

        const routes = this.routes[userRole];
        const routeKeys = Object.keys(routes);

        switch (e.key) {
          case "1":
            e.preventDefault();
            this.navigateToPage(routeKeys[0]);
            break;
          case "2":
            e.preventDefault();
            this.navigateToPage(routeKeys[1]);
            break;
          case "3":
            e.preventDefault();
            this.navigateToPage(routeKeys[2]);
            break;
          case "4":
            e.preventDefault();
            this.navigateToPage(routeKeys[3]);
            break;
          case "5":
            e.preventDefault();
            this.navigateToPage(routeKeys[4]);
            break;
        }
      }
      if (e.key === "Escape") {
        const userRole = this.currentUser?.role;
        if (userRole === "gerente") {
          window.location.href = "gerente-dashboard.html";
        } else {
          window.location.href = "mission.html";
        }
      }
    });
  }

  updateActivePage() {
    const currentPage = this.getCurrentPageName();
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      const link = item.querySelector(".nav-link");
      const linkText = link.querySelector("span")?.textContent;

      if (linkText === currentPage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  redirectToLogin() {
    if (window.location.pathname.includes("login.html")) return;
    window.location.href = "../../login.html";
  }

  showNavigationTips() {
    const userRole = this.currentUser?.role;
    if (!userRole) return;

    const tips = document.createElement("div");
    tips.className = "navigation-tips";
    tips.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-size: 12px;
      max-width: 200px;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    tips.innerHTML = `
      <strong>Dicas de Navegação:</strong><br>
      • Ctrl + 1-5: Navegação rápida<br>
      • ESC: Voltar ao início<br>
      • Clique nos links da sidebar
    `;

    document.body.appendChild(tips);

    setTimeout(() => {
      tips.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      tips.style.opacity = "0";
      setTimeout(() => {
        if (tips.parentNode) {
          tips.remove();
        }
      }, 300);
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.dataManager) {
    window.navigationManager = new NavigationManager();
  }
});
