const generateBtn = document.getElementById('generate-btn');
const input = document.querySelector('input[type="text"]');

const productionUrl = 'https://secrets-generator.vercel.app/secrets';
const devUrl = 'http://localhost:5000/secrets';

generateBtn.addEventListener('click', async () => {
  generateBtn.disabled = true;

  try {
    const response = await fetch(productionUrl);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found.');
      }
      throw new Error(`Request failed. ${response.status}`);
    }
    const data = await response.json();
    input.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
  }

  generateBtn.disabled = false;
});
