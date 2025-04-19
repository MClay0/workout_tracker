import { useState } from 'react';
import WorkoutList from './components/WorkoutList';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set the user as logged in
  };

  const handleCreateAccount = () => {
    console.log('Creating account...');
    alert('Account created successfully!');
  };

  return (
    <>
      {isLoggedIn ? (
        <WorkoutList />
      ) : (
        <LoginPage onLogin={handleLogin}/>
      )}
    </>
  );
}

export default App;