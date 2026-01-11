/**
 * Login Sayfası - Global Scope
 */
window.Pages = window.Pages || {};

window.Pages.login = {
    render: () => {
        return `
            <div style="
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                padding: 1rem;
                background-color: var(--bg-main);
            ">
                <div class="card" style="width: 100%; max-width: 400px; padding: 2.5rem;">
                    <div style="text-align: center; margin-bottom: 2rem; color: var(--primary)">
                        <i data-lucide="wallet" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                        <h1 style="font-size: 1.75rem; color: var(--text-main)">FinansTakip</h1>
                        <p class="text-muted">Hesabınıza giriş yapın</p>
                    </div>

                    <form onsubmit="event.preventDefault(); window.Pages.login.handleLogin(this)">
                        <div class="mb-4">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted)">E-Posta</label>
                            <input type="email" name="email" required style="
                                width: 100%; 
                                padding: 0.75rem; 
                                border-radius: var(--radius); 
                                border: 1px solid var(--border); 
                                background: var(--bg-main); 
                                color: var(--text-main);
                                outline: none;
                            " placeholder="ornek@email.com">
                        </div>

                        <div class="mb-4">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted)">Şifre</label>
                            <input type="password" name="password" required style="
                                width: 100%; 
                                padding: 0.75rem; 
                                border-radius: var(--radius); 
                                border: 1px solid var(--border); 
                                background: var(--bg-main); 
                                color: var(--text-main);
                                outline: none;
                            " placeholder="******">
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 48px;">
                            Giriş Yap
                        </button>
                    </form>

                    <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border)">
                        <span class="text-muted">Hesabınız yok mu?</span><br>
                        <a href="#register" style="color: var(--primary); text-decoration: none; font-weight: 600; display: inline-block; margin-top: 0.5rem">
                            Hemen Kayıt Ol
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    handleLogin: (form) => {
        const email = form.email.value;
        const password = form.password.value;

        const result = window.Store.login(email, password);

        if (result.success) {
            window.location.hash = '#dashboard';
        } else {
            alert(result.message);
        }
    }
};
