import QRCode from 'qrcode';
import './style.css';

const contentInput = document.querySelector('#qr-content');
const businessNameInput = document.querySelector('#business-name');
const identityControls = document.querySelector('#identity-controls');
const canvas = document.querySelector('#qr-canvas');
const emptyState = document.querySelector('#empty-state');
const downloadButton = document.querySelector('#download-button');
const logoInput = document.querySelector('#logo-upload');
const logoPreview = document.querySelector('#logo-preview');
const nameMonogram = document.querySelector('#name-monogram');
const clearLogoButton = document.querySelector('#clear-logo');
const uploadTitle = document.querySelector('#upload-title');
const uploadHint = document.querySelector('#upload-hint');
const logoName = document.querySelector('#logo-name');
const removeLogoButton = document.querySelector('#remove-logo');
const foregroundInput = document.querySelector('#foreground-color');
const backgroundInput = document.querySelector('#background-color');
const errorLevelInput = document.querySelector('#error-level');
const logoShapeInput = document.querySelector('#logo-shape');
const scanDetail = document.querySelector('#scan-detail');
let logoImage = null;

function updateIdentityState() {
  identityControls.disabled = !contentInput.value.trim();
}

function getBusinessIcon(name) {
  const hash = [...name].reduce((total, character) => total + character.charCodeAt(0), 0);
  return ['✦', '◆', '✣', '◈'][hash % 4];
}

function updateNameMonogram() {
  const icon = getBusinessIcon(businessNameInput.value.trim());
  nameMonogram.textContent = icon;
  nameMonogram.hidden = Boolean(logoImage) || !businessNameInput.value.trim();
  if (!logoImage) {
    uploadTitle.textContent = businessNameInput.value.trim() ? 'Generated business mark' : 'Add logo';
    uploadHint.textContent = businessNameInput.value.trim() ? 'Based on business name' : 'PNG, JPG or WEBP';
  }
}

const updateColorLabel = (input, target) => { document.querySelector(target).textContent = input.value.toUpperCase(); };

async function renderQr() {
  const value = contentInput.value.trim();
  updateColorLabel(foregroundInput, '#foreground-value');
  updateColorLabel(backgroundInput, '#background-value');
  if (!value) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.removeProperty('width');
    canvas.style.removeProperty('height');
    emptyState.hidden = false;
    downloadButton.disabled = true;
    scanDetail.textContent = 'Add content to begin';
    return;
  }
  await QRCode.toCanvas(canvas, value, { width: 1080, margin: 4, errorCorrectionLevel: errorLevelInput.value, color: { dark: foregroundInput.value, light: backgroundInput.value } });
  canvas.style.removeProperty('width');
  canvas.style.removeProperty('height');
  emptyState.hidden = true;
  downloadButton.disabled = false;
  scanDetail.textContent = 'High contrast · Print ready';
}

contentInput.addEventListener('input', () => { updateIdentityState(); renderQr(); });
businessNameInput.addEventListener('input', () => { updateNameMonogram(); renderQr(); });
foregroundInput.addEventListener('input', renderQr);
backgroundInput.addEventListener('input', renderQr);
errorLevelInput.addEventListener('change', renderQr);
logoShapeInput.addEventListener('change', renderQr);
logoInput.addEventListener('change', () => {
  const file = logoInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    logoPreview.src = reader.result;
    logoPreview.hidden = false;
    clearLogoButton.hidden = false;
    nameMonogram.hidden = true;
    uploadTitle.textContent = 'Change logo';
    uploadHint.textContent = 'Click to replace';
    logoImage = new Image();
    logoImage.addEventListener('load', renderQr, { once: true });
    logoImage.src = reader.result;
  });
  reader.readAsDataURL(file);
  logoName.textContent = file.name;
  removeLogoButton.hidden = false;
});
removeLogoButton.addEventListener('click', () => {
  logoImage = null;
  logoInput.value = '';
  logoPreview.src = '';
  logoPreview.hidden = true;
  clearLogoButton.hidden = true;
  updateNameMonogram();
  uploadTitle.textContent = 'Add logo';
  uploadHint.textContent = 'PNG, JPG or WEBP';
  logoName.textContent = '';
  removeLogoButton.hidden = true;
  renderQr();
});
clearLogoButton.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  removeLogoButton.click();
});
downloadButton.addEventListener('click', () => { const link = document.createElement('a'); link.download = 'markqr-business-code.png'; link.href = canvas.toDataURL('image/png'); link.click(); });
updateNameMonogram();
updateIdentityState();
renderQr();