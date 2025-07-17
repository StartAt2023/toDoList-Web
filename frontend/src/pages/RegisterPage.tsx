import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useForm } from 'react-hook-form';
import { registerUser } from '../api/taskApi';

const GlobalSelectStyle = createGlobalStyle`
  select, select option, select optgroup {
    background: rgba(30,32,40,0.95) !important;
    color: #fff !important;
  }
  select:focus, select:active {
    background: rgba(30,32,40,0.98) !important;
    color: #fff !important;
  }
  option {
    background: rgba(30,32,40,0.98) !important;
    color: #fff !important;
  }
`;

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
const Select = styled.select`
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
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
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
  justify-content: flex-end;
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
const CaptchaBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;
`;
const CaptchaImg = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  background: rgba(99,102,241,0.18);
  border-radius: 8px;
  padding: 8px 18px;
  letter-spacing: 3px;
  user-select: none;
  margin-right: 16px;
`;
const RefreshBtn = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: 4px;
`;

const countryCodes = [
  { code: '+1', label: 'US/Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+86', label: 'China (+86)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+82', label: 'Korea (+82)' },
  { code: '+852', label: 'Hong Kong (+852)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+7', label: 'Russia (+7)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+62', label: 'Indonesia (+62)' },
  { code: '+60', label: 'Malaysia (+60)' },
  // ... add more as needed
];

const salutations = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
const genders = ['Male', 'Female', 'Other'];

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let str = '';
  for (let i = 0; i < 5; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

type RegisterForm = {
  salutation: string;
  gender: string;
  birthdate: string;
  username: string;
  email: string;
  phoneCode: string;
  phone: string;
  password: string;
  captcha: string;
};

const RegisterPage: React.FC = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setApiError(null);
    if (data.captcha !== captcha) {
      setError('captcha', { type: 'manual', message: 'Captcha does not match' });
      setCaptcha(generateCaptcha());
      return;
    }
    setSubmitting(true);
    try {
      const result = await registerUser({
        salutation: data.salutation,
        gender: data.gender,
        birthdate: data.birthdate,
        username: data.username,
        email: data.email,
        phoneCode: data.phoneCode,
        phone: data.phone,
        password: data.password
      }) as { success?: boolean; error?: string };
      if (!result.success && result.error) {
        setApiError(result.error || 'Registration failed');
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      reset();
      window.location.href = '/login';
    } catch (err: any) {
      setApiError('Network or server error');
      setSubmitting(false);
    }
  };

  return (
    <>
      <GlobalSelectStyle />
      <Container>
        <Card>
          <Title>Sign Up</Title>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Label htmlFor="salutation">Salutation</Label>
            <Select id="salutation" {...register('salutation', { required: 'Salutation is required' })}>
              <option value="">Select</option>
              {salutations.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
            {errors.salutation && <Error>{errors.salutation.message}</Error>}

            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" {...register('gender', { required: 'Gender is required' })}>
              <option value="">Select</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </Select>
            {errors.gender && <Error>{errors.gender.message}</Error>}

            <Label htmlFor="birthdate">Birthdate</Label>
            <Input id="birthdate" type="date" {...register('birthdate', { required: 'Birthdate is required' })} max={new Date().toISOString().split('T')[0]} />
            {errors.birthdate && <Error>{errors.birthdate.message}</Error>}

            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter your username" {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'At least 3 characters' }, maxLength: { value: 20, message: 'At most 20 characters' }, pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers, and _' } })} />
            {errors.username && <Error>{errors.username.message}</Error>}

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" {...register('email', { required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' } })} />
            {errors.email && <Error>{errors.email.message}</Error>}

            <Label htmlFor="phone">Phone Number</Label>
            <div style={{ display: 'flex', gap: 8 }}>
              <Select style={{ width: 120 }} {...register('phoneCode', { required: 'Country code required' })}>
                <option value="">Code</option>
                {countryCodes.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
              </Select>
              <Input style={{ flex: 1 }} id="phone" type="tel" placeholder="Phone number" {...register('phone', { required: 'Phone number required', pattern: { value: /^[0-9]{6,16}$/, message: '6-16 digits' } })} />
            </div>
            {(errors.phoneCode || errors.phone) && <Error>{errors.phoneCode?.message || errors.phone?.message}</Error>}

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' }, maxLength: { value: 32, message: 'At most 32 characters' }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{6,32}$/, message: 'Must contain letters and numbers' } })} />
            {errors.password && <Error>{errors.password.message}</Error>}

            <Label htmlFor="captcha">Captcha</Label>
            <CaptchaBox>
              <CaptchaImg>{captcha}</CaptchaImg>
              <RefreshBtn type="button" onClick={() => setCaptcha(generateCaptcha())}>↻</RefreshBtn>
              <Input style={{ width: 120, marginLeft: 12 }} id="captcha" type="text" placeholder="Enter" maxLength={5} {...register('captcha', { required: 'Captcha required', minLength: { value: 5, message: '5 chars' }, maxLength: { value: 5, message: '5 chars' } })} />
            </CaptchaBox>
            {errors.captcha && <Error>{errors.captcha.message}</Error>}

            {apiError && <Error style={{marginTop:8, marginBottom:8, textAlign:'center'}}>{apiError}</Error>}
            <Submit type="submit" disabled={submitting}>{submitting ? 'Registering...' : 'Register'}</Submit>
          </Form>
          <LinkRow>
            <LinkBtn type="button" onClick={() => window.location.href = '/login'}>Back to Login</LinkBtn>
          </LinkRow>
        </Card>
      </Container>
    </>
  );
};

export default RegisterPage; 