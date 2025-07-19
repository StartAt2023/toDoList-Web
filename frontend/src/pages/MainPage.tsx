import React, { useState, useEffect } from 'react';
import {
  GradientBg, MainContainer, EmptyTip, CreateTaskBtn, TaskList, NoTasksText, SortBar, TaskCard, TaskTitle,
  TaskMeta, TaskDesc, TaskActions, ActionBtn, ModalOverlay, ModalCard, ModalTitle, FormRow, ModalForm,
  ModalLabel, ModalInput, ModalSelect, ModalTextarea, ModalActions, ModalBtn, ConfirmOverlay, ConfirmCard, ConfirmText, AddBtn
} from './MainPage.styles';
import NavBar from '../components/NavBar';
import { fetchTasks, addTask, deleteTask, updateTask, Task as ApiTask, getUserProfile } from '../api/taskApi';

const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    assignee: string;
    startTime: string;
    endTime: string;
    description: string;
    priority: number;
    type: 'family'|'study'|'work'|'other';
  }>({
    title: '',
    assignee: '',
    startTime: '',
    endTime: '',
    description: '',
    priority: 2,
    type: 'family',
  });
  const [confirm, setConfirm] = useState<{id: string, type: 'delete'|'complete', early?: boolean}|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [sortType, setSortType] = useState<'none'|'start'|'priority'>('none');

  useEffect(() => {
    fetchTasks().then(setTasks).catch(() => setTasks([]));
  }, []);

  function formatDate(dt: string) {
    if (!dt) return '';
    const d = new Date(dt);
    return d.toLocaleString();
  }
  function getDuration(start: string, end: string) {
    if (!start || !end) return '-';
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e) || e <= s) return '-';
    const diff = e - s;
    const min = Math.floor(diff / 60000);
    if (min < 60) return `${min} min`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hr ${min % 60} min`;
    const day = Math.floor(hr / 24);
    return `${day} d ${hr % 24} hr`;
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalData.title || !modalData.assignee || !modalData.startTime || !modalData.endTime) {
      setError('Please fill all required fields.');
      return;
    }
    if (new Date(modalData.startTime) >= new Date(modalData.endTime)) {
      setError('Start time must be before end time.');
      return;
    }
    try {
      await addTask({ ...modalData });
      setShowModal(false);
      setModalData({ title: '', assignee: '', startTime: '', endTime: '', description: '', priority: 2, type: 'family' });
      setError(null);
      const newTasks = await fetchTasks();
      setTasks(newTasks);
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(await fetchTasks());
      setConfirm(null);
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await updateTask(id, { completed: true });
      setTasks(await fetchTasks());
      setConfirm(null);
    } catch {
      setError('Failed to complete task.');
    }
  };

  const openComplete = (task: ApiTask) => {
    const now = new Date();
    const end = new Date(task.endTime);
    if (now < end) {
      setConfirm({ id: task._id || '', type: 'complete', early: true });
    } else {
      setConfirm({ id: task._id || '', type: 'complete' });
    }
  };

  const sortTasks = (tasks: ApiTask[]) => {
    if (sortType === 'start') {
      return [...tasks].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }
    if (sortType === 'priority') {
      return [...tasks].sort((a, b) => a.priority - b.priority);
    }
    return tasks;
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <GradientBg>
        <NavBar
          onLogout={handleLogout}
        />
        <MainContainer style={{position:'relative'}}>
          {tasks.length === 0 && (
            <EmptyTip>
              <NoTasksText>No tasks yet</NoTasksText>
              <CreateTaskBtn onClick={() => setShowModal(true)}>Create your first task</CreateTaskBtn>
            </EmptyTip>
          )}
          {tasks.length > 0 && (
            <SortBar>
              <ActionBtn style={{minWidth: 120, fontWeight: sortType==='start'?800:500}} onClick={()=>setSortType(sortType==='start'?'none':'start')}>Sort by Start</ActionBtn>
              <ActionBtn style={{minWidth: 120, fontWeight: sortType==='priority'?800:500}} onClick={()=>setSortType(sortType==='priority'?'none':'priority')}>Sort by Priority</ActionBtn>
              <AddBtn title="Add Task" onClick={() => setShowModal(true)} style={{marginLeft: 8}}>+</AddBtn>
            </SortBar>
          )}
          <TaskList>
            {sortTasks(tasks).map((task, idx) => (
              <TaskCard
                key={task._id}
                type={task.type}
                completed={task.completed}
                draggable
                onDragStart={() => {}}
                onDragOver={e => { e.preventDefault(); }}
                onDrop={() => {}}
                onDragEnd={() => {}}
              >
                <TaskTitle>{task.title}</TaskTitle>
                <TaskMeta>Assignee: {task.assignee}</TaskMeta>
                <TaskMeta>Type: {task.type.charAt(0).toUpperCase() + task.type.slice(1)}</TaskMeta>
                <TaskMeta>Start: {formatDate(task.startTime)}</TaskMeta>
                <TaskMeta>End: {formatDate(task.endTime)}</TaskMeta>
                <TaskMeta>Duration: {getDuration(task.startTime, task.endTime)}</TaskMeta>
                <TaskDesc>{task.description}</TaskDesc>
                <TaskActions>
                  {!task.completed && <ActionBtn onClick={() => openComplete(task)}>Complete</ActionBtn>}
                  <ActionBtn onClick={() => setConfirm({ id: task._id || '', type: 'delete' })}>Delete</ActionBtn>
                </TaskActions>
              </TaskCard>
            ))}
          </TaskList>
        </MainContainer>
        {showModal && (
          <ModalOverlay>
            <ModalCard>
              <ModalTitle>Add New Task</ModalTitle>
              <ModalForm onSubmit={handleAdd}>
                <FormRow>
                  <ModalLabel>Task Name *</ModalLabel>
                  <ModalInput placeholder="Task name" value={modalData.title} onChange={e => setModalData({ ...modalData, title: e.target.value })} />
                </FormRow>
                <FormRow>
                  <ModalLabel>Assignee *</ModalLabel>
                  <ModalInput placeholder="Assignee" value={modalData.assignee} onChange={e => setModalData({ ...modalData, assignee: e.target.value })} />
                </FormRow>
                <FormRow>
                  <ModalLabel>Type *</ModalLabel>
                  <ModalSelect value={modalData.type} onChange={e => setModalData({ ...modalData, type: e.target.value as 'family'|'study'|'work'|'other' })}>
                    <option value="family">Family</option>
                    <option value="study">Study</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </ModalSelect>
                </FormRow>
                <FormRow>
                  <ModalLabel>Start Time *</ModalLabel>
                  <ModalInput type="datetime-local" value={modalData.startTime} onChange={e => setModalData({ ...modalData, startTime: e.target.value })} />
                </FormRow>
                <FormRow>
                  <ModalLabel>End Time *</ModalLabel>
                  <ModalInput type="datetime-local" value={modalData.endTime} onChange={e => setModalData({ ...modalData, endTime: e.target.value })} />
                </FormRow>
                <FormRow>
                  <ModalLabel>Priority *</ModalLabel>
                  <ModalSelect value={modalData.priority} onChange={e => setModalData({ ...modalData, priority: Number(e.target.value) })}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                    <option value={4}>Optional</option>
                  </ModalSelect>
                </FormRow>
                <FormRow>
                  <ModalLabel>Description</ModalLabel>
                  <ModalTextarea placeholder="Description (optional)" value={modalData.description} onChange={e => setModalData({ ...modalData, description: e.target.value })} />
                </FormRow>
                {error && <div style={{ color: '#ef4444', fontSize: '1rem', marginTop: 4 }}>{error}</div>}
                <ModalActions>
                  <ModalBtn type="button" onClick={() => { setShowModal(false); setError(null); }}>Cancel</ModalBtn>
                  <ModalBtn type="submit">Add</ModalBtn>
                </ModalActions>
              </ModalForm>
            </ModalCard>
          </ModalOverlay>
        )}
        {confirm && (
          <ConfirmOverlay>
            <ConfirmCard>
              <ConfirmText>
                {confirm.type === 'delete' && 'Are you sure you want to delete this task?'}
                {confirm.type === 'complete' && (confirm.early ? 'The task has not ended yet. Complete early?' : 'Mark this task as completed?')}
              </ConfirmText>
              <ModalActions>
                <ModalBtn type="button" onClick={() => setConfirm(null)}>Cancel</ModalBtn>
                {confirm.type === 'delete' && <ModalBtn type="button" onClick={() => handleDelete(confirm.id)}>Delete</ModalBtn>}
                {confirm.type === 'complete' && <ModalBtn type="button" onClick={() => handleComplete(confirm.id)}>Complete</ModalBtn>}
              </ModalActions>
            </ConfirmCard>
          </ConfirmOverlay>
        )}
      </GradientBg>
    </>
  );
};

export default MainPage; 