import React from 'react';
import { NavBar as StyledNavBar, NavTitle, NavActions, AddBtn, UserStatus, UserAvatar, NavLinkBtn } from '../pages/MainPage.styles';
import { Link } from 'react-router-dom';

interface NavBarProps {
  userName: string;
  onLogout: () => void;
  onAddTask?: () => void;
  onThemeChange?: () => void;
  children?: React.ReactNode;
}

const getInitials = (name: string) => name ? name.replace(/[^a-zA-Z]/g, '').slice(0,2).toUpperCase() : 'U';

const NavBar: React.FC<NavBarProps> = ({ userName, onLogout, onAddTask, onThemeChange, children }) => (
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
      <UserStatus>
        <UserAvatar>{getInitials(userName)}</UserAvatar>
        <NavLinkBtn onClick={onLogout} title="Logout" aria-label="Logout" style={{padding:0, width:44, minWidth:44, justifyContent:'center'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 17l5-5-5-5"/>
            <path d="M21 12H9"/>
            <path d="M12 19v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2"/>
          </svg>
        </NavLinkBtn>
      </UserStatus>
      {children}
    </NavActions>
  </StyledNavBar>
);

export default NavBar; 