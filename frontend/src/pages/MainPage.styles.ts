import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme === 'light'
      ? 'linear-gradient(120deg, #f3f4f6 0%, #e5e7eb 100%)'
      : '#11131a'};
    background: ${props => props.theme === 'light'
      ? 'linear-gradient(120deg, #f3f4f6 0%, #e5e7eb 100%)'
      : 'linear-gradient(120deg, #181a20 0%, #23242b 100%)'};
  }
`;

export const GradientBg = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f857a6 0%, #ff5858 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

export const NavBar = styled.nav`
  width: 100%;
  height: 60px;
  background: rgba(30,32,40,0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  backdrop-filter: blur(12px);
`;
export const NavTitle = styled.div`
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
export const AddBtn = styled.button`
  background: linear-gradient(90deg, #ff9966 0%, #ff5e62 100%);
  color: #fff;
  font-size: 1.7rem;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #f857a6 0%, #ff5858 100%);
  }
`;
export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 500;
  margin-right: 24px;
`;
export const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
`;
export const LogoutBtn = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
    color: #fff;
  }
`;
export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 90px;
  position: relative;
`;
export const EmptyTip = styled.div`
  color: #b3b8c5;
  font-size: 1.2rem;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CreateTaskBtn = styled.button`
  margin-top: 32px;
  padding: 14px 36px;
  background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
`;
export const TaskList = styled.div`
  width: 100%;
  max-width: 100vw;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 16px;
`;
export const NoTasksText = styled.p`
  font-size: 1.35rem;
  font-weight: 700;
  color: #e0e7ff;
  margin-bottom: 18px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(60,72,88,0.10);
`;
export const NavBarDivider = styled.div`
  width: 100vw;
  height: 2px;
  background: linear-gradient(90deg, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.12) 100%);
  margin-top: 60px;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  backdrop-filter: blur(6px);
`;
export const SortBar = styled.div`
  position: absolute;
  top: 80px;
  right: 32px;
  z-index: 2;
  display: flex;
  gap: 12px;
`;
export const typeColor = {
  family: 'linear-gradient(120deg, #3b82f6 0%, #60a5fa 100%)',
  study: 'linear-gradient(120deg, #22c55e 0%, #4ade80 100%)',
  work: 'linear-gradient(120deg, #7c3aed 0%, #6366f1 100%)',
  other: 'linear-gradient(120deg, #6b7280 0%, #d1d5db 100%)',
};
export const TaskCard = styled.div<{type: keyof typeof typeColor, completed: boolean}>`
  min-width: 320px;
  max-width: 340px;
  background: ${({type}) => typeColor[type]};
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  padding: 28px 28px 20px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${({completed}) => completed ? 0.5 : 1};
  user-select: none;
`;
export const TaskTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
`;
export const TaskMeta = styled.div`
  color: #ffeedd;
  font-size: 1.05rem;
  margin-top: 6px;
`;
export const TaskDesc = styled.div`
  color: #fdf6f0;
  font-size: 1.05rem;
  margin-top: 10px;
`;
export const TaskActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 18px;
`;
export const ActionBtn = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalCard = styled.div`
  background: rgba(30,32,40,0.92);
  border-radius: 18px;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.25);
  padding: 32px 28px 24px 28px;
  min-width: 420px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(18px) saturate(1.5);
`;
export const ModalTitle = styled.div`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 18px;
`;
export const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
`;
export const ModalForm = styled.form`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
`;
export const ModalLabel = styled.label`
  color: #a5b4fc;
  font-size: 1.05rem;
  font-weight: 500;
`;
export const ModalInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  padding: 12px 16px;
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  font-size: 1.08rem;
  background: rgba(40,42,54,0.85);
  color: #fff;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  transition: border 0.2s, background 0.2s;
  outline: none;
  backdrop-filter: blur(8px);
  &::placeholder {
    color: #b3b8c5;
    opacity: 1;
  }
`;
export const ModalSelect = styled.select`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  padding: 12px 16px;
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  font-size: 1.08rem;
  background: rgba(40,42,54,0.85);
  color: #fff;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  transition: border 0.2s, background 0.2s;
  outline: none;
  backdrop-filter: blur(8px);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &::placeholder {
    color: #b3b8c5;
    opacity: 1;
  }
  &:focus {
    border: 1.5px solid #6366f1;
    background: rgba(60,62,74,0.95);
  }
  option {
    background: #23242b;
    color: #fff;
  }
`;
export const ModalTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  padding: 12px 16px;
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  font-size: 1.08rem;
  background: rgba(40,42,54,0.85);
  color: #fff;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  transition: border 0.2s, background 0.2s;
  outline: none;
  backdrop-filter: blur(8px);
  min-height: 60px;
  resize: vertical;
  &::placeholder {
    color: #b3b8c5;
    opacity: 1;
  }
`;
export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
`;
export const ModalBtn = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
  &:disabled {
    background: #4b5563;
    cursor: not-allowed;
  }
`;
export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ConfirmCard = styled.div`
  background: rgba(30,32,40,0.92);
  border-radius: 18px;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.25);
  padding: 32px 28px 24px 28px;
  min-width: 420px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(18px) saturate(1.5);
`;
export const ConfirmText = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
`;
export const NavLinkBtn = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 0 18px;
  height: 44px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
`;
export const UserNameBtn = styled.button`
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 0 18px;
  height: 44px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  margin-right: 8px;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
`;
// DailyMemoPage 样式
export const DatePicker = styled.input`
  margin: 24px 0 16px 0;
  padding: 12px 22px;
  border-radius: 12px;
  border: none;
  font-size: 1.13rem;
  background: rgba(255,255,255,0.10);
  color: #fff;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  outline: none;
  transition: box-shadow 0.18s, background 0.18s;
  &:focus {
    background: rgba(255,255,255,0.18);
    box-shadow: 0 4px 16px rgba(99,102,241,0.18);
  }
`;
export const TaskInputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`;
export const TaskInput = styled.input`
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  font-size: 1.08rem;
  width: 220px;
  background: rgba(255,255,255,0.10);
  color: #fff;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  outline: none;
  transition: box-shadow 0.18s, background 0.18s;
  &:focus {
    background: rgba(255,255,255,0.18);
    box-shadow: 0 4px 16px rgba(99,102,241,0.18);
  }
`;
export const AddTaskBtn = styled.button`
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  font-size: 1.3rem;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover { background: linear-gradient(90deg, #38f9d7 0%, #43e97b 100%); }
`;
export const TaskListCol = styled.div`
  width: 100%;
  max-width: 480px;
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const TaskItem = styled.div<{status: 'pending'|'completed'|'overdue'}>`
  background: ${({status}) => status==='completed' ? 'rgba(34,197,94,0.18)' : status==='overdue' ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.18)'};
  color: ${({status}) => status==='completed' ? '#22c55e' : status==='overdue' ? '#ef4444' : '#fff'};
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  padding: 18px 18px 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.12rem;
`;
export const TaskName = styled.span`
  flex: 1;
  font-weight: 600;
`;
export const TaskBtnGroup = styled.div`
  display: flex;
  gap: 10px;
`;
export const RoundBtn = styled.button<{color: string}>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({color}) => color};
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.10);
  transition: background 0.18s;
  &:hover { opacity: 0.85; }
`; 