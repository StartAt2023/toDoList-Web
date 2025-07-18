import React, { useState, useRef } from 'react';
import { NavBar as StyledNavBar, NavTitle, NavActions, AddBtn, UserStatus, UserAvatar, NavLinkBtn } from '../pages/MainPage.styles';
import { Link, useNavigate } from 'react-router-dom';

interface NavBarProps {
  userName: string;
  onLogout: () => void;
  onAddTask?: () => void;
  onThemeChange?: () => void;
  children?: React.ReactNode;
}

const getInitials = (name: string) => {
  if (!name) return 'U';
  const letters = name.match(/[a-zA-Z]/g);
  return letters ? letters.slice(0,2).join('').toUpperCase() : 'U';
};

const NavBar: React.FC<NavBarProps> = ({ userName, onLogout, onAddTask, onThemeChange, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout|null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const showMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMenuOpen(true);
    setMenuVisible(true);
  };
  const hideMenu = () => {
    setMenuOpen(false);
    hideTimer.current = setTimeout(() => setMenuVisible(false), 1000);
  };
  const keepMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMenuOpen(true);
    setMenuVisible(true);
  };
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <StyledNavBar>
      <NavTitle>ToDoList</NavTitle>
      <NavActions>
        <Link to="/daily-memo" style={{textDecoration:'none'}}>
          <NavLinkBtn title="Daily Memo">Daily Memo</NavLinkBtn>
        </Link>
        <Link to="/main" style={{textDecoration:'none'}}>
          <NavLinkBtn title="Main">Main</NavLinkBtn>
        </Link>
        {onThemeChange && (
          <AddBtn title="Change Theme" onClick={onThemeChange} style={{marginRight: 8}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
          </AddBtn>
        )}
        <div style={{position:'relative',display:'flex',alignItems:'center',paddingRight:24}} // 增加padding保证头像不被裁剪
          onMouseEnter={showMenu} onMouseLeave={hideMenu}>
          <UserAvatar style={{cursor:'pointer'}}>{getInitials(userName)}</UserAvatar>
          {(menuOpen || menuVisible) && (
            <div
              onMouseEnter={keepMenu}
              onMouseLeave={hideMenu}
              style={{
                position:'absolute',
                top:54,
                right:0,
                minWidth:120,
                background:'rgba(30,32,40,0.98)',
                borderRadius:12,
                boxShadow:'0 4px 24px rgba(0,0,0,0.18)',
                zIndex:100,
                padding:'10px 0',
                display:'flex',
                flexDirection:'column',
                gap:0,
                opacity: menuOpen ? 1 : 0,
                transition: 'opacity 0.6s'
              }}
            >
              <div style={{padding:'10px 24px',color:'#fff',cursor:'pointer'}} onClick={()=>{setMenuOpen(false);setMenuVisible(false);navigate('/setting');}}>Setting</div>
              <div style={{padding:'10px 24px',color:'#fff',cursor:'pointer'}} onClick={()=>{setMenuOpen(false);setMenuVisible(false);navigate('/chart');}}>Chart</div>
              <div style={{padding:'10px 24px',color:'#fff',cursor:'pointer'}} onClick={()=>{setMenuOpen(false);setMenuVisible(false);navigate('/friend');}}>Friend</div>
              <div style={{padding:'10px 24px',color:'#ef4444',cursor:'pointer'}} onClick={()=>{setMenuOpen(false);setMenuVisible(false);onLogout();}}>Logout</div>
            </div>
          )}
        </div>
        {children}
      </NavActions>
    </StyledNavBar>
  );
};

export default NavBar; 