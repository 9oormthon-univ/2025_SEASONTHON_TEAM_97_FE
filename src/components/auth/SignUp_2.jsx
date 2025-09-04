import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/cheongchun-sketch.svg";
import dropDownSvg from "../../assets/icons/drop-down.svg";
import { api } from "../../services/api.js";

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

  // 특화 분야 옵션들
  const interestOptions = [
    "중소기업",
    "여성",
    "저소득층",
    "장애인",
    "농업인",
    "군인",
    "지역인재",
  ];

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
      if (
        Object.values(formData).some((value) =>
          Array.isArray(value) ? value.length > 0 : value !== ""
        )
      ) {
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
    }, 1000);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // 회원가입 1단계 데이터 가져오기
        const signupStep1Data = JSON.parse(
          localStorage.getItem("signupStep1Data") || "{}"
        );

        // 생년월일 합치기
        const birthDate = `${formData.birthYear}/${formData.birthMonth.padStart(
          2,
          "0"
        )}/${formData.birthDay.padStart(2, "0")}`;

        // 회원가입 2단계 데이터 구성
        const signupStep2Data = {
          step: 2,
          birthDate: birthDate,
          region: formData.region,
          school: formData.school,
          incomeLevel: formData.incomeLevel,
          employmentStatus: formData.employmentStatus,
          interests: formData.interests,
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
          login_id: localStorage.getItem("tempUserId") || "kakao_user",
          password: localStorage.getItem("tempPassword") || "kakao_auth",
          name: localStorage.getItem("tempNickname") || "사용자",
          birth: birthDate.replace(/\//g, "-"),
          location: formData.region,
          organization_status: formData.employmentStatus === "학생" ? 0 : 1,
          financial_status: formData.incomeLevel
            ? parseInt(formData.incomeLevel)
            : 0,
          goal: 0,
          created_at: new Date().toISOString().split("T")[0],
          kakao_id: kakaoUserData.id || null,
          email: kakaoUserData.email || null,
          profile_image: kakaoUserData.profile_image || null,
        };

        console.log("=== 최종 제출 데이터 ===");
        console.log("백엔드로 전송할 데이터:", userData);
        console.log("전체 회원가입 데이터:", completeSignupData);
        console.log("================================");

        // 백엔드 API 호출
        try {
          const result = await api.post("/api/register", {
            userData: userData,
            completeSignupData: completeSignupData,
          });

          console.log("회원가입 성공:", result);

          // 임시 저장된 데이터 삭제
          localStorage.removeItem("tempUserId");
          localStorage.removeItem("tempPassword");
          localStorage.removeItem("tempNickname");
          localStorage.removeItem("signupStep1Data");

          // 로그인 성공 페이지로 이동
          navigate("/login-success");
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

        <form onSubmit={handleSubmit} className="flex-1 pb-6" style={{ width: "90%", maxWidth: "20rem", margin: "0 auto" }}>
          {/* 생년월일 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-2">
              생년월일
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  className="w-full px-4 py-[0.7rem] pr-10 border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] bg-white text-sm outline-none appearance-none text-black"
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
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-2">
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
              >
                <option value="">지역을 선택해주세요</option>
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
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-2">
              학력
            </label>
            <div className="relative">
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-500 bg-white text-sm outline-none appearance-none"
              >
                <option value="">학력을 선택해주세요</option>
                <option value="고졸 미만">고졸 미만</option>
                <option value="고교 재학">고교 재학</option>
                <option value="고졸 예정">고졸 예정</option>
                <option value="고교 졸업">고교 졸업</option>
                <option value="대학 재학">대학 재학</option>
                <option value="대졸 예정">대졸 예정</option>
                <option value="대학 졸업">대학 졸업</option>
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
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-2">
              소득분위
            </label>
            <div className="relative">
              <select
                name="incomeLevel"
                value={formData.incomeLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-500 bg-white text-sm outline-none appearance-none"
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
          </div>

          {/* 고용상태 */}
          <div className="mb-6">
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-2">
              고용상태
            </label>
            <div className="relative">
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-500 bg-white text-sm outline-none appearance-none"
              >
                <option value="">고용 상태를 선택해주세요</option>
                <option value="미취업자">미취업자</option>
                <option value="재직자">재직자</option>
                <option value="자영업자">자영업자</option>
                <option value="프리랜서">프리랜서</option>
                <option value="일용근로자">일용근로자</option>
                <option value="단기근로자">단기근로자</option>
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
            <label className="block text-left text-[#00B44B] font-['Pretendard'] text-sm font-semibold mb-4">
              관심분야
            </label>
            <div className="grid grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-3 rounded-full text-[0.85rem] font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? "bg-[#13D564] text-white"
                      : "bg-[#AEEAC7] text-[#00B44B]"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* 등록하기 버튼 */}
          <button
            type="submit"
            className="w-full bg-[#13D564] text-white rounded-lg font-medium py-4 text-[0.85rem] mb-4"
          >
            등록하기
          </button>

          {/* 건너뛰기 링크 */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-center text-green-600 hover:text-green-700 transition-colors py-2 text-[0.85rem]"
          >
            건너뛰기
          </button>
        </form>
      </div>
    </div>
  );
}
