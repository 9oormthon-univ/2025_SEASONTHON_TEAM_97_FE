import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/청춘스케치.svg";
 

export default function LoginPage() {
  const navigate = useNavigate();

  // 카카오 로그인 설정 (Login.jsx에서 가져온 코드)
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    autoLogin: true,
  });

  // 로그인 페이지는 데모 모드로 유효성 검사를 수행하지 않습니다.

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 시도:", formData);

    // 데모 로그인: 바로 성공 처리
    localStorage.setItem("authToken", "demo_token_" + Date.now());
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        id: formData.id,
        loginType: "local",
      })
    );
    navigate("/LoginSuccess");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#121212]">
      {/* 메인 콘텐츠 카드 (로그인 폼 포함) */}
      <div className="h-screen w-[480px] mx-auto flex flex-col items-center justify-center bg-[#FAFAF8]">
        {/* 헤더 - 로고 */}
        <div
          className="text-center"
          style={{ position: "absolute", top: "3rem" }}
        >
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
          {/* 아이디 입력 */}
          <div>
            <label
              className="block text-left"
              style={{
                color: "#00B44B",
                fontFamily: "Pretendard",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                marginBottom: "0.25rem",
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
              className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                marginBottom: "0.1rem",
              }}
              required
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            ></div>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label
              className="block text-left"
              style={{
                color: "#00B44B",
                fontFamily: "Pretendard",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                marginBottom: "0.25rem",
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
              className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                marginBottom: "0.1rem",
              }}
              required
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            ></div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            style={{
              marginBottom: "0.75rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            로그인
          </button>

          {/* 아이디/비밀번호 찾기 & 자동 로그인 */}
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "1.75rem" }}
          >
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
                className="text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                style={{
                  width: "1rem",
                  height: "1rem",
                }}
              />
              <label
                className="text-sm"
                style={{ color: "#00B44B", marginLeft: "0.5rem" }}
              >
                자동 로그인
              </label>
            </div>
          </div>

          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            onClick={KakaoLogin}
            className="w-full bg-[#FEE500] text-[#3C1E1E] rounded-lg font-medium hover:bg-[#FDD800] transition-colors flex items-center justify-center cursor-pointer"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            <div
              style={{ width: "1.5rem", height: "1.5rem" }}
              className="flex items-center justify-center"
            >
              <span className="text-[#3C1E1E] text-lg">💬</span>
            </div>
            <span style={{ marginLeft: "0.5rem" }}>카카오로 로그인하기</span>
          </button>

          {/* 구분선 */}
          <div
            className="relative"
            style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2 bg-[#F0F6F4] text-gray-500"
                style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
              >
                또는
              </span>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <Link
            to="/signup-1"
            className="w-full bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            회원가입하기
          </Link>
        </form>
      </div>
    </div>
  );
}
