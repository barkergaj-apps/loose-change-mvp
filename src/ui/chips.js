export const renderChips = (container, items, selectedId, onSelect) => {
  container.replaceChildren(
    ...items.map((item) => {
      const chip = document.createElement('button');

      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = item.label;
      chip.setAttribute('aria-pressed', String(item.id === selectedId));
      chip.addEventListener('click', () => onSelect(item.id));

      return chip;
    }),
  );
};
