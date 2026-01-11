/**
 * Finans Takip Uygulaması - Veri Yönetimi (Store) - Global Scope
 * Tam İşlevsel Versiyon
 */

const STORAGE_KEY = 'finance_app_db_v3'; // Versiyon atladık
const SESSION_KEY = 'finance_app_session';

const defaultCategories = [
    { id: 1, name: 'Market', type: 'expense', color: '#ef4444' },
    { id: 2, name: 'Ulaşım', type: 'expense', color: '#f59e0b' },
    { id: 3, name: 'Fatura', type: 'expense', color: '#6366f1' },
    { id: 4, name: 'Kira', type: 'expense', color: '#ec4899' },
    { id: 5, name: 'Eğlence', type: 'expense', color: '#8b5cf6' },
    { id: 6, name: 'Diğer', type: 'expense', color: '#64748b' },
    { id: 7, name: 'Maaş', type: 'income', color: '#10b981' },
    { id: 8, name: 'Freelance', type: 'income', color: '#3b82f6' }
];

class Store {
    constructor() {
        this.db = this.loadDB();
        this.currentUser = this.loadSession();
    }

    loadDB() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return { users: [] };
    }

    saveDB(db) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        this.db = db;
    }

    loadSession() {
        const sessionEmail = localStorage.getItem(SESSION_KEY);
        if (sessionEmail && this.db.users) {
            return this.db.users.find(u => u.email === sessionEmail) || null;
        }
        return null;
    }

    // --- AUTH ---

    login(email, password) {
        const user = this.db.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem(SESSION_KEY, email);
            return { success: true };
        }
        return { success: false, message: 'E-posta veya şifre hatalı.' };
    }

    register(name, email, password) {
        if (this.db.users.find(u => u.email === email)) {
            return { success: false, message: 'Bu e-posta zaten kayıtlı.' };
        }

        const newUser = {
            email,
            password,
            name: name || 'Selim Can Kirli', // Varsayılan isim isteği
            data: {
                initialBalance: 0, // Başlangıç Bakiyesi
                transactions: [],
                categories: [...defaultCategories],
                budgets: [],
                goals: [],
                currency: 'TRY'
            }
        };

        this.db.users.push(newUser);
        this.saveDB(this.db);
        this.login(email, password);
        return { success: true };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem(SESSION_KEY);
        window.location.hash = '#login';
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    updateUserData() {
        if (!this.currentUser) return;
        const index = this.db.users.findIndex(u => u.email === this.currentUser.email);
        if (index !== -1) {
            this.db.users[index] = this.currentUser;
            this.saveDB(this.db);
        }
    }

    // --- PROFİL VE AYARLAR ---

    updateProfile(name) {
        if (!this.currentUser) return;
        this.currentUser.name = name;
        this.updateUserData();
    }

    setInitialBalance(amount) {
        if (!this.currentUser) return;
        this.currentUser.data.initialBalance = parseFloat(amount);
        this.updateUserData();
    }

    clearData() {
        if (!this.currentUser) return;
        this.currentUser.data.transactions = [];
        this.currentUser.data.initialBalance = 0;
        this.currentUser.data.budgets = [];
        this.currentUser.data.goals = [];
        this.updateUserData();
    }

    // --- İŞLEMLER (TRANSACTIONS) ---

    addTransaction(transaction) {
        if (!this.currentUser) return;
        const newTransaction = { ...transaction, id: Date.now() };
        this.currentUser.data.transactions.unshift(newTransaction);
        this.updateUserData();
    }

    deleteTransaction(id) {
        if (!this.currentUser) return;
        this.currentUser.data.transactions = this.currentUser.data.transactions.filter(t => t.id !== id);
        this.updateUserData();
    }

    // --- HESAPLAMALAR ---

    getBalance() {
        if (!this.currentUser) return 0;
        const initial = this.currentUser.data.initialBalance || 0;
        const totalIncome = this.getTotalIncome();
        const totalExpense = this.getTotalExpense();
        return initial + totalIncome - totalExpense;
    }

    getTotalIncome() {
        if (!this.currentUser) return 0;
        return this.currentUser.data.transactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
    }

    getTotalExpense() {
        if (!this.currentUser) return 0;
        return this.currentUser.data.transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
    }

    // Filtrelenmiş veya tüm verileri al
    getTransactions() {
        return this.currentUser ? this.currentUser.data.transactions : [];
    }

    getInitialBalance() {
        return this.currentUser ? (this.currentUser.data.initialBalance || 0) : 0;
    }

    getUserName() {
        return this.currentUser ? this.currentUser.name : '';
    }

    getUserEmail() {
        return this.currentUser ? this.currentUser.email : '';
    }
}

window.Store = new Store();
