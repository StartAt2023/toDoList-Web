import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export interface Task {
  taskId: number;
  title: string;
  assignee: string;
  startTime: string;
  endTime: string;
  description?: string;
  completed: boolean;
  priority: number;
  type: 'family'|'study'|'work'|'other';
  createdAt?: string;
}

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchTasks() {
  const res = await axios.get(`${API_BASE}/users/tasks`, { headers: getAuthHeader() });
  return (res.data as { tasks: Task[] }).tasks;
}

export async function addTask(task: Omit<Task, 'taskId'|'completed'|'createdAt'>) {
  const res = await axios.post(`${API_BASE}/users/tasks`, task, { headers: getAuthHeader() });
  return (res.data as { task: Task }).task;
}

export async function updateTask(taskId: number, updates: Partial<Task>) {
  const res = await axios.put(`${API_BASE}/users/tasks/${taskId}`, updates, { headers: getAuthHeader() });
  return (res.data as { task: Task }).task;
}

export async function deleteTask(taskId: number) {
  await axios.delete(`${API_BASE}/users/tasks/${taskId}`, { headers: getAuthHeader() });
}

// 新增用户相关API
export async function loginUser(data: { username?: string; email?: string; password: string }) {
  const res = await axios.post(`${API_BASE}/users/login`, data);
  return res.data;
}

export async function registerUser(data: {
  salutation: string;
  gender: string;
  birthdate: string;
  username: string;
  email: string;
  phoneCode: string;
  phone: string;
  password: string;
}) {
  const res = await axios.post(`${API_BASE}/users/register`, data);
  return res.data;
} 