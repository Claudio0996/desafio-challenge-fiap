document.addEventListener("DOMContentLoaded", () => {
  const btnVendedor = document.getElementById("btnVendedor");
  const btnGerente = document.getElementById("btnGerente");
  const loginForm = document.getElementById("loginForm");
  const emailInput = loginForm.querySelector('input[type="email"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');

  //Função para estilizar o botãao dependendo da opção selecionada (vendedor ou gerente) na tela de login=
  function selectRole(selectedButton) {
    btnVendedor.classList.remove("active");
    btnGerente.classList.remove("active");
    selectedButton.classList.add("active");

    loginForm.classList.remove("hidden");
  }

  btnVendedor.addEventListener("click", () => {
    selectRole(btnVendedor);
  });

  btnGerente.addEventListener("click", () => {
    selectRole(btnGerente);
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const selectedRole = btnVendedor.classList.contains("active")
      ? "vendedor"
      : "gerente";

    if (!email || !password) {
      showMessage("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (typeof window.dataManager === "undefined") {
      showMessage(
        "Sistema de dados não carregado. Recarregue a página.",
        "error"
      );
      return;
    }

    const result = window.dataManager.login(email, password);

    if (result.success) {
      if (result.user.role !== selectedRole) {
        showMessage(
          `Este usuário é ${
            result.user.role === "gerente" ? "Gerente" : "Vendedor"
          }. Selecione o perfil correto.`,
          "error"
        );
        return;
      }

      showMessage("Login realizado com sucesso! Redirecionando...", "success");

      setTimeout(() => {
        if (result.user.role === "gerente") {
          window.location.href = "./pages/gerente/gerente-dashboard.html";
        } else {
          window.location.href = "./pages/vendedor/dashboard.html";
        }
      }, 1500);
    } else {
      showMessage(result.message, "error");
    }
  });

  function showMessage(message, type = "info") {
    const existingMessage = document.querySelector(".login-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `login-message ${type}`;
    messageDiv.textContent = message;

    messageDiv.style.cssText = `
            margin-top: 15px;
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
            text-align: center;
            ${
              type === "error"
                ? "background-color: #fee; color: #c33; border: 1px solid #fcc;"
                : ""
            }
            ${
              type === "success"
                ? "background-color: #efe; color: #363; border: 1px solid #cfc;"
                : ""
            }
            ${
              type === "info"
                ? "background-color: #eef; color: #336; border: 1px solid #ccf;"
                : ""
            }
        `;

    loginForm.appendChild(messageDiv);

    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  const loginHint = document.createElement("div");
  loginHint.className = "login-hint";
  loginHint.innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 12px; color: #666;">
            <strong>Contas para teste:</strong><br>
            <strong>Gerente:</strong> gerente@swift.com / 123456<br>
            <strong>Vendedor:</strong> vendedor@swift.com / 123456<br>
            <strong>Vendedor 2:</strong> maria@swift.com / 123456
        </div>
    `;
  loginForm.appendChild(loginHint);
});
