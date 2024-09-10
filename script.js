document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');

    // Carregar tema salvo
    const loadTheme = () => {
        const theme = localStorage.getItem('theme') || 'light-theme';
        document.body.classList.add(theme);
    };

    // Salvar tema
    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };

    // Alternar tema
    const toggleTheme = (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme);
        saveTheme(theme);
    };

    // Inicializar tema
    loadTheme();

    // Adicionar tarefa
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            ${taskText}
            <button class="delete-btn">❌</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        attachTaskEvents(li);
    };

    // Excluir tarefas e marcar como concluída
    const attachTaskEvents = (taskItem) => {
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const checkbox = taskItem.querySelector('.task-checkbox');

        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
        });

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });
    };

    // Adicionar evento ao botão de adicionar tarefa
    addTaskBtn.addEventListener('click', addTask);

    // Adicionar evento de tecla Enter no campo de entrada
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Alterar tema
    themeLightBtn.addEventListener('click', () => {
        toggleTheme('light-theme');
    });

    themeDarkBtn.addEventListener('click', () => {
        toggleTheme('dark-theme');
    });
});
