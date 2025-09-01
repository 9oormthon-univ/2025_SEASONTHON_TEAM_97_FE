import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function KakaoLoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      console.log('카카오 로그인 코드:', code);
      
      // 여기서 백엔드로 코드를 전송하여 액세스 토큰을 받아올 수 있습니다
      // 예시: handleKakaoLogin(code);
      
      // 임시로 로그인 성공 처리
      setTimeout(() => {    
        navigate('/kakao-nickname'); // 닉네임 입력 페이지로 리다이렉트
      }, 1000);
    } else {
      console.error('카카오 로그인 코드가 없습니다.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#F0F6F4]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">카카오 로그인 처리 중...</p>
      </div>
    </div>
  );
}