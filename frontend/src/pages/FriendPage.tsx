import React, { useState, useEffect } from 'react';
import { GradientBg } from './MainPage.styles';
import NavBar from '../components/NavBar';
import { getUserProfile } from '../api/taskApi';

const FriendPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('User');

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
    <GradientBg style={{alignItems:'center',justifyContent:'center'}}>
      <NavBar onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
      <div style={{marginTop:120,color:'#fff',fontSize:'1.5rem',fontWeight:700}}>Friend feature developing...</div>
    </GradientBg>
  );
};

export default FriendPage; 