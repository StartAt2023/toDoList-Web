import React, { useState } from 'react';
import { GradientBg } from './MainPage.styles';
import NavBar from '../components/NavBar';

const SettingPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [remind, setRemind] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Saved! (Demo only)');
  };

  return (
    <GradientBg style={{alignItems:'center'}}>
      <NavBar userName="User" onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
      <div style={{marginTop:60, background:'rgba(30,32,40,0.98)', borderRadius:16, padding:36, minWidth:340, boxShadow:'0 4px 24px rgba(0,0,0,0.18)'}}>
        <h2 style={{color:'#fff',marginBottom:24}}>Settings</h2>
        <form onSubmit={handleSave} style={{display:'flex',flexDirection:'column',gap:18}}>
          <label style={{color:'#fff',fontWeight:600}}>Username
            <input value={username} onChange={e=>setUsername(e.target.value)} style={{marginTop:6,padding:10,borderRadius:8,border:'none',width:'100%'}} />
          </label>
          <label style={{color:'#fff',fontWeight:600}}>Email
            <input value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:6,padding:10,borderRadius:8,border:'none',width:'100%'}} />
          </label>
          <label style={{color:'#fff',fontWeight:600,display:'flex',alignItems:'center',gap:10}}>
            <input type="checkbox" checked={remind} onChange={e=>setRemind(e.target.checked)} />Email reminder
          </label>
          <label style={{color:'#fff',fontWeight:600}}>Change Password
            <input type="password" placeholder="Old password" value={password} onChange={e=>setPassword(e.target.value)} style={{marginTop:6,padding:10,borderRadius:8,border:'none',width:'100%'}} />
            <input type="password" placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} style={{marginTop:6,padding:10,borderRadius:8,border:'none',width:'100%'}} />
          </label>
          <button type="submit" style={{marginTop:12,padding:'12px 0',borderRadius:8,border:'none',background:'linear-gradient(90deg,#6366f1,#3b82f6)',color:'#fff',fontWeight:700,fontSize:'1.1rem'}}>Save</button>
          {msg && <div style={{color:'#22c55e',marginTop:8}}>{msg}</div>}
        </form>
      </div>
    </GradientBg>
  );
};

export default SettingPage; 