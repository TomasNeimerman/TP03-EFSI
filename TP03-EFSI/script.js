let projects = [];

function addProject() {
  const projectName = document.getElementById('projectName').value;
  const projectDescription = document.getElementById('projectDescription').value;
  if (projectName.trim() !== '') {
    const project = {
      name: projectName,
      description: projectDescription,
      tasks: []
    };
    projects.push(project);
    renderProjects();
  }
}

function renderProjects() {
  const projectSelect = document.getElementById('projectSelect');
  const searchProjectSelect = document.getElementById('searchProjectSelect');
  projectSelect.innerHTML = '';
  searchProjectSelect.innerHTML = '';
  projects.forEach((project, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = project.name;
    projectSelect.appendChild(option);
    const option2 = document.createElement('option');
    option2.value = index;
    option2.text = project.name;
    searchProjectSelect.appendChild(option2);
  });
}

function addTask() {
  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDate = document.getElementById('taskDueDate').value;
  const projectIndex = document.getElementById('projectSelect').value;
  if (taskDescription.trim() !== '') {
    const task = {
      description: taskDescription,
      dueDate: taskDueDate,
      completed: false
    };
    projects[projectIndex].tasks.push(task);
    renderTasks(projectIndex);
  }
}

function renderTasks(projectIndex) {
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = '';
  projects[projectIndex].tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <input type="checkbox" id="task-${projectIndex}-${index}" ${task.completed ? 'checked' : ''} onchange="completeTask(${projectIndex}, ${index})">
      <label for="task-${projectIndex}-${index}" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.description} - Due Date: ${task.dueDate}</label>
      <button onclick="deleteTask(${projectIndex}, ${index})">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

function completeTask(projectIndex, taskIndex) {
  projects[projectIndex].tasks[taskIndex].completed = !projects[projectIndex].tasks[taskIndex].completed;
  renderTasks(projectIndex);
}

function deleteTask(projectIndex, taskIndex) {
  projects[projectIndex].tasks.splice(taskIndex, 1);
  renderTasks(projectIndex);
}

function searchTasksByDueDate() {
  const searchDueDate = document.getElementById('searchDueDate').value;
  const projectIndex = document.getElementById('searchProjectSelect').value;
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = '';
  projects[projectIndex].tasks.forEach((task, index) => {
    if (task.dueDate === searchDueDate) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
        <label>${task.description} - Due Date: ${task.dueDate}</label>
      `;
      tasksContainer.appendChild(taskElement);
    }
  });
}
