(function() {
  // DOM references
  const taskInput = document.getElementById('new-task');
  const addBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Data model
  let tasks = [];

  // Persistence
  function loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          tasks = parsed;
        }
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
        tasks = [];
      }
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }

  // Create a single task <li> element
  function createTaskElement(task) {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle';
    checkbox.dataset.id = task.id;
    if (task.completed) {
      checkbox.checked = true;
    }

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.dataset.id = task.id;
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.textContent = '✕';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
  }

  // Render all tasks
  function renderTasks() {
    // Clear existing list
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const taskEl = createTaskElement(task);
      taskList.appendChild(taskEl);
    });
  }

  // Add a new task
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }

  // Toggle completed state
  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    }
  }

  // Delete a task
  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  }

  // Event listeners
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Delegated listeners for toggle and delete actions
  taskList.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.toggle')) {
      const id = target.dataset.id;
      toggleTask(id);
    } else if (target.matches('.delete')) {
      const id = target.dataset.id;
      deleteTask(id);
    }
  });

  // Initialization
  loadTasks();
  renderTasks();

  // Optional export for other modules
  window.todoApp = {
    addTask,
    toggleTask,
    deleteTask,
    getTasks: () => tasks,
  };
})();