import { useState } from "react";
import { Link } from "react-router-dom";
import logoSvg from "../../assets/icons/청춘스케치.svg";

export default function LoginPage() {
  // 카카오 로그인 설정 (Login.jsx에서 가져온 코드)
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    autoLogin: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", formData);
    // 여기에 로그인 로직 추가
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F0F6F4]">
      {/* 메인 콘텐츠 카드 (로그인 폼 포함) */}
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
          className="w-full flex flex-col space-y-5"
          style={{ maxWidth: "22.5rem" }}
        >
          {/* 아이디 입력 */}
          <div>
            <label
              className="block mb-2 text-left"
              style={{
                color: "#00B44B",
                fontFamily: "Pretendard",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              아이디
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: "#13D564" }}
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label
              className="block mb-2 text-left"
              style={{
                color: "#00B44B",
                fontFamily: "Pretendard",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{ borderColor: "#13D564" }}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            로그인
          </button>

          {/* 아이디/비밀번호 찾기 & 자동 로그인 */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a
                href="#"
                className="text-green-600 hover:text-green-700 underline"
              >
                아이디 찾기 / 비밀번호 찾기
              </a>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="autoLogin"
                checked={formData.autoLogin}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <label className="ml-2 text-sm text-gray-700">자동 로그인</label>
            </div>
          </div>

          {/* 구분선 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F0F6F4] text-gray-500">또는</span>
            </div>
          </div>

          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            onClick={KakaoLogin}
            className="w-full bg-[#FEE500] text-[#3C1E1E] py-3 rounded-lg font-medium hover:bg-[#FDD800] transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-[#3C1E1E] text-lg">💬</span>
            </div>
            <span>카카오로 로그인하기</span>
          </button>

          {/* 회원가입 버튼 */}
          <Link
            to="/signup-1"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
          >
            회원가입하기
          </Link>
        </form>
      </div>
    </div>
  );
}
