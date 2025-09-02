import { useState, useEffect, useCallback } from "react";
import logoSvg from "../../assets/icons/청춘스케치.svg";
import { useNavigate } from "react-router-dom"; // 라우트 이동을 위한 임포트

export default function SignUp_1() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [errors, setErrors] = useState({});
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idCheckResult, setIdCheckResult] = useState(null); // null: 검사 안함, true: 사용가능, false: 중복
  const [idCheckMessage, setIdCheckMessage] = useState(""); // 중복 검사 메시지
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [nicknameCheckResult, setNicknameCheckResult] = useState(null); // null: 검사 안함, true: 사용가능, false: 중복
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState(""); // 닉네임 중복 검사 메시지

  const navigate = useNavigate(); // 라우트 이동을 위한 훅

  // 아이디 중복 검사 함수 (FastAPI)
  const checkIdDuplicate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/check-id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { isAvailable: data.is_available, message: data.message || "" };
      } else {
        const errorData = await response.json();
        console.error("아이디 중복 검사 실패:", errorData);
        return {
          isAvailable: false,
          message: errorData.message || "아이디 중복 검사에 실패했습니다.",
        };
      }
    } catch (error) {
      console.error("아이디 중복 검사 오류:", error);
      return {
        isAvailable: false,
        message: "아이디 중복 검사 중 오류가 발생했습니다.",
      };
    }
  };

  // 닉네임 중복 검사 함수 (FastAPI)
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

  // 아이디 중복 검사 함수 (Node.js)
  const checkIdDuplicateNode = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/check-id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.isAvailable;
      } else {
        console.error("아이디 중복 검사 실패");
        return false;
      }
    } catch (error) {
      console.error("아이디 중복 검사 오류:", error);
      return false;
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

  // 디바운스된 아이디 중복 검사
  const debouncedIdCheck = useCallback(
    debounce(async (id) => {
      if (id.length >= 4) {
        setIsCheckingId(true);
        setIdCheckMessage("");
        try {
          // FastAPI 사용 시
          const result = await checkIdDuplicate(id);
          // Node.js 사용 시
          // const result = await checkIdDuplicateNode(id);

          setIdCheckResult(result.isAvailable);
          setIdCheckMessage(result.message);
        } catch (error) {
          console.error("아이디 중복 검사 오류:", error);
          setIdCheckResult(false);
          setIdCheckMessage("아이디 중복 검사 중 오류가 발생했습니다.");
        } finally {
          setIsCheckingId(false);
        }
      }
    }, 500),
    []
  );

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

  // 아이디 유효성 검사
  const validateId = (id) => {
    if (!id) return "아이디를 입력해주세요.";
    if (id.length < 4 || id.length > 16)
      return "아이디는 4자 이상 16자 이하여야 합니다.";

    const idRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    if (!idRegex.test(id))
      return "아이디는 영문자로 시작하고, 영문자, 숫자, _, -만 사용 가능합니다.";

    if (/(\.\.|__)/.test(id)) return "연속된 특수문자는 사용할 수 없습니다.";

    return "";
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 8 || password.length > 20)
      return "비밀번호는 8자 이상 20자 이하여야 합니다.";

    // 영문 대소문자, 숫자, 특수문자 3종류 이상 포함
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()\-_=+[\]{};:,.<>?]/.test(password);

    const typeCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;
    if (typeCount < 3)
      return "영문 대문자, 소문자, 숫자, 특수문자 중 3종류 이상을 포함해야 합니다.";

    // 동일 문자 3회 이상 반복 금지
    if (/(.)\1{2,}/.test(password))
      return "동일한 문자를 3회 이상 연속 사용할 수 없습니다.";

    // 키보드 연속 문자 금지 (선택사항)
    const keyboardSequences = ["12345678", "qwerty", "asdfgh", "zxcvbn"];
    if (keyboardSequences.some((seq) => password.toLowerCase().includes(seq))) {
      return "키보드 연속 문자는 사용할 수 없습니다.";
    }

    return "";
  };

  // 비밀번호 유사성 검사
  const validatePasswordSimilarity = (password, id) => {
    if (!id || !password) return "";

    // 아이디와 동일한 비밀번호 금지
    if (password.toLowerCase() === id.toLowerCase()) {
      return "아이디와 동일한 비밀번호는 사용할 수 없습니다.";
    }

    // 아이디가 비밀번호에 포함된 경우
    if (password.toLowerCase().includes(id.toLowerCase())) {
      return "비밀번호에 아이디가 포함되어 있습니다.";
    }

    return "";
  };

  // 닉네임 유효성 검사
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 실시간 유효성 검사
    const newErrors = { ...errors };

    if (name === "id") {
      const validationError = validateId(value);
      newErrors.id = validationError;

      // 아이디가 변경되면 중복검사 결과 초기화
      setIdCheckResult(null);
      setIdCheckMessage("");

      // 유효성 검사 통과 시에만 중복 검사 실행
      if (!validationError && value.length >= 4) {
        debouncedIdCheck(value);
      } else {
        setIdCheckResult(null);
      }

      // 아이디가 변경되면 비밀번호 유사성도 다시 검사
      if (formData.password) {
        newErrors.password =
          validatePasswordSimilarity(formData.password, value) ||
          validatePassword(formData.password);
      }
    } else if (name === "password") {
      newErrors.password = validatePassword(value);
      if (formData.id) {
        const similarityError = validatePasswordSimilarity(value, formData.id);
        if (similarityError) {
          newErrors.password = similarityError;
        }
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "비밀번호가 동일하지 않습니다.";
      } else {
        newErrors.confirmPassword = "";
      }
    } else if (name === "nickname") {
      const validationError = validateNickname(value);
      newErrors.nickname = validationError;

      // 닉네임이 변경되면 중복검사 결과 초기화
      setNicknameCheckResult(null);
      setNicknameCheckMessage("");

      // 유효성 검사 통과 시에만 중복 검사 실행
      if (!validationError && value.length >= 2) {
        debouncedNicknameCheck(value);
      } else {
        setNicknameCheckResult(null);
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 전체 유효성 검사
    const newErrors = {};

    newErrors.id = validateId(formData.id);
    newErrors.password = validatePassword(formData.password);

    if (formData.password) {
      const similarityError = validatePasswordSimilarity(
        formData.password,
        formData.id
      );
      if (similarityError) {
        newErrors.password = similarityError;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 동일하지 않습니다.";
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else {
      newErrors.nickname = validateNickname(formData.nickname);
    }

    // 아이디 중복 검사 결과 확인
    if (idCheckResult === false) {
      newErrors.id = idCheckMessage; // 백엔드에서 받은 메시지 사용
    } else if (idCheckResult === null && formData.id) {
      newErrors.id = "아이디 중복 검사를 완료해주세요.";
    }

    // 닉네임 중복 검사 결과 확인
    if (nicknameCheckResult === false) {
      newErrors.nickname = nicknameCheckMessage; // 백엔드에서 받은 메시지 사용
    } else if (nicknameCheckResult === null && formData.nickname) {
      newErrors.nickname = "닉네임 중복 검사를 완료해주세요.";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length === 0 ||
      Object.values(newErrors).every((error) => !error)
    ) {
      // 임시로 localStorage에 저장 (SignUp_2에서 사용)
      localStorage.setItem("tempUserId", formData.id);
      localStorage.setItem("tempPassword", formData.password);
      localStorage.setItem("tempNickname", formData.nickname);

      // 회원가입 1단계 데이터를 JSON 형태로 저장
      const signupStep1Data = {
        step: 1,
        id: formData.id,
        password: formData.password,
        nickname: formData.nickname,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("signupStep1Data", JSON.stringify(signupStep1Data));

      console.log("회원가입 1단계 완료:", signupStep1Data);
      console.log("localStorage에 저장된 데이터:", {
        tempUserId: localStorage.getItem("tempUserId"),
        tempPassword: localStorage.getItem("tempPassword"),
        tempNickname: localStorage.getItem("tempNickname"),
        signupStep1Data: localStorage.getItem("signupStep1Data"),
      });
      navigate("/signup-2"); // 유효성 검사 통과 시 SignUp_2로 이동
    }
  };

  const isFormValid = () => {
    return (
      errors.id === "" &&
      errors.password === "" &&
      errors.confirmPassword === "" &&
      errors.nickname === "" &&
      idCheckResult === true &&
      nicknameCheckResult === true &&
      formData.id.length >= 4 &&
      formData.password.length >= 8 &&
      formData.confirmPassword === formData.password
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#121212]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col items-center justify-center bg-[#F0F6F4]">
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
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm ${
                errors.id ? 'border-red-500 focus:ring-red-500' : 'border-green-500 focus:ring-green-500'
              }`}
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
            >
              {isCheckingId && (
                <p className="text-gray-500 text-xs">
                  확인 중...
                </p>
              )}
              {!isCheckingId && errors.id && (
                <p className="text-red-500 text-xs">
                  {errors.id}
                </p>
              )}
              {!isCheckingId && !errors.id && idCheckMessage && (
                <p
                  className={
                    idCheckResult === true ? "text-green-600" : "text-red-500"
                  }
                  style={{ fontSize: "0.7rem" }}
                >
                  {idCheckMessage}
                </p>
              )}
            </div>
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
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-green-500 focus:ring-green-500'
              }`}
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
            >
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* 비밀번호 확인 입력 */}
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
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-green-500 focus:ring-green-500'
              }`}
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
            >
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </p>
              )}
              {!errors.confirmPassword &&
                formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="text-green-600" style={{ fontSize: "0.7rem" }}>
                    비밀번호가 일치합니다.
                  </p>
                )}
            </div>
          </div>

          {/* 닉네임 입력 */}
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
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해주세요."
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm ${
                errors.nickname ? 'border-red-500 focus:ring-red-500' : 'border-green-500 focus:ring-green-500'
              }`}
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
            >
              {isCheckingNickname && (
                <p className="text-gray-500 text-xs">
                  확인 중...
                </p>
              )}
              {!isCheckingNickname && errors.nickname && (
                <p className="text-red-500 text-xs">
                  {errors.nickname}
                </p>
              )}
              {!isCheckingNickname &&
                !errors.nickname &&
                nicknameCheckMessage && (
                  <p
                    className={
                      nicknameCheckResult === true
                        ? "text-green-600"
                        : "text-red-500"
                    }
                    style={{ fontSize: "0.7rem" }}
                  >
                    {nicknameCheckMessage}
                  </p>
                )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full rounded-lg font-medium transition-colors text-white cursor-pointer`}
            style={{
              backgroundColor: isFormValid() ? "#13D564" : "#CCF3DB",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
