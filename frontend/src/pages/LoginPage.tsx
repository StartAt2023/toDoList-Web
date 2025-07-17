import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { loginUser } from '../api/taskApi';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #11131a;
  background: linear-gradient(120deg, #181a20 0%, #23242b 100%);
`;
const Card = styled.div`
  background: rgba(30, 32, 40, 0.55);
  padding: 64px 48px 48px 48px;
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(60,72,88,0.10);
  min-width: 420px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(18px) saturate(1.5);
`;
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: #fff;
  letter-spacing: 1.5px;
`;
const Toggle = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 1.05rem;
  cursor: pointer;
  margin-bottom: 18px;
  align-self: flex-end;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 1.08rem;
  color: #e5e7eb;
  margin-bottom: 7px;
  margin-top: 18px;
  font-weight: 500;
`;
const Input = styled.input`
  padding: 16px 18px;
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 14px;
  font-size: 1.08rem;
  margin-bottom: 4px;
  background: rgba(255,255,255,0.10);
  color: #fff;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  transition: border 0.2s, background 0.2s;
  outline: none;
  backdrop-filter: blur(8px);
  &:focus {
    border: 1.5px solid #6366f1;
    background: rgba(255,255,255,0.18);
  }
  &::placeholder {
    color: #b3b8c5;
    opacity: 1;
  }
`;
const Error = styled.span`
  color: #ef4444;
  font-size: 0.97rem;
  margin-bottom: 2px;
`;
const Submit = styled.button`
  margin-top: 32px;
  padding: 16px 0;
  background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
  color: #fff;
  font-size: 1.18rem;
  font-weight: 700;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.12);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c3aed 0%, #2563eb 100%);
  }
`;
const LinkRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 18px;
`;
const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #a5b4fc;
  font-size: 1.05rem;
  cursor: pointer;
  text-decoration: underline;
`;

type LoginForm = {
  username?: string;
  email?: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [useEmail, setUseEmail] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setApiError(null);
    try {
      const result = await loginUser(data) as { success?: boolean; error?: string; token?: string };
      if (!result.success && result.error) {
        setApiError(result.error || 'Login failed');
        return;
      }
      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      window.location.href = '/main';
    } catch (err: any) {
      setApiError('Network or server error');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Sign In</Title>
        <Toggle onClick={() => setUseEmail(e => !e)}>
          {useEmail ? 'Login with Username' : 'Login with Email'}
        </Toggle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {useEmail ? (
            <>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" {...register('email', { required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' } })} />
              {errors.email && <Error>{errors.email.message}</Error>}
            </>
          ) : (
            <>
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Enter your username" {...register('username', { required: 'Username is required' })} />
              {errors.username && <Error>{errors.username.message}</Error>}
            </>
          )}
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" {...register('password', { required: 'Password is required' })} />
          {errors.password && <Error>{errors.password.message}</Error>}
          {apiError && <Error style={{marginTop:8, marginBottom:8, textAlign:'center'}}>{apiError}</Error>}
          <Submit type="submit">Login</Submit>
        </Form>
        <LinkRow>
          <LinkBtn type="button" onClick={() => window.location.href = '/forgot-password'}>Forgot Password?</LinkBtn>
          <LinkBtn type="button" onClick={() => window.location.href = '/register'}>Sign Up</LinkBtn>
        </LinkRow>
      </Card>
    </Container>
  );
};

export default LoginPage; 