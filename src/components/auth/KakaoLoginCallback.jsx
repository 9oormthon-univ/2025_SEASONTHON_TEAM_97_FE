import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../services/api.js";

export default function KakaoLoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleKakaoLogin(code);
    } else {
      console.error("카카오 로그인 코드가 없습니다.");
      setError("인증 코드를 받지 못했습니다.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [searchParams, navigate]);

  const handleKakaoLogin = async (code) => {
    try {
      setIsLoading(true);

      const res = await api.post("/api/auth/kakao", { code });
      // axios면 여기!
      const result = res.data;

      if (result.success) {
        if (result.isExistingUser) {
          // ⚠️ 가능하면 HttpOnly 쿠키로 처리하고, localStorage에는 최소한만 저장 권장
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
          navigate("/login-success");
        } else {
          navigate("/kakao-nickname");
        }
      } else {
        setError(result.message || "카카오 로그인에 실패했습니다.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      setError("카카오 로그인 처리 중 오류가 발생했습니다.");
      setTimeout(() => navigate("/login"), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">카카오 로그인 처리 중...</p>
            </>
          ) : error ? (
            <>
              <div className="text-red-500 text-lg mb-4">⚠️</div>
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-gray-500 text-sm">
                로그인 페이지로 이동합니다...
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
