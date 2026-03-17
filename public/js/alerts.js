export async function loadAlerts() {
  try {
    const response = await fetch('/json/alerts.json');
    const alerts = await response.json();

    if (alerts && alerts.length > 0) {
      const alertSection = document.createElement('section');
      alertSection.className = 'alert-list';

      alerts.forEach(alert => {
        const p = document.createElement('p');
        p.textContent = alert.message;
        p.style.backgroundColor = alert.background;
        p.style.color = alert.color;
        alertSection.appendChild(p);
      });

      // Wait a bit for the DOM to be fully ready
      setTimeout(() => {
        const main = document.querySelector('main');
        if (main) {
          main.prepend(alertSection);
        } else {
          // Fallback to body if main not found
          document.body.prepend(alertSection);
        }
      }, 100);
    }
  } catch (error) {
    console.error('Error loading alerts:', error);
  }
}