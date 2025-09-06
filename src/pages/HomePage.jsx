import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";
import clippageButton from "../assets/icons/clippage-button.svg";

export default function Homepage() {
  const navigate = useNavigate();
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [scholarshipCards, setScholarshipCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 추천 정책과 장학금 카드 데이터를 병렬로 가져오기
        const [recommendedResponse, scholarshipResponse] = await Promise.all([
          policyAPI.getRecommendedPolicies(),
          policyAPI.getAllPolicies(), // 장학금 카드용 데이터
        ]);

        if (recommendedResponse.success && recommendedResponse.data) {
          setRecommendedPolicies(recommendedResponse.data);
        } else {
          setRecommendedPolicies([]);
        }

        if (scholarshipResponse.success && scholarshipResponse.data) {
          // 장학금 관련 정책만 필터링하여 상위 2개 사용
          const scholarships = scholarshipResponse.data
            .filter((policy) => policy.plcyNm && policy.plcyNm.includes("장학"))
            .slice(0, 2);
          setScholarshipCards(scholarships);

          // 새로운 추천 정책이 있으면 알람 표시 (현재는 dev 버튼으로만 테스트)
          // if (recommendedResponse.success && recommendedResponse.data && recommendedResponse.data.length > 0) {
          //   const firstPolicy = recommendedResponse.data[0];
          //   const userName = localStorage.getItem('userName') || '사용자';
          //
          //   showRecommendationAlarm({
          //     userName: userName,
          //     category: '청년',
          //     policyName: firstPolicy.plcyNm || '정책',
          //     count: recommendedResponse.data.length - 1
          //   });
          // }
        } else {
          setScholarshipCards([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setRecommendedPolicies([]);
        setScholarshipCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreClick = () => {
    navigate("/all-recommendations");
  };

  const getDeadlineColor = (deadline) => {
    if (deadline.includes("오늘") || deadline.includes("D-0")) return "#FF4D4D";
    if (deadline.includes("D-") && parseInt(deadline.match(/\d+/)?.[0]) <= 7)
      return "#FF4D4D";
    if (deadline === "상시") return "#22C55E";
    return "#4A90E2";
  };

  // 지원금액 정보 추출 함수
  const extractAmount = (sprtCn) => {
    if (!sprtCn) return "지원내용 확인 필요";

    // 다양한 금액 패턴 매칭
    const patterns = [
      // "최대 300만원", "최대 500만원까지"
      /(최대|최고)\s*(\d+[,\d]*)\s*(만원|원)/i,
      // "월 50만원", "매월 100만원"
      /(월|매월)\s*(\d+[,\d]*)\s*(만원|원)/i,
      // "연 1,200만원", "년 600만원"
      /(연|년|연간)\s*(\d+[,\d]*)\s*(만원|원)/i,
      // "300만원 지원", "500만원까지"
      /(\d+[,\d]*)\s*(만원|원)\s*(지원|까지|한도)/i,
      // "등록금 전액", "학비 100%"
      /(등록금|학비|수업료)\s*(전액|100%|지원)/i,
      // 단순 숫자 + 원 (마지막 매칭)
      /(\d+[,\d]*)\s*(만원|원)/i,
    ];

    for (const pattern of patterns) {
      const match = sprtCn.match(pattern);
      if (match) {
        if (pattern.source.includes("전액|100%")) {
          return "등록금 전액 지원";
        }

        const prefix = match[1];
        const amount = match[2];
        const unit = match[3];

        // 접두사가 숫자인 경우 (단순 금액)
        if (/\d/.test(prefix)) {
          return `최대 ${prefix}${unit}`;
        }

        // 접두사가 있는 경우
        return `${prefix} ${amount}${unit}`;
      }
    }

    // 금액 정보가 없으면 짧은 설명으로 대체
    if (sprtCn.length > 15) {
      return sprtCn.substring(0, 15) + "...";
    }

    return sprtCn || "지원내용 확인 필요";
  };
  return (
    <div className="w-full bg-[#FAFAF8]">
      <div className="mx-auto pt-6">
        {/* 비슷한 연령대 추천 */}
        <div className="mb-1.5">
          <h1
            className="ml-8 text-[#121212]  text-[1.25rem] font-semibold leading-normal text-left flex flex-col justify-center"
            style={{
              fontWeight: 600,
              display: "flex",
              width: "16.5625rem",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            비슷한 연령대 추천
          </h1>
        </div>

        {/* 장학금 카드들 */}
        <div className="ml-5 flex gap-6 mb-6 overflow-x-auto">
          {loading ? (
            // 로딩 중 스켈레톤
            <>
              <div className="min-w-[280px] h-[200px] bg-gray-200 rounded-[18px] animate-pulse"></div>
              <div className="min-w-[280px] h-[200px] bg-gray-200 rounded-[18px] animate-pulse"></div>
            </>
          ) : scholarshipCards.length > 0 ? (
            // 실제 장학금 데이터
            scholarshipCards.map((scholarship, index) => (
              <div
                key={scholarship.id || index}
                className="p-5 relative"
                style={{
                  borderRadius: "18px",
                  border: "2px solid #13D564",
                  background: "#13D564",
                  width: "17.5rem",
                  height: "12.5rem",
                  flexShrink: 0,
                }}
              >
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E]  text-[0.625rem] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3
                    className=" text-[1.5rem] mb-0.5 leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "160px",
                      height: "27px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {scholarship.plcyNm || "[장학금 정책]"}
                  </h3>
                  <p
                    className=" text-[1rem] leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "127px",
                      height: "16px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {extractAmount(scholarship.sprtCn)}
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p
                    className=" text-[0.75rem] leading-normal"
                    style={{ color: "#FFF", fontWeight: 300 }}
                  >
                    {scholarship.aplyYmd || "신청기간 정보 없음"}
                  </p>
                  <button
                    className=" text-[0.625rem] cursor-pointer leading-normal"
                    style={{
                      color: "#FFF",
                      textAlign: "right",
                      fontWeight: 500,
                    }}
                  >
                    더보기
                  </button>
                </div>
              </div>
            ))
          ) : (
            // 데이터가 없을 때 기본 카드
            <>
              <div
                className="p-5 relative"
                style={{
                  borderRadius: "18px",
                  border: "2px solid #13D564",
                  background: "#13D564",
                  width: "17.5rem",
                  height: "12.5rem",
                  flexShrink: 0,
                }}
              >
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E]  text-[0.625rem] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3
                    className=" text-[1.5rem] mb-0.5 leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "170px",
                      height: "27px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    [장학금 정책]
                  </h3>
                  <p
                    className=" text-[1rem] leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "170px",
                      height: "16px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    지원내용 확인 필요
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p
                    className=" text-[0.75rem] leading-normal"
                    style={{ color: "#FFF", fontWeight: 300 }}
                  >
                    신청기간 정보 없음
                  </p>
                  <button
                    className=" text-[0.625rem] cursor-pointer leading-normal"
                    style={{
                      color: "#FFF",
                      textAlign: "right",
                      fontWeight: 500,
                    }}
                  >
                    더보기
                  </button>
                </div>
              </div>
              <div
                className="p-5 relative"
                style={{
                  borderRadius: "18px",
                  border: "2px solid #13D564",
                  background: "#13D564",
                  width: "17.5rem",
                  height: "12.5rem",
                  flexShrink: 0,
                }}
              >
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E]  text-[0.625rem] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3
                    className=" text-[1.5rem] mb-0.5 leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "170px",
                      height: "27px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    [장학금 정책]
                  </h3>
                  <p
                    className=" text-[1rem] leading-normal flex flex-col justify-center"
                    style={{
                      color: "#FFF",
                      fontWeight: 500,
                      display: "flex",
                      width: "170px",
                      height: "16px",
                      flexDirection: "column",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    지원내용 확인 필요
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p
                    className=" text-[0.75rem] leading-normal"
                    style={{ color: "#FFF", fontWeight: 300 }}
                  >
                    신청기간 정보 없음
                  </p>
                  <button
                    className=" text-[0.625rem] cursor-pointer leading-normal"
                    style={{
                      color: "#FFF",
                      textAlign: "right",
                      fontWeight: 500,
                    }}
                  >
                    더보기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 맞춤 추천 제목 */}
        <div className="mb-1.5">
          <h1 className="ml-8 text-[#000000]  text-xl font-semibold leading-normal">
            맞춤 추천
          </h1>
        </div>

        {/* 추천 리스트 */}
        <div className="ml-5 rounded-xl mb-5 mr-5">
          {loading ? (
            <div className="p-4 text-center text-[#666] ">
              추천 정책을 불러오는 중...
            </div>
          ) : (
            <>
              {/* 항상 기본 구조 표시 */}
              {[0, 1, 2].map((index) => {
                const policy = recommendedPolicies[index];
                return (
                  <div key={index}>
                    <div className="p-3">
                      <p
                        className="text-[0.75rem] text-[#121212]  leading-normal"
                        style={{ fontWeight: 600 }}
                      >
                        {policy?.plcyNm ||
                          "API에서 추천 정책을 불러올 수 없습니다."}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p
                          className="text-[0.625rem] text-[#121212]  leading-normal flex-1 mr-2"
                          style={{ fontWeight: 400 }}
                        >
                          {policy?.plcyExplnCn ||
                            "정책 설명을 불러올 수 없습니다."}
                        </p>
                        <span
                          className="text-xs  font-medium flex-shrink-0"
                          style={{
                            color: policy?.deadline
                              ? getDeadlineColor(policy.deadline)
                              : "#666",
                          }}
                        >
                          {policy?.deadline || "-"}
                        </span>
                      </div>
                      {policy?.plcyKywdNm && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {policy.plcyKywdNm.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs text-[#13D564] "
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {index < 2 && (
                      <div
                        style={{
                          width: "100vw",
                          marginLeft: "-1.25rem", // ml-5를 상쇄하여 화면 끝에서 시작
                          height: "0",
                          flexShrink: 0,
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* 더보기 버튼 */}
        <div className="flex justify-center mr-5 mb-20">
          <button
            onClick={handleMoreClick}
            className=" text-[0.625rem] cursor-pointer leading-normal"
            style={{ color: "#D5D5D5", textAlign: "center", fontWeight: 700 }}
          >
            더보기
          </button>
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={() => navigate("/scrap")}
        className="fixed bottom-20 right-5 z-50 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="스크랩 페이지로 이동"
        style={{
          width: "4rem",
          height: "4rem",
          flexShrink: 0,
          borderRadius: "4rem",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <img
          src={clippageButton}
          alt="스크랩 버튼"
          style={{
            width: "4rem",
            height: "4rem",
            objectFit: "contain",
          }}
        />
      </button>
    </div>
  );
}
