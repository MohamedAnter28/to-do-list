// تحديد العناصر
const tasksList = document.getElementById('tasks-list');
const progressBar = document.getElementById('progress-bar');
const resetButton = document.getElementById('reset-btn');

// تحميل المهام المكتملة من LocalStorage
const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

// تحديث العرض عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  updateTasks();
  updateProgress();
});

// تحديث المهام عند الضغط
tasksList.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('task') ||
    e.target.classList.contains('subtask')
  ) {
    const taskId = e.target.dataset.taskId;
    if (completedTasks.includes(taskId)) {
      // إذا كانت مكتملة، قم بإزالتها
      completedTasks.splice(completedTasks.indexOf(taskId), 1);
      e.target.classList.remove('completed');
    } else {
      // إذا لم تكن مكتملة، أضفها
      completedTasks.push(taskId);
      e.target.classList.add('completed');
    }
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    updateProgress();
  }
});

// زر إعادة الضبط
resetButton.addEventListener('click', () => {
  completedTasks.length = 0; // إفراغ القائمة
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  updateTasks();
  updateProgress();
});

// تحديث المهام بناءً على المكتمل
function updateTasks() {
  document.querySelectorAll('.task, .subtask').forEach((task) => {
    const taskId = task.dataset.taskId;
    if (completedTasks.includes(taskId)) {
      task.classList.add('completed');
    } else {
      task.classList.remove('completed');
    }
  });
}

// تحديث شريط التقدم
function updateProgress() {
  const totalTasks = document.querySelectorAll('.task, .subtask').length;
  const completed = completedTasks.length;
  const percentage = Math.round((completed / totalTasks) * 100);

  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute('aria-valuenow', percentage);
  progressBar.textContent = `${percentage}%`;
}
