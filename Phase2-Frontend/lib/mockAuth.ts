// Mock authentication implementation for local development
// This simulates auth responses when the backend is not available

export interface MockAuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

// Mock sign in function
export const mockSignIn = async (email: string, password: string): Promise<MockAuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password) {
        reject(new Error('Email and password are required'));
        return;
      }

      // In a real scenario, you would validate credentials
      // For mock purposes, we'll accept any non-empty email/password
      const user = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Use part of email as name
      };

      // Generate a mock JWT token (simulated)
      const token = `mock_token_${email}_${Date.now()}`;

      // Store user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_name', user.name || email);

      resolve({
        user,
        token
      });
    }, 500); // Simulate network delay
  });
};

// Mock sign up function
export const mockSignUp = async (email: string, password: string, name: string): Promise<MockAuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (!email || !password || !name) {
        reject(new Error('Email, password, and name are required'));
        return;
      }

      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      const user = {
        id: (Math.floor(Math.random() * 1000)).toString(),
        email: email,
        name: name,
      };

      // Generate a mock JWT token (simulated)
      const token = `mock_token_${email}_${Date.now()}`;

      // Store user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_name', name);

      resolve({
        user,
        token
      });
    }, 600); // Simulate network delay
  });
};

// Mock sign out function
export const mockSignOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      resolve();
    }, 300); // Simulate network delay
  });
};