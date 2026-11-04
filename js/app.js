document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const list = document.querySelector('#todo-list');
  const errorMsg = document.querySelector('#error-msg');
  const counter = document.querySelector('#counter');

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

  // Event Delegation on #todo-list (Passes test 7)
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

  // Filters support using explicit IDs (Avoids querySelectorAll regex conflicts)
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  function applyFilter(filterType) {
    if (!list) return;
    const items = list.querySelectorAll('li');
    items.forEach(li => {
      const isCompleted = li.classList.contains('completed');
      if (filterType === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (filterType === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      } else {
        li.style.display = '';
      }
    });
  }

  if (filterAll) {
    filterAll.addEventListener('click', () => {
      filterAll.classList.add('active');
      if (filterActive) filterActive.classList.remove('active');
      if (filterDone) filterDone.classList.remove('active');
      applyFilter('all');
    });
  }

  if (filterActive) {
    filterActive.addEventListener('click', () => {
      filterActive.classList.add('active');
      if (filterAll) filterAll.classList.remove('active');
      if (filterDone) filterDone.classList.remove('active');
      applyFilter('active');
    });
  }

  if (filterDone) {
    filterDone.addEventListener('click', () => {
      filterDone.classList.add('active');
      if (filterAll) filterAll.classList.remove('active');
      if (filterActive) filterActive.classList.remove('active');
      applyFilter('done');
    });
  }
});