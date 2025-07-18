import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export interface Task {
  _id?: string;
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

export interface DailyMemoTask {
  name: string;
  completed: boolean;
}
export interface DailyMemoStats {
  tasks: DailyMemoTask[];
  total: number;
  completed: number;
  percent: number;
}

export interface DailyMemoDayStat {
  date: string;
  percent: number;
  total: number;
  completed: number;
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

export async function updateTask(_id: string, updates: Partial<Task>) {
  const res = await axios.put(`${API_BASE}/users/tasks/${_id}`, updates, { headers: getAuthHeader() });
  return (res.data as { task: Task }).task;
}

export async function deleteTask(_id: string) {
  await axios.delete(`${API_BASE}/users/tasks/${_id}`, { headers: getAuthHeader() });
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

export async function fetchDailyMemo(date: string): Promise<DailyMemoStats> {
  const res = await axios.get(`${API_BASE}/users/daily-memo?date=${date}`, { headers: getAuthHeader() });
  return res.data as DailyMemoStats;
}
export async function addDailyMemoTask(date: string, name: string): Promise<DailyMemoTask[]> {
  const res: any = await axios.post(`${API_BASE}/users/daily-memo`, { date, name }, { headers: getAuthHeader() });
  return res.data.tasks as DailyMemoTask[];
}
export async function updateDailyMemoTask(date: string, taskIdx: number, completed: boolean): Promise<DailyMemoTask[]> {
  const res: any = await axios.put(`${API_BASE}/users/daily-memo/${date}/${taskIdx}`, { completed }, { headers: getAuthHeader() });
  return res.data.tasks as DailyMemoTask[];
}
export async function deleteDailyMemoTask(date: string, taskIdx: number): Promise<DailyMemoTask[]> {
  const res: any = await axios.delete(`${API_BASE}/users/daily-memo/${date}/${taskIdx}`, { headers: getAuthHeader() });
  return res.data.tasks as DailyMemoTask[];
}

export async function fetchAllDailyMemoStats(): Promise<DailyMemoDayStat[]> {
  const res = await axios.get(`${API_BASE}/users/daily-memo/all`, { headers: getAuthHeader() });
  return (res.data as { stats: DailyMemoDayStat[] }).stats;
} 