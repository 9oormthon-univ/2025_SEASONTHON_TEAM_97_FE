import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/cheongchun-sketch.svg";
import { api } from "../../services/api.js";

export default function KakaoNickname() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  // 닉네임 중복 검사 관련 상태
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState(null);
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState("");

  // 닉네임 중복 검사 함수 (SignUp_1과 동일)
  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await fetch(
        `http://localhost:8000/check-nickname/${nickname}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return { isAvailable: data.is_available, message: data.message || "" };
      } else {
        const errorData = await response.json();
        console.error("닉네임 중복 검사 실패:", errorData);
        return {
          isAvailable: false,
          message: errorData.message || "닉네임 중복 검사에 실패했습니다.",
        };
      }
    } catch (error) {
      console.error("닉네임 중복 검사 오류:", error);
      return {
        isAvailable: false,
        message: "닉네임 중복 검사 중 오류가 발생했습니다.",
      };
    }
  };

  // 디바운스 함수
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // 디바운스된 닉네임 중복 검사
  const debouncedNicknameCheck = useCallback(
    debounce(async (nickname) => {
      if (nickname.length >= 2) {
        setIsCheckingNickname(true);
        setNicknameCheckMessage("");
        try {
          const result = await checkNicknameDuplicate(nickname);
          setNicknameCheckResult(result.isAvailable);
          setNicknameCheckMessage(result.message);
        } catch (error) {
          console.error("닉네임 중복 검사 오류:", error);
          setNicknameCheckResult(false);
          setNicknameCheckMessage("닉네임 중복 검사 중 오류가 발생했습니다.");
        } finally {
          setIsCheckingNickname(false);
        }
      }
    }, 500),
    []
  );

  // 닉네임 유효성 검사 (SignUp_1과 동일)
  const validateNickname = (nickname) => {
    if (!nickname) return "닉네임을 입력해주세요.";
    if (nickname.length < 2 || nickname.length > 10)
      return "닉네임은 2자 이상 10자 이하여야 합니다.";

    // 특수문자 제한 (한글, 영문, 숫자만 허용)
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (!nicknameRegex.test(nickname))
      return "닉네임은 한글, 영문, 숫자만 사용 가능합니다.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const validationError = validateNickname(nickname.trim());
    if (validationError) {
      setError(validationError);
      return;
    }

    // 닉네임 중복 검사 결과 확인
    if (nicknameCheckResult === false) {
      setError(nicknameCheckMessage || "이미 사용 중인 닉네임입니다.");
      return;
    }

    if (nicknameCheckResult === null && nickname.length >= 2) {
      setError("닉네임 중복 확인이 필요합니다.");
      return;
    }

    try {
      // 백엔드로 카카오 사용자 정보와 닉네임 전송
      const result = await api.post("/api/auth/kakao/complete", {
        nickname: nickname.trim(),
      });

      if (result.success) {
        // 닉네임 저장 (SignUp_2에서 사용)
        localStorage.setItem("tempNickname", nickname.trim());
        localStorage.setItem("tempUserId", result.userId || "kakao_user");
        localStorage.setItem("tempPassword", result.password || "kakao_auth");
        localStorage.setItem("kakaoUserData", JSON.stringify(result.kakaoData));

        // SignUp_2로 이동
        navigate("/signup/step2");
      } else {
        setError(result.message || "닉네임 설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("닉네임 설정 오류:", error);

      // 임시 테스트용: 백엔드가 준비되지 않은 경우
      if (error.message.includes("404")) {
        // 기존 카카오 사용자 데이터에 닉네임 추가
        const existingKakaoData = JSON.parse(
          localStorage.getItem("kakaoUserData") || "{}"
        );

        const updatedKakaoData = {
          ...existingKakaoData,
          nickname: nickname.trim(),
        };

        // 닉네임 저장 (SignUp_2에서 사용)
        localStorage.setItem("tempNickname", nickname.trim());
        localStorage.setItem("kakaoUserData", JSON.stringify(updatedKakaoData));

        // SignUp_2로 이동
        navigate("/signup/step2");
      } else {
        setError("닉네임 설정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="h-screen bg-[#FAFAF8]">
      {/* 메인 콘텐츠 영역 */}
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
          {/* 닉네임 입력 */}
          <div style={{ marginBottom: "1rem" }}>
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
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                setNickname(value);

                // 실시간 유효성 검사
                const validationError = validateNickname(value);
                setError(validationError);

                // 유효성 검사 통과 시 중복 검사 실행
                if (!validationError && value.length >= 2) {
                  setNicknameCheckResult(null);
                  debouncedNicknameCheck(value);
                } else {
                  setNicknameCheckResult(null);
                  setNicknameCheckMessage("");
                }
              }}
              placeholder="닉네임을 입력해주세요."
              className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors text-sm"
              style={{
                borderColor: "#13D564",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            >
              {/* 에러 메시지 또는 중복 검사 결과 표시 */}
              {error ? (
                <p className="text-red-500 text-xs">{error}</p>
              ) : isCheckingNickname ? (
                <p className="text-gray-500 text-xs">확인 중...</p>
              ) : nicknameCheckResult === true ? (
                <p className="text-green-500 text-xs">
                  {nicknameCheckMessage || "사용 가능한 닉네임입니다."}
                </p>
              ) : nicknameCheckResult === false ? (
                <p className="text-red-500 text-xs">
                  {nicknameCheckMessage || "이미 사용 중인 닉네임입니다."}
                </p>
              ) : null}
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            type="submit"
            className="w-full rounded-lg font-medium transition-colors text-white cursor-pointer py-3"
            style={{
              backgroundColor:
                nickname.trim() && !error && nicknameCheckResult === true
                  ? "#13D564"
                  : "#CCF3DB",
            }}
            disabled={
              !nickname.trim() ||
              !!error ||
              nicknameCheckResult !== true ||
              isCheckingNickname
            }
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
