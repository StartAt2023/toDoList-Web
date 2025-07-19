import styled from 'styled-components';

export const FocusContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FocusCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
`;

export const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #2d3748;
  margin: 20px 0;
  font-family: 'Courier New', monospace;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatusText = styled.div`
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 30px;
  font-weight: 500;
`;

export const DurationSelector = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const DurationButton = styled.button<{ selected?: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e2e8f0'};
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#4a5568'};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#667eea';
      case 'secondary': return '#48bb78';
      case 'danger': return '#f56565';
      default: return '#667eea';
    }
  }};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  border-radius: 4px;
`;

export const MedalsSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #e2e8f0;
`;

export const MedalsTitle = styled.h3`
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

export const MedalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

export const MedalItem = styled.div<{ earned: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  background: ${props => props.earned ? 'rgba(102, 126, 234, 0.1)' : 'rgba(226, 232, 240, 0.5)'};
  border: 2px solid ${props => props.earned ? '#667eea' : '#e2e8f0'};
  opacity: ${props => props.earned ? 1 : 0.5};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const MedalIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  
  background: ${props => {
    switch (props.type) {
      case 'bronze': return 'linear-gradient(45deg, #cd7f32, #daa520)';
      case 'silver': return 'linear-gradient(45deg, #c0c0c0, #e5e4e2)';
      case 'gold': return 'linear-gradient(45deg, #ffd700, #ffed4e)';
      case 'platinum': return 'linear-gradient(45deg, #e5e4e2, #b4b4b4)';
      default: return '#e2e8f0';
    }
  }};
  color: ${props => props.type === 'silver' || props.type === 'platinum' ? '#2d3748' : 'white'};
`;

export const MedalLabel = styled.div`
  font-size: 0.8rem;
  color: #4a5568;
  text-align: center;
  font-weight: 500;
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

export const Notification = styled.div<{ type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'info': return '#4299e1';
      default: return '#48bb78';
    }
  }};
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`; 