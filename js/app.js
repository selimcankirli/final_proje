/**
 * Uygulama Başlatıcı - Global Scope
 */

window.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // 1. Layout Render
    app.innerHTML = window.Components.Layout.render();

    // 2. Start Live Clock
    if (window.Components.Layout.startClock) {
        window.Components.Layout.startClock();
    }

    // 3. İkonları Oluştur
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 4. Router'ı Başlat
    window.App.Router.init();
});
