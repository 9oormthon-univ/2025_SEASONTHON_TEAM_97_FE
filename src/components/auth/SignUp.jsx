import { useState, useEffect, useCallback } from "react";
import logoSvg from "../../assets/icons/청춘스케치.svg";

export default function SignUp() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [errors, setErrors] = useState({});
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState(null); // null: 검사 안함, true: 사용가능, false: 중복

  // 아이디 중복 검사 함수 (FastAPI)
  const checkIdDuplicateFastAPI = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/check-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.available; // true: 사용가능, false: 중복
      } else {
        throw new Error('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('아이디 중복 검사 오류:', error);
      throw error;
    }
  };

  // 아이디 중복 검사 함수 (Node.js)
  const checkIdDuplicateNodeJS = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/check-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_id: id }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.available; // true: 사용가능, false: 중복
      } else {
        throw new Error('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('아이디 중복 검사 오류:', error);
      throw error;
    }
  };

  // 디바운스된 아이디 중복 검사
  const debouncedIdCheck = useCallback(
    debounce(async (id) => {
      if (!id || id.length < 4) {
        setIdCheckResult(null);
        return;
      }

      setIsCheckingId(true);
      try {
        // FastAPI 사용 시
        const isAvailable = await checkIdDuplicateFastAPI(id);
        // Node.js 사용 시
        // const isAvailable = await checkIdDuplicateNodeJS(id);
        
        setIdCheckResult(isAvailable);
        
        // 에러 상태 업데이트
        setErrors(prev => ({
          ...prev,
          id: isAvailable ? "" : "이미 사용 중인 아이디입니다."
        }));
      } catch (error) {
        setIdCheckResult(null);
        setErrors(prev => ({
          ...prev,
          id: "아이디 중복 검사 중 오류가 발생했습니다."
        }));
      } finally {
        setIsCheckingId(false);
      }
    }, 500), // 500ms 디바운스
    []
  );

  // 디바운스 유틸리티 함수
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 아이디 유효성 검사 함수
  const validateId = (id) => {
    if (!id) return "아이디를 입력해주세요.";
    
    // 길이 검사
    if (id.length < 4 || id.length > 16) {
      return "아이디는 4자 ~ 16자로 입력해주세요.";
    }
    
    // 시작 문자 검사
    if (!/^[a-zA-Z]/.test(id)) {
      return "아이디는 영문자로 시작해야 합니다.";
    }
    
    // 사용 가능한 문자 검사
    if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
      return "아이디는 영문 대소문자, 숫자, 특수문자(_, -)만 사용 가능합니다.";
    }
    
    // 연속 특수문자 검사
    if (/\.\.|__/.test(id)) {
      return "연속된 특수문자(.., __)는 사용할 수 없습니다.";
    }
    
    return "";
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    
    // 길이 검사
    if (password.length < 8 || password.length > 20) {
      return "비밀번호는 8자 ~ 20자로 입력해주세요.";
    }
    
    // 사용 가능한 문자 검사
    if (!/^[a-zA-Z0-9!@#$%^&*()\-_=+[\]{};:,.<>?/]+$/.test(password)) {
      return "비밀번호는 영문 대소문자, 숫자, 특수문자만 사용 가능합니다.";
    }
    
    // 조합 규칙 검사 (3종류 이상)
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()\-_=+[\]{};:,.<>?/]/.test(password);
    
    const typeCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (typeCount < 3) {
      return "영문 대문자, 소문자, 숫자, 특수문자 중 3종류 이상을 포함해야 합니다.";
    }
    
    // 연속 문자 검사 (동일 문자 3회 이상 반복)
    if (/(.)\1{2,}/.test(password)) {
      return "동일한 문자를 3회 이상 연속 사용할 수 없습니다.";
    }
    
    // 키보드 연속 문자 검사
    const keyboardSequences = [
      '12345678', '23456789', '34567890',
      'qwertyui', 'wertyuio', 'ertyuiop',
      'asdfghjk', 'sdfghjkl', 'dfghjkl;',
      'zxcvbnm,', 'xcvbnm,.', 'cvbnm,./'
    ];
    
    for (const seq of keyboardSequences) {
      if (password.toLowerCase().includes(seq)) {
        return "키보드 연속 문자는 사용할 수 없습니다.";
      }
    }
    
    return "";
  };

  // 아이디와 비밀번호 유사성 검사
  const validatePasswordSimilarity = (password, id) => {
    if (!password || !id) return "";
    
    // 아이디가 비밀번호에 포함되어 있는지 검사
    if (password.toLowerCase().includes(id.toLowerCase())) {
      return "아이디와 동일하거나 유사한 비밀번호는 사용할 수 없습니다.";
    }
    
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 실시간 유효성 검사
    const newErrors = { ...errors };

    if (name === "id") {
      const validationError = validateId(value);
      newErrors.id = validationError;
      
      // 유효성 검사 통과 시에만 중복 검사 실행
      if (!validationError && value.length >= 4) {
        debouncedIdCheck(value);
      } else {
        setIdCheckResult(null);
      }
      
      // 아이디가 변경되면 비밀번호 유사성도 다시 검사
      if (formData.password) {
        newErrors.password = validatePasswordSimilarity(formData.password, value) || validatePassword(formData.password);
      }
    } else if (name === "password") {
      newErrors.password = validatePassword(value);
      if (formData.id) {
        const similarityError = validatePasswordSimilarity(value, formData.id);
        if (similarityError) {
          newErrors.password = similarityError;
        }
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "비밀번호가 동일하지 않습니다.";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 전체 유효성 검사
    const newErrors = {};
    
    newErrors.id = validateId(formData.id);
    newErrors.password = validatePassword(formData.password);
    
    if (formData.password) {
      const similarityError = validatePasswordSimilarity(formData.password, formData.id);
      if (similarityError) {
        newErrors.password = similarityError;
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 동일하지 않습니다.";
    }
    
    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }

    // 아이디 중복 검사 결과 확인
    if (idCheckResult === false) {
      newErrors.id = "이미 사용 중인 아이디입니다.";
    } else if (idCheckResult === null && formData.id) {
      newErrors.id = "아이디 중복 검사를 완료해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 || Object.values(newErrors).every(error => !error)) {
      console.log("회원가입 시도:", formData);
      // 여기에 회원가입 로직 추가
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F0F6F4]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-full pl-8 pr-8 flex flex-col items-center justify-center bg-[#F0F6F4]">
        {/* 헤더 - 로고 */}
        <div className="text-center mb-8 mt-12">
          <div
            className="flex flex-col justify-center flex-shrink-0 mx-auto"
            style={{
              width: "15.75rem", // 252px
              height: "2.875rem", // 46px
            }}
          >
            <img
              src={logoSvg}
              alt="청춘스케치"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4" style={{ maxWidth: "22.5rem" }}>
          {/* 아이디 입력 */}
          <div>
            <label className="block mb-2 text-center" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.75rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              아이디
            </label>
            <div className="relative">
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
                style={{ borderColor: '#13D564' }}
                required
              />
              {isCheckingId && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                </div>
              )}
              {idCheckResult === true && !isCheckingId && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
              )}
              {idCheckResult === false && !isCheckingId && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-red-600 text-sm">✗</span>
                </div>
              )}
            </div>
            {errors.id && (
              <p className="text-sm text-red-500 mt-1 text-right">{errors.id}</p>
            )}
            {idCheckResult === true && !errors.id && (
              <p className="text-sm text-green-600 mt-1 text-right">사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block mb-2 text-center" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.75rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
              style={{ borderColor: '#13D564' }}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1 text-right">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <label className="block mb-2 text-center" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.75rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
              style={{ borderColor: '#13D564' }}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1 text-right">{errors.confirmPassword}</p>
            )}
          </div>

          {/* 닉네임 입력 */}
          <div>
            <label className="block mb-2 text-center" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.75rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
              style={{ borderColor: '#13D564' }}
              required
            />
            {errors.nickname && (
              <p className="text-sm text-red-500 mt-1 text-right">{errors.nickname}</p>
            )}
          </div>

          {/* 다음 버튼 */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
