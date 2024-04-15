const generateBtn = document.getElementById('generate-btn');
const input = document.querySelector('input[type="text"]');
const appContainer = document.getElementById('app-container');
let error;

const productionUrl = 'https://secrets-generator.vercel.app/secrets';
const devUrl = 'http://localhost:5000/secrets';

generateBtn.addEventListener('click', async () => {
  input.value = '';
  generateBtn.innerText = 'Generating';
  generateBtn.disabled = true;

  // Remove existing error paragraph, if any
  if (error && error.parentNode === appContainer) {
    appContainer.removeChild(error);
  }

  try {
    const response = await fetch(productionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(16),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      throw new Error(`Request failed. ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      error = document.createElement('p');
      error.classList.add('text-red-500', 'text-sm', 'py-3');
      error.innerText = data.error;
      appContainer.appendChild(error);
    }
    if (data.success) {
      input.value = data.success;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  generateBtn.innerText = 'Generate';
  generateBtn.disabled = false;
});
