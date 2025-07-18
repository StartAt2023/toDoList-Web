import React from 'react';
import { GradientBg } from './MainPage.styles';
import NavBar from '../components/NavBar';

const FriendPage: React.FC = () => (
  <GradientBg style={{alignItems:'center',justifyContent:'center'}}>
    <NavBar userName="User" onLogout={()=>{localStorage.clear();window.location.href='/login';}} />
    <div style={{marginTop:120,color:'#fff',fontSize:'1.5rem',fontWeight:700}}>Friend feature developing...</div>
  </GradientBg>
);

export default FriendPage; 