import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { useLogin } from '@presentation/hooks/useLogin';
import './LoginPage.css';

export const LoginPage = () => {
  const {
    formData,
    // isSignUp,
    loading,
    error,
    handleSubmit,
    handleChange,
    // toggleMode,
  } = useLogin();

  return (
    <div className="login-page">
      <Link to="/" className="back-to-home">
        <ArrowLeft size={20} />
        Volver al inicio
      </Link>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <div className="login-logo">AI</div>
          <h1 className="login-title">
            {'Iniciar Sesión'}
            {/* {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'} */}
          </h1>
          <p className="login-subtitle">
            {'Accede a tu cuenta para continuar'}
            {/* {isSignUp
              ? 'Regístrate para comenzar a personalizar tu agente'
              : 'Accede a tu cuenta para continuar'} */}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? (
              'Procesando...'
            ) : (
              <>
                <LogIn size={20} />
                {'Iniciar Sesión'}
                {/* {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'} */}
              </>
            )}
          </button>
        </form>

        {/* <div className="login-footer">
          {isSignUp ? (
            <>
              ¿Ya tienes una cuenta?
              <button onClick={toggleMode}>
                Inicia sesión aquí
              </button>
            </>
          ) : (
            <>
              ¿No tienes una cuenta?
              <button onClick={toggleMode}>
                Regístrate aquí
              </button>
            </>
          )}
        </div> */}
      </motion.div>
    </div>
  );
};
