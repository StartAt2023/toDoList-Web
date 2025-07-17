import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { GradientBg, DatePicker, TaskInputRow, TaskInput, AddTaskBtn, TaskListCol, TaskItem, TaskName, TaskBtnGroup, RoundBtn } from './MainPage.styles';

interface MemoTask {
  id: string;
  name: string;
  completed: boolean;
}

const DailyMemoPage: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [tasks, setTasks] = useState<MemoTask[]>([]);

  const today = new Date();
  const isOverdue = (dateStr: string) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    d.setHours(23,59,59,999);
    return d < today;
  };

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), name: input.trim(), completed: false }]);
    setInput('');
  };
  const handleComplete = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
  const handleDelete = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <GradientBg>
      <NavBar userName="James Admin" onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
      <h2 style={{color:'#fff',marginTop:24,marginBottom:0,fontWeight:800,letterSpacing:1}}>Daily Memo</h2>
      <DatePicker type="date" value={date} onChange={e=>setDate(e.target.value)} />
      {date && (
        <TaskInputRow>
          <TaskInput placeholder="Add a task..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();handleAddTask();}}} />
          <AddTaskBtn onClick={handleAddTask}>+</AddTaskBtn>
        </TaskInputRow>
      )}
      <TaskListCol>
        {tasks.map(task => {
          let status: 'pending'|'completed'|'overdue' = 'pending';
          if (task.completed) status = 'completed';
          else if (isOverdue(date)) status = 'overdue';
          return (
            <TaskItem key={task.id} status={status}>
              <TaskName>{task.name}</TaskName>
              <TaskBtnGroup>
                {!task.completed && <RoundBtn color="#22c55e" title="Complete" onClick={()=>handleComplete(task.id)}>✓</RoundBtn>}
                <RoundBtn color="#ef4444" title="Delete" onClick={()=>handleDelete(task.id)}>×</RoundBtn>
              </TaskBtnGroup>
            </TaskItem>
          );
        })}
      </TaskListCol>
    </GradientBg>
  );
};

export default DailyMemoPage; 