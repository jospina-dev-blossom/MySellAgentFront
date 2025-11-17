import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@infrastructure/config/firebase.config';
import type { User, AuthCredentials } from '@core/domain/entities';

// Transform Firebase User to our User entity
const transformUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null;

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
  };
};

export const authService = {
  // Sign in with email and password
  signIn: async (credentials: AuthCredentials): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = transformUser(userCredential.user);
      if (!user) throw new Error('Failed to authenticate user');
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      throw new Error(errorMessage);
    }
  },

  // Sign up with email and password
  signUp: async (credentials: AuthCredentials): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = transformUser(userCredential.user);
      if (!user) throw new Error('Failed to create user');
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
      throw new Error(errorMessage);
    }
  },

  // Sign out
  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      throw new Error(errorMessage);
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return transformUser(auth.currentUser);
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      callback(transformUser(firebaseUser));
    });
  },
};
