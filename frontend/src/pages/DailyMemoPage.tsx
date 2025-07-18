import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { GradientBg, DatePicker, TaskInputRow, TaskInput, AddTaskBtn, TaskListCol, TaskItem, TaskName, TaskBtnGroup, RoundBtn } from './MainPage.styles';
import { fetchDailyMemo, addDailyMemoTask, updateDailyMemoTask, deleteDailyMemoTask, DailyMemoTask, DailyMemoStats } from '../api/taskApi';

const DailyMemoPage: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<DailyMemoTask[]>([]);
  const [stats, setStats] = useState<DailyMemoStats|null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchDailyMemo(date).then(s => {
        setStats(s);
        setTasks(s.tasks);
      }).finally(() => setLoading(false));
    } else {
      setStats(null);
      setTasks([]);
    }
  }, [date]);

  const handleAddTask = async () => {
    if (!input.trim() || !date) return;
    const newTasks = await addDailyMemoTask(date, input.trim());
    setInput('');
    setTasks(newTasks);
    fetchDailyMemo(date).then(setStats);
  };
  const handleComplete = async (idx: number) => {
    if (!date) return;
    const newTasks = await updateDailyMemoTask(date, idx, true);
    setTasks(newTasks);
    fetchDailyMemo(date).then(setStats);
  };
  const handleUncomplete = async (idx: number) => {
    if (!date) return;
    const newTasks = await updateDailyMemoTask(date, idx, false);
    setTasks(newTasks);
    fetchDailyMemo(date).then(setStats);
  };
  const handleDelete = async (idx: number) => {
    if (!date) return;
    const newTasks = await deleteDailyMemoTask(date, idx);
    setTasks(newTasks);
    fetchDailyMemo(date).then(setStats);
  };

  return (
    <GradientBg>
      <NavBar userName="James Admin" onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
      <h2 style={{color:'#fff',marginTop:24,marginBottom:0,fontWeight:800,letterSpacing:1}}>Daily Memo</h2>
      <DatePicker type="date" value={date} min={todayStr} onChange={e=>setDate(e.target.value)} />
      {date && (
        <TaskInputRow>
          <TaskInput placeholder="Add a task..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();handleAddTask();}}} />
          <AddTaskBtn onClick={handleAddTask}>+</AddTaskBtn>
        </TaskInputRow>
      )}
      {stats && (
        <div style={{color:'#fff',marginBottom:12,fontWeight:600}}>
          Complete rate: {stats.total === 0 ? '0%' : `${Math.round(stats.percent*100)}%`}（{stats.completed}/{stats.total}）
        </div>
      )}
      <TaskListCol>
        {loading && <div style={{color:'#fff'}}>加载中...</div>}
        {tasks.map((task, idx) => {
          let status: 'pending'|'completed'|'overdue' = 'pending';
          if (task.completed) status = 'completed';
          else if (date && new Date(date) < today) status = 'overdue';
          return (
            <TaskItem key={idx} status={status}>
              <TaskName>{task.name}</TaskName>
              <TaskBtnGroup>
                {!task.completed && <RoundBtn color="#22c55e" title="Complete" onClick={()=>handleComplete(idx)}>✓</RoundBtn>}
                {task.completed && <RoundBtn color="#ef4444" title="Mark as not completed" onClick={()=>handleUncomplete(idx)} active={true}>×</RoundBtn>}
                <RoundBtn color="#23242b" title="Delete" onClick={()=>handleDelete(idx)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </RoundBtn>
              </TaskBtnGroup>
            </TaskItem>
          );
        })}
      </TaskListCol>
    </GradientBg>
  );
};

export default DailyMemoPage; 