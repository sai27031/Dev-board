import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialTasks = {
  todo: [
    { id: 1, title: 'Design landing page', priority: 'High' },
    { id: 2, title: 'Set up database', priority: 'Medium' },
  ],
  inProgress: [
    { id: 3, title: 'Build login system', priority: 'High' },
  ],
  done: [
    { id: 4, title: 'Project setup', priority: 'Low' },
  ],
};

function TaskCard({ task, onDelete, onMove, column }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm mb-3 border border-gray-100 dark:border-gray-600">
      <div className="flex items-start justify-between mb-2">
        <p className="font-medium text-gray-800 dark:text-white">{task.title}</p>
        <button
          onClick={() => onDelete(column, task.id)}
          className="text-red-400 hover:text-red-600 text-sm ml-2"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          task.priority === 'High' ? 'bg-red-100 text-red-600' :
          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600'
        }`}>
          {task.priority}
        </span>

        <div className="flex gap-1">
          {column !== 'todo' && (
            <button
              onClick={() => onMove(column, task.id, 'back')}
              className="text-xs bg-gray-100 dark:bg-gray-600 dark:text-white hover:bg-gray-200 px-2 py-1 rounded"
            >
              ←
            </button>
          )}
          {column !== 'done' && (
            <button
              onClick={() => onMove(column, task.id, 'forward')}
              className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-blue-600"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Column({ title, tasks, color, column, onDelete, onMove }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${color}`}>
          {tasks.length}
        </span>
      </div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTask = () => {
    if (newTitle.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
    };
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));
    setNewTitle('');
    setNewPriority('Medium');
    setShowModal(false);
  };

  const handleDelete = (column, id) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(task => task.id !== id)
    }));
  };

  const handleMove = (column, id, direction) => {
    const columnOrder = ['todo', 'inProgress', 'done'];
    const currentIndex = columnOrder.indexOf(column);
    const targetColumn = direction === 'forward'
      ? columnOrder[currentIndex + 1]
      : columnOrder[currentIndex - 1];
    const task = tasks[column].find(t => t.id === id);
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== id),
      [targetColumn]: [...prev[targetColumn], task]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">DevBoard</h1>
        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <span className="text-gray-600 dark:text-gray-300">Hey, Developer 👋</span>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Projects</h2>
            <p className="text-gray-500 dark:text-gray-400">Track your tasks across all stages</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-3 gap-6">
          <Column title="📋 To Do" tasks={tasks.todo} color="bg-gray-400" column="todo" onDelete={handleDelete} onMove={handleMove} />
          <Column title="⚡ In Progress" tasks={tasks.inProgress} color="bg-yellow-400" column="inProgress" onDelete={handleDelete} onMove={handleMove} />
          <Column title="✅ Done" tasks={tasks.done} color="bg-green-500" column="done" onDelete={handleDelete} onMove={handleMove} />
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add New Task</h3>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full border border-gray-300 dark:border-gray-600 dark:text-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;