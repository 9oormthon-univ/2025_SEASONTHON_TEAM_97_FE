import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from "../../assets/icons/청춘스케치.svg";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 메인 페이지로 이동 (임시로 홈으로 이동)
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#F0F6F4]">
      <div className="text-center">
        {/* 로고 */}
        <div className="mb-8">
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

        {/* 성공 메시지 */}
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">로그인 성공!</h2>
            <p className="text-gray-600">환영합니다!</p>
          </div>
          
          <div className="text-sm text-gray-500">
            잠시 후 메인 페이지로 이동합니다...
          </div>
        </div>
      </div>
    </div>
  );
}