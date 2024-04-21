const $copyCLipboard = document.getElementById('clipboard-trigger');
const $input = document.getElementById('clipboard-target');
const $defaultIcon = document.getElementById('default-icon');
const $successIcon = document.getElementById('success-icon');
const $tooltip = document.getElementById('tooltip');
const $tooltipMessage = document.getElementById('default-tooltip-message');

$copyCLipboard.addEventListener('click', () => {
  navigator.clipboard.writeText($input.value);
  $copyCLipboard.disabled = true;

  showSuccess();

  setTimeout(() => {
    resetToDefault();
    $copyCLipboard.disabled = false;
  }, 2000);
});

const showSuccess = () => {
  $defaultIcon.classList.add('hidden');
  $successIcon.classList.remove('hidden');
  $successIcon.classList.add('inline-flex');
  $tooltipMessage.innerText = 'Copied';
  $tooltip.classList.remove('right-0');
  $tooltip.classList.add('-right-2');
};

const resetToDefault = () => {
  $defaultIcon.classList.remove('hidden');
  $successIcon.classList.remove('inline-flex');
  $successIcon.classList.add('hidden');
  $tooltipMessage.innerText = 'Copy';
  $tooltip.classList.remove('-right-2');
  $tooltip.classList.add('right-0');
};
