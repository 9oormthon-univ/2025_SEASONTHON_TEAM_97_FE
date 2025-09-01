import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from "../../assets/icons/청춘스케치.svg";

export default function KakaoNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    if (nickname.length < 2 || nickname.length > 10) {
      setError('닉네임은 2자 이상 10자 이하여야 합니다.');
      return;
    }

    // 닉네임 저장 (SignUp_2에서 사용)
    localStorage.setItem('tempNickname', nickname);
    localStorage.setItem('tempUserId', 'kakao_user');
    localStorage.setItem('tempPassword', 'kakao_auth');
    
    console.log('카카오 사용자 닉네임:', nickname);
    
    // SignUp_2로 이동
    navigate('/signup-2');
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
          {/* 닉네임 입력 */}
          <div className="space-y-1">
            <label className="block text-left" style={{ 
              color: '#00B44B',
              fontFamily: 'Pretendard',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal'
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: '#13D564' }}
            />
            <div className="h-5 flex items-center justify-end">
              {error && (
                <p className="text-red-500" style={{ fontSize: '0.7rem' }}>{error}</p>
              )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium transition-colors mt-6 text-white cursor-pointer"
            style={{
              backgroundColor: nickname.trim() ? '#13D564' : '#CCF3DB'
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
