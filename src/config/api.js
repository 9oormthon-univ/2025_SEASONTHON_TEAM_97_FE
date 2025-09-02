// API Configuration
export const API_CONFIG = {
  // Backend API Base URL
  BASE_URL: 'https://84e87d01-5c0b-4a05-a00d-c4f82bfa8a31.mock.pstmn.io',
  
  // API Endpoints
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    KAKAO_LOGIN: '/api/auth/kakao',
    KAKAO_COMPLETE: '/api/auth/kakao/complete',
    
    // User endpoints
    USER_PROFILE: '/user/profile',
    USER_UPDATE: '/user/update',
    
    // Add more endpoints as needed
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get endpoint by key
export const getEndpoint = (key) => {
  return API_CONFIG.ENDPOINTS[key] || key;
};
