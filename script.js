const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('.lightbox__image');
const dialogCaption = dialog.querySelector('.lightbox__caption');
const closeButton = dialog.querySelector('.lightbox__close');
const photoButtons = document.querySelectorAll('.photo-button');
let lastTrigger = null;

photoButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const preview = button.querySelector('img');
    lastTrigger = button;
    dialogImage.classList.add('is-loading');
    dialogImage.src = button.dataset.full;
    dialogImage.alt = preview?.alt ?? '';
    dialogCaption.textContent = button.dataset.caption ?? '';
    dialog.showModal();
    closeButton.focus();

    if (dialogImage.complete) {
      dialogImage.classList.remove('is-loading');
    }
  });
});

dialogImage.addEventListener('load', () => {
  dialogImage.classList.remove('is-loading');
});

dialogImage.addEventListener('error', () => {
  dialogImage.classList.remove('is-loading');
  dialogCaption.textContent = '大图暂时没有加载出来，请关闭后再试一次。';
});

closeButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener('close', () => {
  lastTrigger?.focus({ preventScroll: true });
});
