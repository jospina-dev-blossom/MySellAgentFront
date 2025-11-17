import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { AuthCredentials } from '@core/domain/entities';

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: '',
  });

  // Get the page the user was trying to access, or default to /customize
  const from = (location.state as { from?: Location })?.from?.pathname || '/customize';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await signUp(formData);
      } else {
        await signIn(formData);
      }
      // Redirect to the page they were trying to access, or /customize
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the hook
      console.error('Authentication error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return {
    formData,
    isSignUp,
    loading,
    error,
    handleSubmit,
    handleChange,
    toggleMode,
  };
};
