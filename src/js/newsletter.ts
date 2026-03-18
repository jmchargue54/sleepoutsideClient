export function initNewsletterSignup() {
  const form = document.getElementById('newsletter-form') as HTMLFormElement | null;
  if (!form) return;

  const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]');
  const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
  const messageEl = form.querySelector<HTMLDivElement>('.newsletter__message');

  function setMessage(text: string, isError = false) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.classList.toggle('newsletter__message--error', isError);
    messageEl.classList.toggle('newsletter__message--success', !isError);
  }

  function validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';

    if (!name) {
      setMessage('Please enter your name.', true);
      nameInput?.focus();
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.', true);
      emailInput?.focus();
      return;
    }

    // We currently don't have a backend subscription API, so store locally.
    const subs = JSON.parse(localStorage.getItem('so-newsletter-subs') || '[]');
    subs.push({ name, email, date: new Date().toISOString() });
    localStorage.setItem('so-newsletter-subs', JSON.stringify(subs));

    setMessage('Thanks! You are signed up for updates.', false);
    form.reset();
  });
}
