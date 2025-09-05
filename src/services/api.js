// API 서비스 - HTTP 요청을 처리하는 함수들
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://84e87d01-5c0b-4a05-a00d-c4f82bfa8a31.mock.pstmn.io';

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

// 정책 API 함수들
export const policyAPI = {
  // 맞춤 추천 정책 가져오기
  getRecommendedPolicies: async (userPreferences = {}) => {
    try {
      const response = await api.get('/api/policies/recommended', {
        ...userPreferences
      });
      return response;
    } catch (error) {
      console.error("맞춤 추천 정책 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 키워드별 정책 가져오기
  getPoliciesByKeyword: async (keyword) => {
    try {
      const response = await api.get(`/api/policies/search?keyword=${encodeURIComponent(keyword)}`);
      return response;
    } catch (error) {
      console.error("키워드별 정책 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 전체 정책 가져오기 (카테고리별)
  getAllPolicies: async (category = 'all', page = 1, limit = 10) => {
    try {
      const response = await api.get(`/api/policies?category=${category}&page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error("전체 정책 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 검색 결과 가져오기 (정책명, 정책설명, 키워드에서 검색)
  searchPolicies: async (searchTerm) => {
    try {
      // 정책명(plcyNm), 정책설명(plcyExplnCn), 키워드(plcyKywdNm)에서 모두 검색
      const response = await api.get(`/api/policies/search`, {
        params: {
          q: searchTerm,
          searchFields: ['plcyNm', 'plcyExplnCn', 'plcyKywdNm'] // 검색할 필드들 명시
        }
      });
      return response;
    } catch (error) {
      console.error("검색 정책 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 인기 검색어 가져오기 (조회수 기준)
  getPopularPolicies: async (limit = 4) => {
    try {
      const response = await api.get(`/api/policies/popular?limit=${limit}`);
      return response;
    } catch (error) {
      console.error("인기 정책 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  }
};

// 기본 export
export default api;
