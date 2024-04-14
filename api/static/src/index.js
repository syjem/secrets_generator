const input = document.querySelector('input');
const form = document.querySelector('form');
const secrets = document.getElementById('secrets');
const btn = document.getElementById('btn');
const inputContainer = document.getElementById('input-container');
const svg = document.getElementById('svg');
const generate = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const copyText = document.querySelector('.copy-text');
let errorParagraph;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  secrets.textContent = '';
  generate.textContent = 'Generating';
  btn.disabled = true;

  svg.classList.remove('hidden');
  svg.classList.add('inline');

  // Remove existing error paragraph, if any
  if (errorParagraph && errorParagraph.parentNode === inputContainer) {
    inputContainer.removeChild(errorParagraph);
  }

  try {
    const response = await fetch('http://localhost:5000/secrets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input.value),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      throw new Error(`Request failed. ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      errorParagraph = document.createElement('p');
      errorParagraph.classList.add('text-red-500', 'text-sm');
      errorParagraph.textContent = data.error;
      inputContainer.appendChild(errorParagraph);
    }
    if (data.success) {
      secrets.textContent = data.success;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  generate.textContent = 'Generate';
  btn.disabled = false;
  svg.classList.remove('inline');
  svg.classList.add('hidden');
  form.reset();
});

input.addEventListener('input', () => {
  if (errorParagraph && errorParagraph.parentNode === inputContainer) {
    inputContainer.removeChild(errorParagraph);
  }
});

clipboard.addEventListener('click', () => {
  navigator.clipboard.writeText(secrets.textContent);
  clipboard.disabled = true;
  copyText.textContent = 'Copied';
  setTimeout(() => {
    copyText.textContent = 'Copy';
    clipboard.disabled = false;
  }, 2000);
});
