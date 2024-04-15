const devUrl = 'http://localhost:5000/secrets';
const productionUrl = 'https://secrets-generator.vercel.app/secrets';

const newBtn = document.getElementById('new-btn');
const input = document.getElementById('clipboard-target');

newBtn.addEventListener('click', async () => {
  newBtn.disabled = true;

  try {
    const response = await fetch(productionUrl);
    if (!response.ok) throw new Error('Something went wrong!');
    const data = await response.json();
    input.value = data;
  } catch (error) {
    console.error(error);
  }

  newBtn.disabled = false;
});
