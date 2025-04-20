import React from 'react';

interface LoginButtonProps {
  username: string;
  password: string;
  onSuccess: (username: string) => void; // Pass the username to the parent on success
}

const LoginButton: React.FC<LoginButtonProps> = ({ username, password, onSuccess }) => {
  const handleLoginClick = async () => {
    console.log('Login button clicked username:', username, 'password:', password);
    try {
      const response = await fetch('https://workouttracker.publicvm.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        console.log('Login successful');
        onSuccess(username); // Pass the username to the parent component
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLoginClick}
      style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
    >
      Login
    </button>
  );
};

export default LoginButton;
