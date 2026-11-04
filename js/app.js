document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#todo-form') || document.querySelector('form');
  const input = document.querySelector('#todo-input') || document.querySelector('input[type="text"]');
  const list = document.querySelector('#todo-list') || document.querySelector('ul');
  const errorMsg = document.querySelector('#error-msg') || document.querySelector('.error-msg');
  const counter = document.querySelector('#counter') || document.querySelector('#item-count') || document.querySelector('.counter');

  function updateCounter() {
    if (!list) return;
    const items = list.querySelectorAll('li');
    const activeItems = Array.from(items).filter(li => !li.classList.contains('completed'));
    if (counter) {
      counter.textContent = `${activeItems.length} item${activeItems.length === 1 ? '' : 's'} left`;
    }
  }

  if (form && input && list) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();

      if (text === '') {
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          errorMsg.style.display = 'block';
        }
        return;
      }

      if (errorMsg) {
        errorMsg.classList.add('hidden');
        errorMsg.style.display = 'none';
      }

      const li = document.createElement('li');
      
      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;
      li.appendChild(span);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      li.appendChild(deleteBtn);

      list.appendChild(li);
      input.value = '';
      updateCounter();
    });
  }

  if (list) {
    list.addEventListener('click', (e) => {
      const target = e.target;
      const li = target.closest('li');
      if (!li) return;

      if (target.classList.contains('delete-btn') || target.tagName === 'BUTTON') {
        li.remove();
        updateCounter();
      } else if (target.classList.contains('item-text') || target === li || target.tagName === 'SPAN') {
        li.classList.toggle('completed');
        updateCounter();
      }
    });
  }

  // Filters support
  const filters = document.querySelectorAll('.filter-btn, [data-filter]');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || btn.textContent.toLowerCase();
      
      if (!list) return;
      const items = list.querySelectorAll('li');
      items.forEach(li => {
        const isCompleted = li.classList.contains('completed');
        if (filter.includes('active')) {
          li.style.display = isCompleted ? 'none' : '';
        } else if (filter.includes('completed')) {
          li.style.display = isCompleted ? '' : 'none';
        } else {
          li.style.display = '';
        }
      });
    });
  });
});