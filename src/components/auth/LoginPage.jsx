import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/cheongchun-sketch.svg";
import kakaoTalkSvg from "../../assets/icons/kakao-talk.svg";
import { authAPI } from "../../services/api";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

    // 기본 유효성 검사
    if (!formData.id.trim()) {
      setError("아이디를 입력해주세요.");
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      console.log("=== 로그인 API 호출 시작 ===");
      console.log("로그인 데이터:", {
        loginId: formData.id,
        password: "****", // 보안상 비밀번호는 숨김
      });

      // 백엔드로 전송되는 실제 데이터
      const loginData = {
        loginId: formData.id,
        password: formData.password,
      };

      console.log("=== 백엔드로 전송되는 실제 데이터 ===");
      console.log(JSON.stringify(loginData, null, 2));

      // 실제 API 호출
      const response = await authAPI.login(loginData);

      console.log("=== 로그인 API 응답 결과 ===");
      console.log("response:", response);

      if (response.success) {
        console.log("=== 로그인 성공 ===");
        console.log("성공 메시지:", response.message);

        // 로그인 성공
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: formData.id,
            loginType: "local",
          })
        );
        navigate("/login-success");
      } else {
        console.log("=== 로그인 실패 ===");
        console.log("실패 원인:", response.error);

        // 로그인 실패
        setError(response.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.log("=== 로그인 처리 중 예외 발생 ===");
      console.error("오류 상세:", error);
      setError("로그인 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#FAFAF8]">
      {/* 메인 콘텐츠 카드 (로그인 폼 포함) */}
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FAFAF8]">
        {/* 헤더 - 로고 */}
        <div
          className="text-center"
          style={{ position: "absolute", top: "5rem" }}
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
          style={{ width: "90%", maxWidth: "20rem", marginTop: "8rem" }}
        >
          {/* 아이디 입력 */}
          <div>
            <label
              className="block text-left"
              style={{
                color: "#00B44B",
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
              className="w-full px-4 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none text-black placeholder-[#D5E5DC]"
              style={{
                paddingTop: "0.7rem",
                paddingBottom: "0.7rem",
                marginBottom: "0.1rem",
                outline: "none",
                boxShadow: "none",
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
              className="w-full px-4 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none text-black placeholder-[#D5E5DC]"
              style={{
                paddingTop: "0.7rem",
                paddingBottom: "0.7rem",
                marginBottom: "0.1rem",
                outline: "none",
                boxShadow: "none",
              }}
              required
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            ></div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg font-medium transition-colors text-[0.85rem] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#13D564] hover:bg-[#0FB055] cursor-pointer"
            } text-white`}
            style={{
              marginBottom: "0.75rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            {loading ? "로그인 중..." : "로그인"}
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
            className="w-full bg-[#FEE500] text-[#353000] rounded-lg font-medium hover:bg-[#FDD800] transition-colors relative cursor-pointer text-[0.85rem]"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            <div
              style={{ width: "1.2rem", height: "1.2rem" }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
            >
              <img
                src={kakaoTalkSvg}
                alt="kakao talk"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="w-full text-center block">
              카카오로 로그인하기
            </span>
          </button>

          {/* 구분선 */}
          <div
            className="relative"
            style={{ marginTop: "0.8rem", marginBottom: "0.8rem" }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2 bg-[#FAFAF8] text-gray-500"
                style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
              >
                또는
              </span>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <Link
            to="/signup/step1"
            className="w-full bg-[#13D564] text-white rounded-lg font-medium hover:bg-[#0FB055] transition-colors text-center text-[0.85rem]"
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
