export function createTemplate(html) {
  const el = document.createElement(`template`);
  el.innerHTML = html;
  return el;
}
