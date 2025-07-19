import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import {
  FocusContainer,
  FocusCard,
  TimerDisplay,
  StatusText,
  DurationSelector,
  DurationButton,
  ControlButtons,
  ControlButton,
  ProgressBar,
  ProgressFill,
  MedalsSection,
  MedalsTitle,
  MedalsGrid,
  MedalItem,
  MedalIcon,
  MedalLabel,
  StatsSection,
  StatCard,
  StatValue,
  StatLabel,
  Notification
} from './FocusPage.styles';
import {
  getFocusStatus,
  startFocus,
  pauseFocus,
  resumeFocus,
  terminateFocus,
  completeFocus,
  getMedals,
  getFocusHistory,
  FocusStatus,
  Medal,
  FocusSession
} from '../api/focusApi';
import { getUserProfile } from '../api/taskApi';

const FocusPage: React.FC = () => {
  const [focusStatus, setFocusStatus] = useState<FocusStatus | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [medals, setMedals] = useState<Medal[]>([]);
  const [history, setHistory] = useState<FocusSession[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const durations = [30, 60, 90, 120, 150, 180];

  // 加载初始数据
  useEffect(() => {
    loadFocusStatus();
    loadMedals();
    loadHistory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 计时器逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  // 加载Focus状态
  const loadFocusStatus = async () => {
    try {
      const status = await getFocusStatus();
      setFocusStatus(status);
      
      if (status.status === 'running') {
        setIsRunning(true);
        setTimeLeft(status.remainingTime * 60); // 转换为秒
      } else if (status.status === 'paused') {
        setTimeLeft(status.remainingTime * 60);
      } else {
        setTimeLeft(selectedDuration * 60);
      }
    } catch (error) {
      showNotification('Failed to load focus status', 'error');
    }
  };

  // 加载奖章
  const loadMedals = async () => {
    try {
      const response = await getMedals();
      setMedals(response.medals);
    } catch (error) {
      showNotification('Failed to load medals', 'error');
    }
  };

  // 加载历史记录
  const loadHistory = async () => {
    try {
      const response = await getFocusHistory();
      setHistory(response.sessions);
    } catch (error) {
      showNotification('Failed to load history', 'error');
    }
  };

  // 显示通知
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算进度
  const calculateProgress = (): number => {
    if (!focusStatus || focusStatus.status === 'idle') return 0;
    const totalSeconds = focusStatus.duration * 60;
    const elapsedSeconds = totalSeconds - timeLeft;
    return Math.min(100, (elapsedSeconds / totalSeconds) * 100);
  };

  // 开始Focus
  const handleStart = async () => {
    try {
      await startFocus(selectedDuration);
      await loadFocusStatus();
      showNotification('Focus session started!', 'success');
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Failed to start focus', 'error');
    }
  };

  // 暂停Focus
  const handlePause = async () => {
    try {
      await pauseFocus();
      setIsRunning(false);
      await loadFocusStatus();
      showNotification('Focus session paused', 'info');
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Failed to pause focus', 'error');
    }
  };

  // 恢复Focus
  const handleResume = async () => {
    try {
      await resumeFocus();
      setIsRunning(true);
      await loadFocusStatus();
      showNotification('Focus session resumed', 'success');
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Failed to resume focus', 'error');
    }
  };

  // 终止Focus
  const handleTerminate = async () => {
    try {
      await terminateFocus();
      setIsRunning(false);
      setTimeLeft(selectedDuration * 60);
      await loadFocusStatus();
      showNotification('Focus session terminated', 'info');
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Failed to terminate focus', 'error');
    }
  };

  // 完成Focus
  const handleComplete = async () => {
    try {
      const result = await completeFocus();
      setIsRunning(false);
      await loadFocusStatus();
      await loadMedals();
      
      if (result.newMedals.length > 0) {
        const medalNames = result.newMedals.map(m => m.type).join(', ');
        showNotification(`Congratulations! You earned ${medalNames} medal(s)!`, 'success');
      } else {
        showNotification('Focus session completed!', 'success');
      }
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Failed to complete focus', 'error');
    }
  };

  // 登出处理
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // 统计信息
  const totalSessions = history.length;
  const completedSessions = history.filter(s => s.status === 'completed').length;
  const totalFocusTime = history.reduce((sum, s) => sum + s.totalFocusTime, 0);

  // 奖章配置
  const medalConfigs = [
    { type: 'bronze', label: 'Bronze', duration: 30 },
    { type: 'silver', label: 'Silver', duration: 60 },
    { type: 'gold', label: 'Gold', duration: 120 },
    { type: 'platinum', label: 'Platinum', duration: 180 }
  ];

  return (
    <FocusContainer>
      <NavBar onLogout={handleLogout} />

      <FocusCard>
        <h1>Focus Timer</h1>
        
        <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
        
        <StatusText>
          {focusStatus?.status === 'idle' && 'Ready to focus'}
          {focusStatus?.status === 'running' && 'Focusing...'}
          {focusStatus?.status === 'paused' && 'Paused'}
        </StatusText>

        <ProgressBar>
          <ProgressFill progress={calculateProgress()} />
        </ProgressBar>

        {focusStatus?.status === 'idle' && (
          <DurationSelector>
            {durations.map(duration => (
              <DurationButton
                key={duration}
                selected={selectedDuration === duration}
                onClick={() => {
                  setSelectedDuration(duration);
                  setTimeLeft(duration * 60);
                }}
              >
                {duration}min
              </DurationButton>
            ))}
          </DurationSelector>
        )}

        <ControlButtons>
          {focusStatus?.status === 'idle' && (
            <ControlButton variant="primary" onClick={handleStart}>
              Start Focus
            </ControlButton>
          )}
          
          {focusStatus?.status === 'running' && (
            <>
              <ControlButton variant="secondary" onClick={handlePause}>
                Pause
              </ControlButton>
              <ControlButton variant="danger" onClick={handleTerminate}>
                Terminate
              </ControlButton>
            </>
          )}
          
          {focusStatus?.status === 'paused' && (
            <>
              <ControlButton variant="primary" onClick={handleResume}>
                Resume
              </ControlButton>
              <ControlButton variant="danger" onClick={handleTerminate}>
                Terminate
              </ControlButton>
            </>
          )}
        </ControlButtons>

        <StatsSection>
          <StatCard>
            <StatValue>{totalSessions}</StatValue>
            <StatLabel>Total Sessions</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{completedSessions}</StatValue>
            <StatLabel>Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalFocusTime}</StatValue>
            <StatLabel>Total Minutes</StatLabel>
          </StatCard>
        </StatsSection>

        <MedalsSection>
          <MedalsTitle>Your Medals</MedalsTitle>
          <MedalsGrid>
            {medalConfigs.map(config => {
              const earned = medals.some(m => m.type === config.type);
              return (
                <MedalItem key={config.type} earned={earned}>
                  <MedalIcon type={config.type}>
                    {config.type.charAt(0).toUpperCase()}
                  </MedalIcon>
                  <MedalLabel>{config.label}</MedalLabel>
                  <MedalLabel>{config.duration}min</MedalLabel>
                </MedalItem>
              );
            })}
          </MedalsGrid>
        </MedalsSection>
      </FocusCard>

      {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </FocusContainer>
  );
};

export default FocusPage; 