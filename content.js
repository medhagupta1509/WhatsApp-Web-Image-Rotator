// Wait for WhatsApp Web to load images dynamically
const observer = new MutationObserver(() => {
  addRotateButtons();
});

// Start observing the chat container for added images
function startObserving() {
  const chatContainer = document.querySelector('#main');
  if (chatContainer) {
    observer.observe(chatContainer, { childList: true, subtree: true });
    addRotateButtons();
  } else {
    // Retry after delay if not found yet
    setTimeout(startObserving, 1000);
  }
}

// Add rotate buttons to images that don't have one yet
function addRotateButtons() {
  // Select images inside chat messages (blob URLs)
  const images = document.querySelectorAll('img[src*="blob:"]');

  images.forEach(img => {
    // Skip if button already added
    if (img.parentElement.classList.contains('image-container')) return;

    // Wrap image in a container to position button
    const wrapper = document.createElement('span');
    wrapper.classList.add('image-container');
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Create rotate button
    const btn = document.createElement('button');
    btn.textContent = '⟳';
    btn.className = 'rotate-btn';

    // Initialize rotation data attribute
    img.setAttribute('data-rotation', '0');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      let currentRotation = parseInt(img.getAttribute('data-rotation'), 10);
      currentRotation = (currentRotation + 90) % 360;
      img.style.transform = `rotate(${currentRotation}deg)`;
      img.setAttribute('data-rotation', currentRotation.toString());
    });

    wrapper.appendChild(btn);
  });
}

startObserving();