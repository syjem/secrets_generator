const devUrl = 'http://localhost:5000/secrets';
const productionUrl = 'https://secrets-generator.vercel.app/secrets';

const generateBtn = document.getElementById('generate-btn');
const input = document.querySelector('input[type="text"]');

generateBtn.addEventListener('click', async () => {
  generateBtn.disabled = true;

  try {
    const response = await fetch(productionUrl);
    const data = await response.json();
    input.value = data;
  } catch (error) {
    console.error('Fetch error:', error);
  }

  generateBtn.disabled = false;
});
