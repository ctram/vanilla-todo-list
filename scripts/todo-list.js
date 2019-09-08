console.log('todo list ran')

const todoListData = {};
const todoListHookId = 'todo-list-hook';
const inputTodoItemId = 'input-todo-item';
const state = {
  filter: 'all'
};

function addTodoItem(e) {
  e.preventDefault();
  const inputTodoItemEl = document.getElementById(inputTodoItemId);

  const { value } = inputTodoItemEl;

  if (!value) {
    return;
  }

  const item = { completed: false, value };
  const id = Math.random();
  todoListData[id] = item;
  inputTodoItemEl.value = '';
  renderTodoList();
}

function toggleCompletion(id) {
  let item = todoListData[id];
  todoListData[id] = { ...item, completed: !item.completed };
  renderTodoList();
}

function deleteTodoItem(id) {
  delete todoListData[id];
  renderTodoList();
}

function renderTodoList() {
  const hookEl = document.getElementById(todoListHookId);
  const children = hookEl.childNodes;

  for (let i = 0; i < children.length; i++) {
    hookEl.removeChild(children[i]);
  }

  const listEl = document.createElement('ul');
  hookEl.appendChild(listEl);

  for (let id in todoListData) {
    const item = todoListData[id];
    renderTodoItem(id, todoListData[id], listEl);
  }
}

function renderTodoItem(id, item, todoListElement) {
  const { filter } = state;
  const itemFilterValue = item.completed ? 'completed' : 'incompleted';

  if (filter !== 'all' && itemFilterValue !== filter) {
    return;
  }

  const todoItemElement = document.createElement('li');

  let cssClass = 'hover';
  cssClass += item.completed ? ' completed' : '';

  const markup = `
    <li>
      <span class="${cssClass}" onclick="toggleCompletion(${id})">${item.value}</span>
      <button onclick="deleteTodoItem(${id})">Delete</button>
    </li>
  `;

  todoItemElement.innerHTML = markup;
  todoListElement.appendChild(todoItemElement);
}

function changeFilter(e) {
  state.filter = e.target.value;
  renderTodoList();
}

renderTodoList('todo-list-hook');
