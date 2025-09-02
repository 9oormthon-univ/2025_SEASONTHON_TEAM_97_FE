import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from "../../assets/icons/청춘스케치.svg";
import { api } from '../../services/api.js';

export default function KakaoNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    if (nickname.length < 2 || nickname.length > 10) {
      setError('닉네임은 2자 이상 10자 이하여야 합니다.');
      return;
    }

    try {
      // 백엔드로 카카오 사용자 정보와 닉네임 전송
      const result = await api.post('/api/auth/kakao/complete', {
        nickname: nickname.trim()
      });
      
      if (result.success) {
        // 닉네임 저장 (SignUp_2에서 사용)
        localStorage.setItem('tempNickname', nickname.trim());
        localStorage.setItem('tempUserId', result.userId || 'kakao_user');
        localStorage.setItem('tempPassword', result.password || 'kakao_auth');
        localStorage.setItem('kakaoUserData', JSON.stringify(result.kakaoData));
        
        console.log('카카오 사용자 닉네임 설정 완료:', result);
        
        // SignUp_2로 이동
        navigate('/signup-2');
      } else {
        setError(result.message || '닉네임 설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 설정 오류:', error);
      
      // 임시 테스트용: 백엔드가 준비되지 않은 경우
      if (error.message.includes('404')) {
        console.log('백엔드 API가 준비되지 않음. 테스트 모드로 진행...');
        
        // 기존 카카오 사용자 데이터에 닉네임 추가
        const existingKakaoData = JSON.parse(
          localStorage.getItem('kakaoUserData') || '{}'
        );
        
        const updatedKakaoData = {
          ...existingKakaoData,
          nickname: nickname.trim()
        };
        
        // 닉네임 저장 (SignUp_2에서 사용)
        localStorage.setItem('tempNickname', nickname.trim());
        localStorage.setItem('kakaoUserData', JSON.stringify(updatedKakaoData));
        
        console.log('테스트 모드: 카카오 사용자 닉네임 설정 완료');
        
        // SignUp_2로 이동
        navigate('/signup-2');
      } else {
        setError('닉네임 설정 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F0F6F4]">
             {/* 메인 콘텐츠 영역 */}
       <div className="h-screen w-[480px] mx-auto flex flex-col items-center justify-center bg-[#F0F6F4]">
                 {/* 헤더 - 로고 */}
         <div className="text-center" style={{ position: "absolute", top: "3rem" }}>
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
           className="w-full flex flex-col"
           style={{ maxWidth: "22.5rem", marginTop: "8rem" }}
         >
          {/* 닉네임 입력 */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
              marginBottom: "0.25rem"
            }}>
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError(''); // 입력 시 에러 메시지 제거
              }}
              placeholder="닉네임을 입력해주세요."
              className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ 
                borderColor: '#13D564',
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem"
              }}
            />
            <div style={{ height: "1.25rem" }} className="flex items-center justify-end">
              {error && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{error}</p>
              )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            type="submit"
            className="w-full rounded-lg font-medium transition-colors text-white cursor-pointer"
            style={{
              backgroundColor: nickname.trim() ? '#13D564' : '#CCF3DB',
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              marginTop: "1.5rem"
            }}
            disabled={!nickname.trim()}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
