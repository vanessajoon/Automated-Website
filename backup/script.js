const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const themeButton = document.getElementById("themeButton");

let tasks = [];

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task";

    li.innerHTML = `
      <button class="complete-button" aria-label="Complete task"></button>
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="delete-button" aria-label="Delete task">Delete</button>
    `;

    li.querySelector(".complete-button").addEventListener("click", function () {
      task.completed = !task.completed;
      renderTasks();
    });

    li.querySelector(".delete-button").addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
      renderTasks();
    });

    taskList.appendChild(li);
  });

  const total = tasks.length;
  taskCount.textContent = `${total} ${total === 1 ? "task" : "tasks"}`;
  emptyMessage.style.display = total === 0 ? "block" : "none";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  themeButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

renderTasks();
