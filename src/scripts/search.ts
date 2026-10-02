import { matchesPost } from '../lib/content.mjs';
const input = document.querySelector<HTMLInputElement>('#post-search');
let category = '全部';
const cards = [...document.querySelectorAll<HTMLElement>('[data-post]')];
function filter() {
  let count = 0;
  cards.forEach((card) => {
    const data = {
      title: card.dataset.title,
      description: card.dataset.description,
      tags: (card.dataset.tags || '').split(' '),
      category: card.dataset.category,
    };
    const visible = matchesPost({ data }, input?.value || '', category);
    card.hidden = !visible;
    if (visible) count++;
  });
  const result = document.querySelector('#result-count');
  if (result) result.textContent = `共 ${count} 篇文章`;
  const empty = document.querySelector<HTMLElement>('#empty-results');
  if (empty) empty.hidden = count > 0;
}
input?.addEventListener('input', filter);
document
  .querySelectorAll<HTMLButtonElement>('[data-filter]')
  .forEach((button) =>
    button.addEventListener('click', () => {
      category = button.dataset.filter || '全部';
      document.querySelectorAll('[data-filter]').forEach((b) => {
        b.classList.toggle('selected', b === button);
        b.setAttribute('aria-pressed', String(b === button));
      });
      filter();
    }),
  );
document.querySelector('#reset-search')?.addEventListener('click', () => {
  if (input) input.value = '';
  document.querySelector<HTMLButtonElement>('[data-filter="全部"]')?.click();
  input?.focus();
});
document.addEventListener('keydown', (event) => {
  if (
    event.key === '/' &&
    !(event.target instanceof HTMLInputElement) &&
    !(event.target instanceof HTMLTextAreaElement)
  ) {
    event.preventDefault();
    input?.focus();
  }
});
if (location.hash === '#search') input?.focus();
