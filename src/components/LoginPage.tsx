import React, { useState } from 'react';
import LoginButton from './LoginButton';
import CreateAccountButton from './CreateAccountButton';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAccountCreationSuccess = () => {
    alert('Account created successfully! You can now log in.');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ marginBottom: '25px' }}>
        <strong>Workout Tracker</strong>
      </h1>
      <h2>Login</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
      </div>
      <LoginButton username={username} password={password} onSuccess={onLogin} />
      <CreateAccountButton
        username={username}
        password={password}
        onSuccess={handleAccountCreationSuccess}
      />
      <p style={{ marginTop: '20px' }}>
        To Create an Account Enter a Username and Password then Click Create Account!
      </p>
    </div>
  );
};

export default LoginPage;