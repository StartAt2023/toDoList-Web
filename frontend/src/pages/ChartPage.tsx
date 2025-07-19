import React, { useEffect, useState } from 'react';
import { GradientBg } from './MainPage.styles';
import NavBar from '../components/NavBar';
import { fetchAllDailyMemoStats, DailyMemoDayStat, getUserProfile } from '../api/taskApi';

const motivationalQuotes = [
  'Discipline is the bridge between goals and accomplishment.',
  'Success is the sum of small efforts repeated day in and day out.',
  'Every day is a new beginning.',
  'You are stronger than you think.',
  'Small progress is still progress.',
  'Believe in yourself.',
  'Do it today, not tomorrow.',
  'Failure is the mother of success.',
  'Face challenges bravely.',
  'Every step counts.',
  'Keep going, rewards will come.',
  'You are getting better every day.',
  'Don’t give up, the dawn is near.',
  'Self-discipline creates the life you want.',
  'Every effort deserves praise.',
  'The future is created by you.',
  'Trust the process.',
  'You are already amazing.',
  'Keep moving forward.',
  'Dreams reward those who work hard.',
  'Consistency is the key to success.',
  'Great things take time.',
  'Your potential is endless.',
  'Stay positive, work hard, make it happen.',
  'You can do hard things.',
  'Progress, not perfection.',
  'Your only limit is your mind.',
  'Push yourself, because no one else is going to do it for you.',
  'The best view comes after the hardest climb.',
  'You are your only competition.'
];

const ChartPage: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [stats, setStats] = useState<DailyMemoDayStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx(idx => (idx + 1) % motivationalQuotes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAllDailyMemoStats().then(s => setStats(s)).finally(() => setLoading(false));
  }, []);

  // 获取用户信息
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const user = await getUserProfile();
        setUserName(user.username);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };
    
    loadUserProfile();
  }, []);

  return (
    <GradientBg style={{alignItems:'center'}}>
      <NavBar onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
      <div style={{marginTop:60,marginBottom:32,minHeight:48,transition:'all 0.6s',fontSize:'1.5rem',fontWeight:800,letterSpacing:1,color:'#fff',textAlign:'center'}}>
        {motivationalQuotes[quoteIdx]}
      </div>
      <div style={{background:'rgba(30,32,40,0.98)',borderRadius:16,padding:36,minWidth:340,boxShadow:'0 4px 24px rgba(0,0,0,0.18)'}}>
        <h2 style={{color:'#fff',marginBottom:24}}>Daily Memo Completion Rate</h2>
        {loading ? <div style={{color:'#fff'}}>Loading...</div> :
          stats.length === 0 ? (
            <div style={{color:'#fff',fontWeight:600}}>No daily memo statistics yet.</div>
          ) : (
            <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
              {stats.map(d => (
                <div key={d.date} style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:18}}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle cx="60" cy="60" r="54" stroke="#22c55e" strokeWidth="12" fill="none" strokeDasharray={339.292} strokeDashoffset={339.292*(1-d.percent)} strokeLinecap="round" style={{transition:'stroke-dashoffset 1s'}} />
                  </svg>
                  <div style={{color:'#fff',marginTop:8,fontWeight:600}}>{d.date}</div>
                  <div style={{color:'#22c55e',fontWeight:700}}>{Math.round(d.percent*100)}%</div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </GradientBg>
  );
};

export default ChartPage; 