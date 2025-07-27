import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');

  const handleSwitch = (newMode) => {
    navigate(`/auth?mode=${newMode}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => handleSwitch('signin')}>Sign In</button>
        <button onClick={() => handleSwitch('signup')}>Sign Up</button>
      </div>

      {mode === 'signin' && <SignIn />}
      {mode === 'signup' && <SignUp />}
      {!mode && <p>Please select a mode using the buttons above or add ?mode=signin/signup to the URL.</p>}
    </div>
  );
};

export default Auth;
