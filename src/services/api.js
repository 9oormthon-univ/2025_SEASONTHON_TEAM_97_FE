import { API_CONFIG, getApiUrl, getEndpoint } from '../config/api.js';

// Generic HTTP request function
const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const config = {
    ...API_CONFIG.REQUEST_CONFIG,
    ...options,
    headers: {
      ...API_CONFIG.REQUEST_CONFIG.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// HTTP methods
export const api = {
  // GET request
  get: (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'GET' });
  },
  
  // POST request
  post: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // PUT request
  put: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  // DELETE request
  delete: (endpoint, options = {}) => {
    return apiRequest(endpoint, { ...options, method: 'DELETE' });
  },
  
  // PATCH request
  patch: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// Auth API functions
export const authAPI = {
  // Login
  login: (credentials) => {
    return api.post(getEndpoint('LOGIN'), credentials);
  },
  
  // Signup
  signup: (userData) => {
    return api.post(getEndpoint('SIGNUP'), userData);
  },
  
  // Logout
  logout: () => {
    return api.post(getEndpoint('LOGOUT'));
  },
  
  // Kakao Login
  kakaoLogin: (code) => {
    return api.post(getEndpoint('KAKAO_LOGIN'), { code });
  },
  
  // Kakao Complete (닉네임 설정)
  kakaoComplete: (nickname) => {
    return api.post(getEndpoint('KAKAO_COMPLETE'), { nickname });
  },
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: () => {
    return api.get(getEndpoint('USER_PROFILE'));
  },
  
  // Update user profile
  updateProfile: (userData) => {
    return api.put(getEndpoint('USER_UPDATE'), userData);
  },
};

// Export helper functions
export { getApiUrl, getEndpoint };
