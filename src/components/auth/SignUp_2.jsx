import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/cheongchun-sketch.svg";
import dropDownSvg from "../../assets/icons/drop-down.svg";
import { api, authAPI } from "../../services/api.js";

export default function SignUp_2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    region: "",
    school: "",
    incomeLevel: "",
    employmentStatus: "",
    interests: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // 소득분위 자동 계산 관련 상태
  const [incomeInputType, setIncomeInputType] = useState("dropdown"); // 'manual' 또는 'dropdown'
  const [manualIncome, setManualIncome] = useState("");
  const [calculatedLevel, setCalculatedLevel] = useState("");

  // 학력 코드 매핑 (schoolCd)
  const schoolCodeMap = {
    "고졸 미만": "0049001",
    "고교 재학": "0049002",
    "고졸 예정": "0049003",
    "고교 졸업": "0049004",
    "대학 재학": "0049005",
    "대졸 예정": "0049006",
    "대학 졸업": "0049007",
    석박사: "0049008",
    기타: "0049009",
    제한없음: "0049010",
  };

  // 지역 코드 매핑 (5자리 정수)
  const regionCodeMap = {
    전국: 11000,
    서울특별시: 11000,
    부산광역시: 21000,
    대구광역시: 22000,
    인천광역시: 23000,
    광주광역시: 24000,
    대전광역시: 25000,
    울산광역시: 26000,
    세종특별자치시: 29000,
    경기도: 31000,
    강원도: 32000,
    충청북도: 33000,
    충청남도: 34000,
    전라북도: 35000,
    전라남도: 36000,
    경상북도: 37000,
    경상남도: 38000,
    제주특별자치도: 39000,
  };

  // 관심분야 코드 매핑 (sbizCd)
  const interestCodeMap = {
    중소기업: "0014001",
    여성: "0014002",
    기초생활수급자: "0014003",
    한부모가정: "0014004",
    장애인: "0014005",
    농업인: "0014006",
    군인: "0014007",
    지역인재: "0014008",
    기타: "0014009",
    제한없음: "0014010",
  };

  // 특화 분야 옵션들
  const interestOptions = [
    "중소기업",
    "여성",
    "기초생활수급자",
    "한부모가정",
    "장애인",
    "농업인",
    "군인",
    "지역인재",
    "기타",
    "제한없음",
  ];

  // 페이지 로드 시 localStorage 데이터 콘솔에 출력
  useEffect(() => {
    console.log("=== 회원가입 2단계 페이지 로드 ===");

    const signupStep1Data = JSON.parse(
      localStorage.getItem("signupStep1Data") || "{}"
    );
    const tempUserId = localStorage.getItem("tempUserId");
    const tempPassword = localStorage.getItem("tempPassword");
    const tempNickname = localStorage.getItem("tempNickname");

    console.log("=== 1단계에서 전달받은 데이터 ===");
    console.log("signupStep1Data:", signupStep1Data);
    console.log("tempUserId:", tempUserId);
    console.log("tempPassword:", tempPassword);
    console.log("tempNickname:", tempNickname);
    console.log("=====================================");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`=== 2단계 폼 입력 변경 ===`);
    console.log(`필드: ${name}, 값: ${value}`);

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };
      console.log("업데이트된 formData:", newFormData);
      return newFormData;
    });

    // 실시간 유효성 검사
    const newErrors = { ...errors };

    if (name === "region") {
      if (!value) {
        newErrors.region = "지역을 선택해주세요.";
      } else {
        newErrors.region = "";
      }
    }

    setErrors(newErrors);
  };

  // 관심 분야 토글 처리
  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const currentInterests = [...prev.interests];
      const index = currentInterests.indexOf(interest);

      if (index > -1) {
        currentInterests.splice(index, 1);
      } else {
        currentInterests.push(interest);
      }

      return {
        ...prev,
        interests: currentInterests,
      };
    });
  };

  // 소득 입력 처리
  const handleManualIncomeChange = (e) => {
    const value = e.target.value;
    setManualIncome(value);
    // 입력할 때마다 계산 결과 초기화
    setCalculatedLevel("");
  };

  // 소득분위 자동 계산 함수 (2025년 기준, 만원 단위)
  // 소득분위에서 숫자만 추출하는 함수
  const extractIncomeNumber = (incomeLevel) => {
    if (!incomeLevel) return 0;
    const match = incomeLevel.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const calculateIncomeLevel = () => {
    const incomeInWon = parseInt(manualIncome) * 10000; // 만원을 원으로 변환
    if (!manualIncome || parseInt(manualIncome) <= 0) {
      alert("올바른 소득 금액을 입력해주세요.");
      return;
    }

    const medianIncome = 2392013; // 2025년 기준 1인 가구 중위소득 (원)
    const ratio = (incomeInWon / medianIncome) * 100;

    let level = "";
    if (ratio <= 30) {
      level = "1분위";
    } else if (ratio <= 50) {
      level = "2분위";
    } else if (ratio <= 70) {
      level = "3분위";
    } else if (ratio <= 90) {
      level = "4분위";
    } else if (ratio <= 100) {
      level = "5분위";
    } else if (ratio <= 130) {
      level = "6분위";
    } else if (ratio <= 150) {
      level = "7분위";
    } else if (ratio <= 200) {
      level = "8분위";
    } else if (ratio <= 300) {
      level = "9분위";
    } else {
      level = "10분위";
    }

    setCalculatedLevel(level);

    // 계산된 결과를 formData에도 반영
    setFormData((prev) => ({
      ...prev,
      incomeLevel: level,
    }));

    console.log(`=== financialStatus (소득분위) 계산 결과 ===`);
    console.log(`입력 소득: ${manualIncome}만원 (${incomeInWon}원)`);
    console.log(`계산된 분위: ${level}`);
    console.log(`financialStatus 값: ${extractIncomeNumber(level)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    // 전체 유효성 검사
    const newErrors = {};

    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      newErrors.birthDate = "생년월일을 모두 입력해주세요.";
    }

    if (!formData.region) {
      newErrors.region = "지역을 선택해주세요.";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length === 0 ||
      Object.values(newErrors).every((error) => !error)
    ) {
      try {
        console.log("=== 회원가입 2단계 폼 제출 시작 ===");
        console.log("현재 2단계 formData:", formData);
        console.log("location (지역):", formData.region);
        console.log("organizationStatus (학력):", formData.school);
        console.log("financialStatus (소득분위):", formData.incomeLevel);
        console.log("goal (관심분야):", formData.interests);

        // 회원가입 1단계 데이터 가져오기
        const signupStep1Data = JSON.parse(
          localStorage.getItem("signupStep1Data") || "{}"
        );

        console.log("=== localStorage에서 가져온 1단계 데이터 ===");
        console.log("signupStep1Data:", signupStep1Data);
        console.log("tempUserId:", localStorage.getItem("tempUserId"));
        console.log("tempPassword:", localStorage.getItem("tempPassword"));
        console.log("tempNickname:", localStorage.getItem("tempNickname"));

        // 생년월일 합치기 (API 명세에 맞게 YYYY-MM-DD 형식)
        const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(
          2,
          "0"
        )}-${formData.birthDay.padStart(2, "0")}`;

        console.log("=== birth (생년월일) ===");
        console.log("birth:", birthDate);

        // 지역 코드 변환
        const locationCode = regionCodeMap[formData.region] || 11000; // 기본값: 전국(11000)

        console.log("=== location (지역) 코드 변환 ===");
        console.log("선택된 지역:", formData.region);
        console.log("변환된 지역 코드:", locationCode);

        // API 명세에 맞는 회원가입 데이터 구성
        const userData = {
          loginId: localStorage.getItem("tempUserId") || signupStep1Data.id, // 로그인 아이디
          password:
            localStorage.getItem("tempPassword") || signupStep1Data.password, // 비밀번호
          name:
            localStorage.getItem("tempNickname") || signupStep1Data.nickname, // 닉네임
          birth: birthDate, // 생년월일 (YYYY-MM-DD)
          location: locationCode, // 지역 (5자리 정수 코드)
          organizationStatus:
            schoolCodeMap[formData.school] || formData.employmentStatus, // 학력 (코드 매핑)
          financialStatus: extractIncomeNumber(formData.incomeLevel), // 소득분위 (숫자)
          goal: interestCodeMap[formData.interests[0]] || "0014010", // 관심분야 (첫 번째 선택, 코드 매핑)
        };

        console.log("=== 코드 매핑 결과 ===");
        console.log("location (지역):", formData.region, "→", locationCode);
        console.log(
          "organizationStatus (학력):",
          formData.school,
          "→",
          schoolCodeMap[formData.school]
        );
        console.log(
          "financialStatus (소득분위):",
          formData.incomeLevel,
          "→",
          extractIncomeNumber(formData.incomeLevel)
        );
        console.log(
          "goal (관심분야):",
          formData.interests,
          "→",
          interestCodeMap[formData.interests[0]]
        );

        console.log("=== 최종 API 전송 데이터 (API 필드명) ===");
        console.log("userData:", userData);
        console.log("개별 필드 확인:");
        console.log("- loginId:", userData.loginId);
        console.log("- password:", userData.password);
        console.log("- name:", userData.name);
        console.log("- birth:", userData.birth);
        console.log("- location:", userData.location);
        console.log("- organizationStatus:", userData.organizationStatus);
        console.log("- financialStatus:", userData.financialStatus);
        console.log("- goal:", userData.goal);

        // 실제 회원가입 API 호출
        console.log("=== API 호출 시작 ===");
        console.log("=== 백엔드로 전송되는 실제 데이터 ===");
        console.log(JSON.stringify(userData, null, 2));

        const response = await authAPI.signup(userData);

        console.log("=== API 응답 결과 ===");
        console.log("response:", response);

        if (response.success) {
          console.log("=== 회원가입 성공 ===");
          console.log("성공 메시지:", response.message);

          // 성공 시 임시 저장된 데이터 삭제
          localStorage.removeItem("tempUserId");
          localStorage.removeItem("tempPassword");
          localStorage.removeItem("tempNickname");
          localStorage.removeItem("signupStep1Data");

          console.log("=== localStorage 데이터 삭제 완료 ===");

          // 로그인 성공 페이지로 이동
          navigate("/login-success");
        } else {
          console.log("=== 회원가입 실패 ===");
          console.log("실패 원인:", response.error);

          // 실패 시 에러 메시지 표시
          setSubmitError(response.error || "회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.log("=== 회원가입 처리 중 예외 발생 ===");
        console.error("오류 상세:", error);
        setSubmitError("회원가입 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen bg-[#FAFAF8]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-full flex flex-col bg-[#FAFAF8] overflow-y-auto">
        {/* 헤더 - 로고 */}
        <div className="text-center pt-20 pb-16">
          <div className="flex flex-col justify-center flex-shrink-0 mx-auto w-[252px] h-[46px]">
            <img
              src={logoSvg}
              alt="청춘스케치"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 pb-6"
          style={{ width: "90%", maxWidth: "20rem", margin: "0 auto" }}
        >
          {/* 생년월일 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-2">
              생년월일
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  className="w-full px-4 py-[0.7rem] pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none text-black"
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <option value="">년도</option>
                  {Array.from({ length: 37 }, (_, i) => 2010 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
                <img
                  src={dropDownSvg}
                  alt="dropdown"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
              </div>
              <div className="flex-1 relative">
                <select
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  className="w-full px-4 py-[0.7rem] pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none text-black"
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <img
                  src={dropDownSvg}
                  alt="dropdown"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
              </div>
              <div className="flex-1 relative">
                <select
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  className="w-full px-4 py-[0.7rem] pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none text-black"
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <option value="">일</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <img
                  src={dropDownSvg}
                  alt="dropdown"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            {errors.birthDate && (
              <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
            )}
          </div>

          {/* 지역 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-2">
              지역
            </label>
            <div className="relative">
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`w-full px-4 py-[0.7rem] pr-10 border-2 rounded-lg focus:outline-none bg-white text-sm outline-none appearance-none ${
                  errors.region
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#13D564] focus:border-[#13D564]"
                }`}
                style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <option value="">지역을 선택해주세요</option>
                <option value="전국">전국</option>
                <option value="서울특별시">서울특별시</option>
                <option value="부산광역시">부산광역시</option>
                <option value="대구광역시">대구광역시</option>
                <option value="인천광역시">인천광역시</option>
                <option value="광주광역시">광주광역시</option>
                <option value="대전광역시">대전광역시</option>
                <option value="울산광역시">울산광역시</option>
                <option value="세종특별자치시">세종특별자치시</option>
                <option value="경기도">경기도</option>
                <option value="강원도">강원도</option>
                <option value="충청북도">충청북도</option>
                <option value="충청남도">충청남도</option>
                <option value="전라북도">전라북도</option>
                <option value="전라남도">전라남도</option>
                <option value="경상북도">경상북도</option>
                <option value="경상남도">경상남도</option>
                <option value="제주특별자치도">제주특별자치도</option>
              </select>
              <img
                src={dropDownSvg}
                alt="dropdown"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
            {errors.region && (
              <p className="text-red-500 text-xs mt-1">{errors.region}</p>
            )}
          </div>

          {/* 학력 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-2">
              학력
            </label>
            <div className="relative">
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none"
                style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <option value="">학력을 선택해주세요</option>
                <option value="고졸 미만">고졸 미만</option>
                <option value="고교 재학">고교 재학</option>
                <option value="고졸 예정">고졸 예정</option>
                <option value="고교 졸업">고교 졸업</option>
                <option value="대학 재학">대학 재학</option>
                <option value="대졸 예정">대졸 예정</option>
                <option value="대학 졸업">대학 졸업</option>
                <option value="석박사">석박사</option>
                <option value="기타">기타</option>
                <option value="제한없음">제한없음</option>
              </select>
              <img
                src={dropDownSvg}
                alt="dropdown"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* 소득분위 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-2">
              소득분위
            </label>

            {/* 탭 스타일의 선택 버튼 */}
            <div className="flex mb-3 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIncomeInputType("dropdown")}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  incomeInputType === "dropdown"
                    ? "bg-white text-[#13D564] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                직접 선택
              </button>
              <button
                type="button"
                onClick={() => setIncomeInputType("manual")}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  incomeInputType === "manual"
                    ? "bg-white text-[#13D564] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                소득으로 계산
              </button>
            </div>

            {/* 드롭다운 선택 */}
            {incomeInputType === "dropdown" && (
              <div className="relative">
                <select
                  name="incomeLevel"
                  value={formData.incomeLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none"
                  style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <option value="">소득분위를 선택해주세요</option>
                  <option value="1분위">1분위</option>
                  <option value="2분위">2분위</option>
                  <option value="3분위">3분위</option>
                  <option value="4분위">4분위</option>
                  <option value="5분위">5분위</option>
                  <option value="6분위">6분위</option>
                  <option value="7분위">7분위</option>
                  <option value="8분위">8분위</option>
                  <option value="9분위">9분위</option>
                  <option value="10분위">10분위</option>
                </select>
                <img
                  src={dropDownSvg}
                  alt="dropdown"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
              </div>
            )}

            {/* 소득 직접 입력 */}
            {incomeInputType === "manual" && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="2500"
                      value={manualIncome}
                      onChange={handleManualIncomeChange}
                      className="w-full px-4 py-3 pr-12 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">
                      만원
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={calculateIncomeLevel}
                    className="px-5 py-3 bg-[#13D564] text-white rounded-lg text-sm font-medium hover:bg-[#0FB055] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    계산
                  </button>
                </div>

                {calculatedLevel && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-semibold">
                      {calculatedLevel}
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      중위소득 대비{" "}
                      {Math.round(
                        ((parseInt(manualIncome) * 10000) / 2392013) * 100 * 10
                      ) / 10}
                      %
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-end">
                  <a
                    href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#13D564] hover:text-[#0FB055] transition-colors underline"
                  >
                    자신의 소득 수준을 모르겠다면?
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 고용상태 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-2">
              고용상태
            </label>
            <div className="relative">
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none"
                style={{ WebkitAppearance: "none", MozAppearance: "none" }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <option value="">고용 상태를 선택해주세요</option>
                <option value="재직자">재직자</option>
                <option value="자영업자">자영업자</option>
                <option value="미취업자">미취업자</option>
                <option value="프리랜서">프리랜서</option>
                <option value="일용근로자">일용근로자</option>
                <option value="(예비)창업자">(예비)창업자</option>
                <option value="단기근로자">단기근로자</option>
                <option value="영농종사자">영농종사자</option>
                <option value="기타">기타</option>
                <option value="제한없음">제한없음</option>
              </select>
              <img
                src={dropDownSvg}
                alt="dropdown"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* 관심분야 */}
          <div className="mb-8">
            <label className="block text-left text-[#00B44B]  text-sm font-semibold mb-4">
              관심분야
            </label>
            <div className="grid grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-2 py-2 rounded-full text-[0.7rem] font-medium transition-colors cursor-pointer ${
                    formData.interests.includes(interest)
                      ? "bg-[#FFFFFF] text-[#121212] border-2 border-[#13D564]"
                      : "bg-[#F0F0F0] text-[#121212] border-2 border-transparent"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* 에러 메시지 */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{submitError}</p>
            </div>
          )}

          {/* 등록하기 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg font-medium py-3 text-[0.85rem] mb-4 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#13D564] hover:bg-[#0FB055] cursor-pointer"
            } text-white transition-colors`}
          >
            {loading ? "등록하는 중..." : "등록하기"}
          </button>

          {/* 건너뛰기 링크 */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center text-green-600 hover:text-green-700 transition-colors py-2 text-[0.85rem] cursor-pointer"
          >
            건너뛰기
          </button>
        </form>
      </div>
    </div>
  );
}
