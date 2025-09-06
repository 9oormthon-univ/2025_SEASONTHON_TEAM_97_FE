// API 서비스 - HTTP 요청을 처리하는 함수들
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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

// 인증 API 함수들
export const authAPI = {
  // 회원가입
  signup: async (userData) => {
    try {
      console.log("=== authAPI.signup 호출 ===");
      console.log("전송할 데이터:", {
        loginId: userData.loginId,
        password: userData.password,
        name: userData.name,
        birth: userData.birth, // YYYY-MM-DD 형식
        location: userData.location,
        organizationStatus: userData.organizationStatus,
        financialStatus: userData.financialStatus,
        goal: userData.goal
      });
      
      const response = await api.post('/api/v1/signup', {
        loginId: userData.loginId,
        password: userData.password,
        name: userData.name,
        birth: userData.birth, // YYYY-MM-DD 형식
        location: userData.location,
        organizationStatus: userData.organizationStatus,
        financialStatus: userData.financialStatus,
        goal: userData.goal
      });
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } catch (error) {
      console.error("회원가입 API 호출 실패:", error);
      console.log("=== 실패한 요청 데이터 ===");
      console.log("URL:", `${BASE_URL}/api/v1/signup`);
      console.log("Method: POST");
      console.log("Headers:", { 'Content-Type': 'application/json' });
      console.log("Body:", JSON.stringify({
        loginId: userData.loginId,
        password: userData.password,
        name: userData.name,
        birth: userData.birth,
        location: userData.location,
        organizationStatus: userData.organizationStatus,
        financialStatus: userData.financialStatus,
        goal: userData.goal
      }, null, 2));
      
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 로그인
  login: async (loginData) => {
    try {
      const response = await api.post('/api/v1/login', {
        loginId: loginData.loginId,
        password: loginData.password
      });
      
      // 로그인 성공 시 토큰 저장
      if (response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        setAuthToken(response.data.accessToken);
      }
      
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } catch (error) {
      console.error("로그인 API 호출 실패:", error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    setAuthToken(null);
    return {
      success: true,
      message: '로그아웃되었습니다.'
    };
  },

  // 토큰 확인
  checkToken: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthToken(token);
      return true;
    }
    return false;
  },

  // 현재 로그인 상태 확인
  isLoggedIn: () => {
    return !!localStorage.getItem('accessToken');
  }
};

// 기본 export
export default api;
