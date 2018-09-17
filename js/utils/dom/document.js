export const createElement = (template, tagName = `div`) => {
  const el = document.createElement(tagName);
  el.innerHTML = template;
  return el;
};
