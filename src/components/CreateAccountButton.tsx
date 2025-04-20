import React from 'react';

interface CreateAccountButtonProps {
  username: string;
  password: string;
  onSuccess: (username: string) => void; // Pass the username to the parent on success
}

const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({ username, password, onSuccess }) => {
  const handleCreateAccountClick = async () => {
    console.log('Create Account button clicked');
    try {
        console.log('Creating account with username:', username, 'and password:', password);
      const response = await fetch('https://workouttracker.publicvm.com/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        console.log('Account created successfully');
        onSuccess(username); // Notify parent component of successful account creation and pass the username
      } else {
        alert(`Account creation failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred while creating the account. Please try again.');
    }
  };

  return (
    <button
      onClick={handleCreateAccountClick}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
      }}
    >
      Create Account
    </button>
  );
};

export default CreateAccountButton;
