import { configureStore } from '@reduxjs/toolkit';

/**
 * Redux Store Configuration
 * Store simplificado para el proyecto de agentes IA
 * 
 * Por ahora sin reducers específicos - el estado se maneja
 * localmente en los componentes. Se puede expandir cuando sea necesario.
 */
export const store = configureStore({
  reducer: {
    // Los reducers se agregarán aquí cuando sean necesarios
    // Por ejemplo: agents, auth, ui, etc.
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
