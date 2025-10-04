import { setupLogoutButton } from "../util/shared-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = window.dataManager.getCurrentUser();
  if (!currentUser || currentUser.role !== "gerente") {
    window.location.href = "login.html";
    return;
  }

  setupLogoutButton();
});
