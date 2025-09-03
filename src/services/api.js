// API 서비스 - HTTP 요청을 처리하는 함수들
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// 기본 fetch 설정
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// 응답 처리 함수
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json().catch(() => ({}));
  return data;
};

// GET 요청
export const api = {
  get: async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'GET',
    });
    return handleResponse(response);
  },

  // POST 요청
  post: async (endpoint, data, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // PUT 요청
  put: async (endpoint, data, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // DELETE 요청
  delete: async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // PATCH 요청
  patch: async (endpoint, data, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// 토큰 설정 함수
export const setAuthToken = (token) => {
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  } else {
    delete defaultOptions.headers.Authorization;
  }
};

// 기본 export
export default api;
