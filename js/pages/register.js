/**
 * Register Sayfası - Global Scope
 */
window.Pages = window.Pages || {};

window.Pages.register = {
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
                         <i data-lucide="user-plus" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                        <h1 style="font-size: 1.75rem; color: var(--text-main)">Yeni Kayıt</h1>
                        <p class="text-muted">Finansal özgürlüğe ilk adım</p>
                    </div>

                    <form onsubmit="event.preventDefault(); window.Pages.register.handleRegister(this)">
                         <div class="mb-4">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted)">Ad Soyad</label>
                            <input type="text" name="name" required style="
                                width: 100%; 
                                padding: 0.75rem; 
                                border-radius: var(--radius); 
                                border: 1px solid var(--border); 
                                background: var(--bg-main); 
                                color: var(--text-main);
                                outline: none;
                            " placeholder="Adınız Soyadınız">
                        </div>

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
                            Hesap Oluştur
                        </button>
                    </form>

                    <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border)">
                        <span class="text-muted">Zaten hesabınız var mı?</span><br>
                        <a href="#login" style="color: var(--primary); text-decoration: none; font-weight: 600; display: inline-block; margin-top: 0.5rem">
                            Giriş Yap
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    handleRegister: (form) => {
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const result = window.Store.register(name, email, password);

        if (result.success) {
            window.location.hash = '#dashboard';
        } else {
            alert(result.message);
        }
    }
};
