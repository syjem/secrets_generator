const input = document.getElementById('clipboard-target');
const buttons = document.querySelectorAll("button[data-counter='characters']");

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((button) => {
      button.disabled = true;
    });
    getSecrets(button.innerText).finally(() => {
      buttons.forEach((button) => {
        button.disabled = false;
      });
    });
  });
});

const getSecrets = async (characterCount) => {
  try {
    const response = await fetch('/secrets', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characterCount),
    });
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    input.value = data;
  } catch (error) {
    console.error(error);
  }
};
