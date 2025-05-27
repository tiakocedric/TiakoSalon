import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'stylist' | 'client';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, we would use Supabase auth
        // const { data: { session } } = await supabase.auth.getSession()
        
        // For now, check localStorage for a mock user
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, we would use Supabase auth
      // const { data: { user }, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // })
      
      // For demo purposes, mock the login for specific test accounts
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin' as const,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else if (email === 'stylist@example.com' && password === 'password') {
        const mockUser = {
          id: '2',
          email: 'stylist@example.com',
          name: 'Stylist User',
          role: 'stylist' as const,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else if (email === 'client@example.com' && password === 'password') {
        const mockUser = {
          id: '3',
          email: 'client@example.com',
          name: 'Client User',
          role: 'client' as const,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, we would use Supabase auth
      // const { data: { user }, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // })
      
      // Then create a profile with the name
      // await supabase.from('profiles').insert({
      //   id: user.id,
      //   name,
      //   role: 'client'
      // })
      
      // For demo purposes, mock the registration
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        role: 'client' as const,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // In a real app, we would use Supabase auth
    // await supabase.auth.signOut()
    
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}