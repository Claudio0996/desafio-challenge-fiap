class DataManager {
  constructor() {
    this.initializeData();
  }

  users = [];
  mission = [];
  disputes = [];
  sales = [];

  initializeData() {
    if (!localStorage.getItem("swift_users")) {
      this.createDefaultUsers();
    }
    if (!localStorage.getItem("swift_missions")) {
      this.createDefaultMissions();
    }
    if (!localStorage.getItem("swift_disputes")) {
      this.createDefaultDisputes();
    }
    if (!localStorage.getItem("swift_sales")) {
      this.createDefaultSales();
    }
    if (!localStorage.getItem("swift_current_user")) {
      localStorage.setItem("swift_current_user", null);
    }
  }

  createDefaultUsers() {
    this.users = [
      {
        id: 1,
        email: "gerente@swift.com",
        password: "123456",
        name: "Claudio Vinícius",
        role: "gerente",
        position: "3ª Posição",
        region: "Sul",
      },
      {
        id: 2,
        email: "vendedor@swift.com",
        password: "123456",
        name: "João Silva",
        role: "vendedor",
        position: "1ª Posição",
        region: "Sul",
      },
      {
        id: 3,
        email: "maria@swift.com",
        password: "123456",
        name: "Maria Santos",
        role: "vendedor",
        position: "2ª Posição",
        region: "Sul",
      },
    ];
    localStorage.setItem("swift_users", JSON.stringify(users));
  }

  createDefaultMissions() {
    this.missions = [
      {
        id: 1,
        title: "Limpar a Loja",
        description: "Mantenha a loja limpa e organizada",
        points: 200,
        progress: 67.7,
        status: "em_andamento",
        assignedTo: "João Silva",
        dueDate: "2024-01-20T18:00:00",
        createdAt: "2024-01-19T10:00:00",
      },
      {
        id: 2,
        title: "Limpar os Freezers",
        description: "Limpeza completa dos equipamentos de refrigeração",
        points: 200,
        progress: 67.7,
        status: "em_andamento",
        assignedTo: "Maria Santos",
        dueDate: "2024-01-20T20:00:00",
        createdAt: "2024-01-19T10:00:00",
      },
      {
        id: 3,
        title: "Vender 10 frangos",
        description: "Meta de vendas de frango para hoje",
        points: 5000,
        progress: 37.7,
        status: "em_andamento",
        assignedTo: "João Silva",
        dueDate: "2024-01-20T22:00:00",
        createdAt: "2024-01-19T10:00:00",
      },
      {
        id: 4,
        title: "Organizar estoque",
        description: "Organização completa do estoque",
        points: 300,
        progress: 100,
        status: "concluida",
        assignedTo: "Maria Santos",
        dueDate: "2024-01-19T16:00:00",
        createdAt: "2024-01-19T08:00:00",
        completedAt: "2024-01-19T15:30:00",
      },
    ];
    localStorage.setItem("swift_missions", JSON.stringify(missions));
  }

  createDefaultDisputes() {
    this.disputes = [
      {
        id: 1,
        store1: "Barra Bonita",
        store2: "Vila Olímpia",
        type: "Vendas",
        score1: 176754.31,
        score2: 150000.0,
        status: "em_andamento",
        startDate: "2024-05-31",
        endDate: "2024-06-07",
        createdAt: "2024-05-31T09:00:00",
      },
      {
        id: 2,
        store1: "Centro",
        store2: "Limeira",
        type: "Cross-sell",
        score1: 156904.81,
        score2: 140000.0,
        status: "em_andamento",
        startDate: "2024-05-31",
        endDate: "2024-06-07",
        createdAt: "2024-05-31T09:00:00",
      },
      {
        id: 3,
        store1: "Interlagos",
        store2: "Tatuapé",
        type: "Vendas",
        score1: 200000.0,
        score2: 180000.0,
        status: "finalizada",
        startDate: "2024-05-24",
        endDate: "2024-05-31",
        winner: "Interlagos",
        createdAt: "2024-05-24T09:00:00",
        completedAt: "2024-05-31T18:00:00",
      },
    ];
    localStorage.setItem("swift_disputes", JSON.stringify(disputes));
  }

  createDefaultSales() {
    this.sales = [
      {
        id: 1,
        product: "Açaí Frapp melgaçuda 1kg",
        price: 25.0,
        status: "pronto",
        timeAgo: "15 min atrás",
        category: "Açaí",
        seller: "João Silva",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      },
      {
        id: 2,
        product: "Açaí Frapp melgaçuda 1kg",
        price: 25.0,
        status: "pronto",
        timeAgo: "23 min atrás",
        category: "Açaí",
        seller: "Maria Santos",
        timestamp: new Date(Date.now() - 23 * 60000).toISOString(),
      },
      {
        id: 3,
        product: "Açaí Frapp melgaçuda 1kg",
        price: 25.0,
        status: "pronto",
        timeAgo: "31 min atrás",
        category: "Açaí",
        seller: "João Silva",
        timestamp: new Date(Date.now() - 31 * 60000).toISOString(),
      },
    ];
    localStorage.setItem("swift_sales", JSON.stringify(this.sales));
  }

  login(email, password) {
    this.users = JSON.parse(localStorage.getItem("swift_users"));
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("swift_current_user", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Email ou senha incorretos" };
  }

  logout() {
    localStorage.removeItem("swift_current_user");
    window.location.href = "../../login.html";
  }

  getCurrentUser() {
    const user = localStorage.getItem("swift_current_user");
    return user ? JSON.parse(user) : null;
  }

  getMissions() {
    return JSON.parse(localStorage.getItem("swift_missions"));
  }

  updateMissionProgress(missionId, progress) {
    this.missions = this.getMissions();
    const mission = this.missions.find((m) => m.id === missionId);
    if (mission) {
      mission.progress = progress;
      if (progress >= 100) {
        mission.status = "concluida";
        mission.completedAt = new Date().toISOString();
      }
      localStorage.setItem("swift_missions", JSON.stringify(missions));
      return true;
    }
    return false;
  }

  createMission(missionData) {
    const missions = this.getMissions();
    const newMission = {
      id: Date.now(),
      ...missionData,
      progress: 0,
      status: "em_andamento",
      createdAt: new Date().toISOString(),
    };
    missions.push(newMission);
    localStorage.setItem("swift_missions", JSON.stringify(missions));
    return newMission;
  }

  getDisputes() {
    return JSON.parse(localStorage.getItem("swift_disputes"));
  }

  createDispute(disputeData) {
    const disputes = this.getDisputes();
    const newDispute = {
      id: Date.now(),
      ...disputeData,
      status: "em_andamento",
      createdAt: new Date().toISOString(),
    };
    disputes.push(newDispute);
    localStorage.setItem("swift_disputes", JSON.stringify(disputes));
    return newDispute;
  }

  getSales() {
    return JSON.parse(localStorage.getItem("swift_sales"));
  }

  addSale(saleData) {
    const sales = this.getSales();
    const newSale = {
      id: Date.now(),
      ...saleData,
      timestamp: new Date().toISOString(),
    };
    sales.unshift(newSale); // Adiciona no início da lista
    localStorage.setItem("swift_sales", JSON.stringify(sales));
    return newSale;
  }

  getStats() {
    const sales = this.getSales();
    const missions = this.getMissions();

    const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
    const completedMissions = missions.filter(
      (m) => m.status === "concluida"
    ).length;
    const pendingMissions = missions.filter(
      (m) => m.status === "em_andamento"
    ).length;

    return {
      totalSales,
      completedMissions,
      pendingMissions,
      totalItems: sales.length,
    };
  }

  getRanking() {
    const users = JSON.parse(localStorage.getItem("swift_users"));
    const missions = this.getMissions();

    return users
      .map((user) => {
        const userMissions = missions.filter((m) => m.assignedTo === user.name);
        const completedMissions = userMissions.filter(
          (m) => m.status === "concluida"
        );
        const totalPoints = completedMissions.reduce(
          (sum, m) => sum + m.points,
          0
        );

        return {
          ...user,
          totalPoints,
          completedMissions: completedMissions.length,
          totalMissions: userMissions.length,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }
}

window.dataManager = new DataManager();
