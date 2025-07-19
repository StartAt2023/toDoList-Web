import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export interface FocusStatus {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'terminated';
  duration: number;
  totalFocusTime: number;
  remainingTime: number;
  startTime?: string;
  medals: Medal[];
}

export interface Medal {
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt: string;
  duration: number;
}

export interface FocusSession {
  _id: string;
  userId: string;
  duration: number;
  startTime?: string;
  endTime?: string;
  status: string;
  totalFocusTime: number;
  medals: Medal[];
  createdAt: string;
  updatedAt: string;
}

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 获取Focus状态
export async function getFocusStatus(): Promise<FocusStatus> {
  const res = await axios.get(`${API_BASE}/focus/status`, { headers: getAuthHeader() });
  return res.data as FocusStatus;
}

// 开始Focus
export async function startFocus(duration: number): Promise<{ message: string; focus: any }> {
  const res = await axios.post(`${API_BASE}/focus/start`, { duration }, { headers: getAuthHeader() });
  return res.data as { message: string; focus: any };
}

// 暂停Focus
export async function pauseFocus(): Promise<{ message: string; totalFocusTime: number; remainingTime: number }> {
  const res = await axios.post(`${API_BASE}/focus/pause`, {}, { headers: getAuthHeader() });
  return res.data as { message: string; totalFocusTime: number; remainingTime: number };
}

// 恢复Focus
export async function resumeFocus(): Promise<{ message: string; remainingTime: number }> {
  const res = await axios.post(`${API_BASE}/focus/resume`, {}, { headers: getAuthHeader() });
  return res.data as { message: string; remainingTime: number };
}

// 终止Focus
export async function terminateFocus(): Promise<{ message: string; totalFocusTime: number }> {
  const res = await axios.post(`${API_BASE}/focus/terminate`, {}, { headers: getAuthHeader() });
  return res.data as { message: string; totalFocusTime: number };
}

// 完成Focus
export async function completeFocus(): Promise<{ message: string; totalFocusTime: number; newMedals: Medal[] }> {
  const res = await axios.post(`${API_BASE}/focus/complete`, {}, { headers: getAuthHeader() });
  return res.data as { message: string; totalFocusTime: number; newMedals: Medal[] };
}

// 获取奖章历史
export async function getMedals(): Promise<{ medals: Medal[] }> {
  const res = await axios.get(`${API_BASE}/focus/medals`, { headers: getAuthHeader() });
  return res.data as { medals: Medal[] };
}

// 获取Focus历史记录
export async function getFocusHistory(): Promise<{ sessions: FocusSession[] }> {
  const res = await axios.get(`${API_BASE}/focus/history`, { headers: getAuthHeader() });
  return res.data as { sessions: FocusSession[] };
} 