export function createElement(template, tagName = `div`) {
  const el = document.createElement(tagName);
  el.innerHTML = template;
  return el;
}

export function createDocumentFragment(template) {
  const el = document.createElement(`template`);
  el.innerHTML = template;
  return el.content;
}
