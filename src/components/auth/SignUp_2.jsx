import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/청춘스케치.svg";

export default function SignUp_2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthDate: "",
    job: "",
    region: "",
    incomeLevel: "",
    employmentStatus: "",
    interests: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 실시간 유효성 검사
    const newErrors = { ...errors };
    
    if (name === "birthDate") {
      // 생년월일 형식 검사 (YYYY/MM/DD)
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (value && !dateRegex.test(value)) {
        newErrors.birthDate = "생년월일 양식이 맞지 않습니다.";
      } else {
        newErrors.birthDate = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 전체 유효성 검사
    const newErrors = {};
    
    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    } else {
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!dateRegex.test(formData.birthDate)) {
        newErrors.birthDate = "생년월일 양식이 맞지 않습니다.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 || Object.values(newErrors).every(error => !error)) {
      try {
        // ERD에 맞춰 백엔드로 전송할 데이터 구성
        const userData = {
          login_id: localStorage.getItem('tempUserId') || 'kakao_user', // 임시 저장된 아이디 또는 카카오 사용자
          password: localStorage.getItem('tempPassword') || 'kakao_auth', // 임시 저장된 비밀번호 또는 카카오 인증
          name: localStorage.getItem('tempNickname') || formData.job, // 닉네임 또는 직업
          birth: formData.birthDate.replace(/\//g, '-'), // YYYY-MM-DD 형식으로 변환
          location: formData.region, // 지역
          organization_status: formData.employmentStatus === '학생' ? 0 : 1, // 학생(0) | 직장인(1)
          financial_status: parseInt(formData.incomeLevel) || 0, // 소득 수준
          goal: parseInt(formData.interests) || 0, // 목표: 취업(0) | 창업(1) | 이직(2)
          created_at: new Date().toISOString().split('T')[0] // 현재 날짜
        };

        console.log('백엔드로 전송할 데이터:', userData);

        // 백엔드 API 호출
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('회원가입 성공:', result);
          
          // 임시 저장된 데이터 삭제
          localStorage.removeItem('tempUserId');
          localStorage.removeItem('tempPassword');
          localStorage.removeItem('tempNickname');
          
          // 로그인 성공 페이지로 이동
          navigate('/LoginSuccess');
        } else {
          const errorData = await response.json();
          console.error('회원가입 실패:', errorData);
          alert('회원가입에 실패했습니다: ' + (errorData.message || '알 수 없는 오류'));
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSkip = () => {
    console.log("건너뛰기 선택");
    navigate('/LoginSuccess');
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

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col space-y-1"
          style={{ maxWidth: "22.5rem" }}
        >
          {/* 생년월일 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              생년월일
            </label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              placeholder="생년월일을 입력해주세요. 예시) 2000/01/01"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            />
            <div className="h-5 flex items-center justify-end">
              {errors.birthDate && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.birthDate}</p>
              )}
            </div>
          </div>

          {/* 직업 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              직업
            </label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              placeholder="직업을 입력해주세요. 예시) 학생"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            />
            <div className="h-5 flex items-center justify-end">
              {errors.job && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.job}</p>
              )}
            </div>
          </div>

          {/* 지역 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              지역
            </label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="지역을 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            />
            <div className="h-5 flex items-center justify-end">
              {errors.region && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.region}</p>
              )}
            </div>
          </div>

          {/* 소득 수준 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              소득 수준
            </label>
            <select
              name="incomeLevel"
              value={formData.incomeLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            >
              <option value="">소득 수준을 선택해주세요</option>
              <option value="1">100만원 미만</option>
              <option value="2">100-200만원</option>
              <option value="3">200-300만원</option>
              <option value="4">300-400만원</option>
              <option value="5">400만원 이상</option>
            </select>
            <div className="h-5 flex items-center justify-end">
              {errors.incomeLevel && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.incomeLevel}</p>
              )}
            </div>
          </div>

          {/* 고용상태 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              고용상태
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            >
              <option value="">고용상태를 선택해주세요</option>
              <option value="학생">학생</option>
              <option value="직장인">직장인</option>
            </select>
            <div className="h-5 flex items-center justify-end">
              {errors.employmentStatus && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.employmentStatus}</p>
              )}
            </div>
          </div>

          {/* 관심 분야 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
            }}>
              목표
            </label>
            <select
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            >
              <option value="">목표를 선택해주세요</option>
              <option value="0">취업</option>
              <option value="1">창업</option>
              <option value="2">이직</option>
            </select>
            <div className="h-5 flex items-center justify-end">
              {errors.interests && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{errors.interests}</p>
              )}
            </div>
          </div>

          {/* 등록하기 버튼 */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition-colors mt-6 text-white cursor-pointer"
            style={{
              backgroundColor: '#13D564'
            }}
          >
            등록하기
          </button>

          {/* 건너뛰기 링크 */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center py-2 text-green-600 hover:text-green-700 transition-colors"
          >
            건너뛰기
          </button>
        </form>
      </div>
    </div>
  );
}
