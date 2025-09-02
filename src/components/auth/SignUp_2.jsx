import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/청춘스케치.svg";
import { api } from "../../services/api.js";

export default function SignUp_2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthDate: "",
    region: "",
    incomeLevel: "",
    employmentStatus: "",
  });

  const [errors, setErrors] = useState({});

  // 페이지 로드 시 localStorage 데이터 콘솔에 출력
  useEffect(() => {
    const signupStep1Data = JSON.parse(
      localStorage.getItem("signupStep1Data") || "{}"
    );
    const tempUserId = localStorage.getItem("tempUserId");
    const tempPassword = localStorage.getItem("tempPassword");
    const tempNickname = localStorage.getItem("tempNickname");

    console.log("=== SignUp_2 페이지 로드 ===");
    console.log("1단계에서 넘어온 데이터:", signupStep1Data);
    console.log("localStorage 데이터:", {
      tempUserId,
      tempPassword,
      tempNickname,
      signupStep1Data,
    });
    console.log("현재 2단계 폼 데이터:", formData);
    console.log("================================");
  }, []);

  // formData가 변경될 때마다 콘솔에 출력 (디바운스 적용)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.values(formData).some((value) => value !== "")) {
        const signupStep1Data = JSON.parse(
          localStorage.getItem("signupStep1Data") || "{}"
        );
        const employmentStatusNumber =
          formData.employmentStatus === "학생"
            ? 0
            : formData.employmentStatus === "직장인"
            ? 1
            : null;

        console.log("=== 2단계 폼 데이터 업데이트 ===");
        console.log("1단계 데이터:", signupStep1Data);
        console.log("2단계 현재 데이터:", formData);
        console.log("고용상태 숫자:", employmentStatusNumber);
        console.log("전체 회원가입 데이터:", {
          step1: signupStep1Data,
          step2: formData,
          complete: false,
        });
        console.log("================================");
      }
    }, 1000); // 1초 후에 콘솔 출력

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 실시간 유효성 검사
    const newErrors = { ...errors };

    if (name === "birthDate") {
      // 생년월일 형식 검사 (YYYY/MM/DD)
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (value && !dateRegex.test(value)) {
        newErrors.birthDate = "생년월일 양식이 맞지 않습니다.";
      } else {
        newErrors.birthDate = "";
      }
    } else if (name === "incomeLevel") {
      // 소득 수준 숫자 검사
      if (value && !/^\d+$/.test(value)) {
        newErrors.incomeLevel = "숫자만 입력해주세요.";
      } else {
        newErrors.incomeLevel = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 전체 유효성 검사
    const newErrors = {};

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    } else {
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!dateRegex.test(formData.birthDate)) {
        newErrors.birthDate = "생년월일 양식이 맞지 않습니다.";
      }
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length === 0 ||
      Object.values(newErrors).every((error) => !error)
    ) {
      try {
        // 회원가입 1단계 데이터 가져오기
        const signupStep1Data = JSON.parse(
          localStorage.getItem("signupStep1Data") || "{}"
        );

        // 회원가입 2단계 데이터 구성
        const signupStep2Data = {
          step: 2,
          birthDate: formData.birthDate,
          region: formData.region,
          incomeLevel: formData.incomeLevel,
          employmentStatus: formData.employmentStatus,
          timestamp: new Date().toISOString(),
        };

        // 전체 회원가입 데이터 통합
        const completeSignupData = {
          step1: signupStep1Data,
          step2: signupStep2Data,
          complete: true,
          finalTimestamp: new Date().toISOString(),
        };

        // 카카오 사용자 데이터 가져오기
        const kakaoUserData = JSON.parse(
          localStorage.getItem("kakaoUserData") || "{}"
        );

        // ERD에 맞춰 백엔드로 전송할 데이터 구성
        const userData = {
          login_id: localStorage.getItem("tempUserId") || "kakao_user", // 임시 저장된 아이디 또는 카카오 사용자
          password: localStorage.getItem("tempPassword") || "kakao_auth", // 임시 저장된 비밀번호 또는 카카오 인증
          name: localStorage.getItem("tempNickname") || "사용자", // 닉네임
          birth: formData.birthDate.replace(/\//g, "-"), // YYYY-MM-DD 형식으로 변환
          location: formData.region, // 지역
          organization_status: formData.employmentStatus === "학생" ? 0 : 1, // 학생(0) | 직장인(1)
          financial_status: formData.incomeLevel
            ? parseInt(formData.incomeLevel)
            : 0, // 소득 수준 (만원 단위)
          goal: 0, // 기본값: 취업
          created_at: new Date().toISOString().split("T")[0], // 현재 날짜
          // 카카오 사용자 추가 정보
          kakao_id: kakaoUserData.id || null,
          email: kakaoUserData.email || null,
          profile_image: kakaoUserData.profile_image || null,
        };

        console.log("=== 최종 제출 데이터 ===");
        console.log("백엔드로 전송할 데이터:", userData);
        console.log("전체 회원가입 데이터:", completeSignupData);
        console.log(
          "고용상태 숫자:",
          formData.employmentStatus === "학생" ? 0 : 1
        );
        console.log("localStorage 최종 상태:", {
          tempUserId: localStorage.getItem("tempUserId"),
          tempPassword: localStorage.getItem("tempPassword"),
          tempNickname: localStorage.getItem("tempNickname"),
          signupStep1Data: localStorage.getItem("signupStep1Data"),
        });
        console.log("================================");

        // 백엔드 API 호출 - ERD 데이터와 전체 회원가입 데이터를 함께 전송
        try {
          const result = await api.post("/api/register", {
            userData: userData, // ERD에 맞춘 사용자 데이터
            completeSignupData: completeSignupData, // 전체 회원가입 과정 데이터
          });

          console.log("회원가입 성공:", result);

          // 임시 저장된 데이터 삭제
          localStorage.removeItem("tempUserId");
          localStorage.removeItem("tempPassword");
          localStorage.removeItem("tempNickname");
          localStorage.removeItem("signupStep1Data");

          // 로그인 성공 페이지로 이동
          navigate("/LoginSuccess");
        } catch (error) {
          console.error("회원가입 오류:", error);
          alert("회원가입 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("전체 처리 오류:", error);
        alert("처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSkip = () => {
    console.log("건너뛰기 선택");
    navigate("/LoginSuccess");
  };

  // 폼 유효성 검사 함수
  const isFormValid = () => {
    return (
      formData.birthDate &&
      formData.region &&
      formData.incomeLevel &&
      formData.employmentStatus &&
      Object.keys(errors).every((key) => !errors[key])
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
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
          {/* 생년월일 입력 */}
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
              생년월일
            </label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              placeholder="생년월일을 입력해주세요. 예시) 2000/01/01"
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm placeholder-gray-400 ${
                errors.birthDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-500 focus:ring-green-500"
              }`}
              style={{
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            >
              {errors.birthDate && (
                <p className="text-red-500 text-xs">{errors.birthDate}</p>
              )}
            </div>
          </div>

          {/* 지역 입력 */}
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
              지역
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm text-gray-400 ${
                errors.region
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-500 focus:ring-green-500"
              }`}
              style={{
                color: formData.region ? "#000000" : "#9ca3af",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            >
              <option value="" style={{ color: "#9ca3af" }}>
                지역을 선택해주세요
              </option>
              <option value="서울특별시" style={{ color: "#000000" }}>
                서울특별시
              </option>
              <option value="부산광역시" style={{ color: "#000000" }}>
                부산광역시
              </option>
              <option value="대구광역시" style={{ color: "#000000" }}>
                대구광역시
              </option>
              <option value="인천광역시" style={{ color: "#000000" }}>
                인천광역시
              </option>
              <option value="광주광역시" style={{ color: "#000000" }}>
                광주광역시
              </option>
              <option value="대전광역시" style={{ color: "#000000" }}>
                대전광역시
              </option>
              <option value="울산광역시" style={{ color: "#000000" }}>
                울산광역시
              </option>
              <option value="세종특별자치시" style={{ color: "#000000" }}>
                세종특별자치시
              </option>
              <option value="경기도" style={{ color: "#000000" }}>
                경기도
              </option>
              <option value="강원도" style={{ color: "#000000" }}>
                강원도
              </option>
              <option value="충청북도" style={{ color: "#000000" }}>
                충청북도
              </option>
              <option value="충청남도" style={{ color: "#000000" }}>
                충청남도
              </option>
              <option value="전라북도" style={{ color: "#000000" }}>
                전라북도
              </option>
              <option value="전라남도" style={{ color: "#000000" }}>
                전라남도
              </option>
              <option value="경상북도" style={{ color: "#000000" }}>
                경상북도
              </option>
              <option value="경상남도" style={{ color: "#000000" }}>
                경상남도
              </option>
              <option value="제주특별자치도" style={{ color: "#000000" }}>
                제주특별자치도
              </option>
            </select>
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            >
              {errors.region && (
                <p className="text-red-500 text-xs">{errors.region}</p>
              )}
            </div>
          </div>

          {/* 소득 수준 입력 */}
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
              소득 수준
            </label>
            <input
              type="text"
              name="incomeLevel"
              value={formData.incomeLevel}
              onChange={handleChange}
              placeholder="월 소득수준을 입력해주세요. (단위: 만원)"
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm placeholder-gray-400 ${
                errors.incomeLevel
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-500 focus:ring-green-500"
              }`}
              style={{
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            />
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            >
              {errors.incomeLevel && (
                <p className="text-red-500 text-xs">{errors.incomeLevel}</p>
              )}
            </div>
          </div>

          {/* 고용상태 입력 */}
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
              고용상태
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className={`w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:border-green-500 bg-white transition-colors text-sm text-gray-400 ${
                errors.employmentStatus
                  ? "border-red-500 focus:ring-red-500"
                  : "border-green-500 focus:ring-green-500"
              }`}
              style={{
                color: formData.employmentStatus ? "#000000" : "#9ca3af",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            >
              <option value="" style={{ color: "#9ca3af" }}>
                고용상태를 선택해주세요
              </option>
              <option value="학생" style={{ color: "#000000" }}>
                학생
              </option>
              <option value="직장인" style={{ color: "#000000" }}>
                직장인
              </option>
            </select>
            <div
              style={{ height: "1.25rem" }}
              className="flex items-center justify-end mt-1"
            >
              {errors.employmentStatus && (
                <p className="text-red-500 text-xs">
                  {errors.employmentStatus}
                </p>
              )}
            </div>
          </div>

          {/* 등록하기 버튼 */}
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
            등록하기
          </button>

          {/* 건너뛰기 링크 */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center text-green-600 hover:text-green-700 transition-colors"
            style={{
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            건너뛰기
          </button>
        </form>
      </div>
    </div>
  );
}
