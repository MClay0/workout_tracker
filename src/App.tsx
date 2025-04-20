import React, { useState } from 'react';
import WorkoutList from './components/WorkoutList';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // Store the logged-in user's username

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username); // Set the logged-in user's username
  };

  return (
    <>
      {isLoggedIn ? (
        <WorkoutList username={currentUser} /> // Pass the username to WorkoutList
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;