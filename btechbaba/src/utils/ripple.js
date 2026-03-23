/**
 * Creates a ripple effect emanating from the click point.
 * The target element must have: position: relative; overflow: hidden;
 * (use the .ripple-container CSS class)
 */
export function createRipple(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const diameter = Math.max(el.clientWidth, el.clientHeight);
  const radius = diameter / 2;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple-wave');
  ripple.style.width = `${diameter}px`;
  ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - radius}px`;
  ripple.style.top = `${event.clientY - rect.top - radius}px`;

  // Remove old ripple
  const existing = el.querySelector('.ripple-wave');
  if (existing) existing.remove();

  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}
