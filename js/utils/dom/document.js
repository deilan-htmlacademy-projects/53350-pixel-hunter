export function createView(template) {
  const el = document.createElement(`div`);
  el.innerHTML = template;
  return el;
}
