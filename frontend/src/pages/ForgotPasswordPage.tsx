import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
`;
const Card = styled.div`
  background: #fff;
  padding: 48px 40px 36px 40px;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 72, 88, 0.12);
  min-width: 350px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a2233;
  letter-spacing: 1px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 1rem;
  color: #1a2233;
  margin-bottom: 6px;
  margin-top: 18px;
`;
const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 4px;
  background: #f9fafb;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #3b82f6;
    outline: none;
    background: #fff;
  }
`;
const Submit = styled.button`
  margin-top: 28px;
  padding: 12px 0;
  background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(60, 72, 88, 0.08);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
  }
`;
const LinkRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 18px;
`;
const LinkBtn = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-size: 0.97rem;
  cursor: pointer;
  text-decoration: underline;
`;

const ForgotPasswordPage: React.FC = () => {
  return (
    <Container>
      <Card>
        <Title>Forgot Password</Title>
        <Form>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
          <Submit type="submit">Send Reset Link</Submit>
        </Form>
        <LinkRow>
          <LinkBtn type="button" onClick={() => window.location.href = '/login'}>Back to Login</LinkBtn>
        </LinkRow>
      </Card>
    </Container>
  );
};

export default ForgotPasswordPage; 