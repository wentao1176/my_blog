const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle');
const updateTheme = () =>
  themeButton?.setAttribute(
    'aria-label',
    document.documentElement.dataset.theme === 'dark'
      ? '切换浅色模式'
      : '切换深色模式',
  );
updateTheme();
themeButton?.addEventListener('click', () => {
  const next =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('qinglan-theme', next);
  } catch {}
  updateTheme();
});
const menu = document.querySelector<HTMLButtonElement>('#menu-toggle');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? '收起导航' : '展开导航');
  document.querySelector('#site-nav')?.classList.toggle('open', expanded);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menu?.setAttribute('aria-expanded', 'false');
    document.querySelector('#site-nav')?.classList.remove('open');
  }
});
document.querySelectorAll<HTMLElement>('.prose pre').forEach((pre) => {
  const button = document.createElement('button');
  button.className = 'copy-code';
  button.textContent = '复制';
  button.setAttribute('aria-label', '复制代码');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(
        pre.querySelector('code')?.textContent || '',
      );
      button.textContent = '已复制';
    } catch {
      button.textContent = '复制失败';
    }
    setTimeout(() => (button.textContent = '复制'), 1800);
  });
  pre.append(button);
});
