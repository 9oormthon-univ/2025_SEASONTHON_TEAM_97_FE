import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";

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
          policyAPI.getAllPolicies() // 장학금 카드용 데이터
        ]);

        if (recommendedResponse.success && recommendedResponse.data) {
          setRecommendedPolicies(recommendedResponse.data);
        } else {
          setRecommendedPolicies([]);
        }

        if (scholarshipResponse.success && scholarshipResponse.data) {
          // 장학금 관련 정책만 필터링하여 상위 2개 사용
          const scholarships = scholarshipResponse.data
            .filter(policy => policy.plcyNm && policy.plcyNm.includes('장학'))
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
    if (deadline.includes("D-") && parseInt(deadline.match(/\d+/)?.[0]) <= 7) return "#FF4D4D";
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
      /(\d+[,\d]*)\s*(만원|원)/i
    ];
    
    for (const pattern of patterns) {
      const match = sprtCn.match(pattern);
      if (match) {
        if (pattern.source.includes('전액|100%')) {
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
      <div className="ml-5 mx-auto pt-6">
        {/* 비슷한 연령대 추천 */}
        <div className="mb-1.5">
          <h1 className="ml-3 text-[#121212] font-['Pretendard'] text-xl font-semibold leading-normal text-left">
            비슷한 연령대 추천
          </h1>
        </div>

        {/* 장학금 카드들 */}
        <div className="flex gap-6 mb-6 overflow-x-auto">
          {loading ? (
            // 로딩 중 스켈레톤
            <>
              <div className="min-w-[280px] h-[200px] bg-gray-200 rounded-[18px] animate-pulse"></div>
              <div className="min-w-[280px] h-[200px] bg-gray-200 rounded-[18px] animate-pulse"></div>
            </>
          ) : scholarshipCards.length > 0 ? (
            // 실제 장학금 데이터
            scholarshipCards.map((scholarship, index) => (
              <div key={scholarship.id || index} className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3 className="font-['Pretendard'] text-xl font-bold mb-0.5">
                    {scholarship.plcyNm || "[장학금 정책]"}
                  </h3>
                  <p className="font-['Pretendard'] text-base font-medium">
                    {extractAmount(scholarship.sprtCn)}
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p className="font-['Pretendard'] text-sm text-white">
                    {scholarship.aplyYmd || "신청기간 정보 없음"}
                  </p>
                  <button className="text-white text-sm font-['Pretendard'] cursor-pointer">
                    더보기
                  </button>
                </div>
              </div>
            ))
          ) : (
            // 데이터가 없을 때 기본 카드
            <>
              <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3 className="font-['Pretendard'] text-xl font-bold mb-0.5">
                    [장학금 정책]
                  </h3>
                  <p className="font-['Pretendard'] text-base font-medium">
                    지원내용 확인 필요
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p className="font-['Pretendard'] text-sm text-white">
                    신청기간 정보 없음
                  </p>
                  <button className="text-white text-sm font-['Pretendard'] cursor-pointer">
                    더보기
                  </button>
                </div>
              </div>
              <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
                <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
                  매칭률 90%
                </div>
                <div className="absolute bottom-14 left-5 right-6 text-white">
                  <h3 className="font-['Pretendard'] text-xl font-bold mb-0.5">
                    [장학금 정책]
                  </h3>
                  <p className="font-['Pretendard'] text-base font-medium">
                    지원내용 확인 필요
                  </p>
                </div>
                <div className="absolute bottom-6 left-5 right-6 flex justify-between items-center">
                  <p className="font-['Pretendard'] text-sm text-white">
                    신청기간 정보 없음
                  </p>
                  <button className="text-white text-sm font-['Pretendard'] cursor-pointer">
                    더보기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 맞춤 추천 제목 */}
        <div className="mb-1.5">
          <h1 className="ml-3 text-[#000000] font-['Pretendard'] text-xl font-semibold leading-normal">
            맞춤 추천
          </h1>
        </div>

        {/* 추천 리스트 */}
        <div className="bg-white rounded-xl mb-5 mr-5">
          {loading ? (
            <div className="p-4 text-center text-[#666] font-['Pretendard']">
              추천 정책을 불러오는 중...
            </div>
          ) : (
            <>
              {/* 항상 기본 구조 표시 */}
              {[0, 1, 2].map((index) => {
                const policy = recommendedPolicies[index];
                return (
                  <div 
                    key={index} 
                    className={`p-4 ${index < 2 ? 'border-b border-gray-100' : ''}`}
                  >
                    <p className="text-sm text-[#000000] font-['Pretendard'] font-medium">
                      {policy?.plcyNm || "API에서 추천 정책을 불러올 수 없습니다."}
                    </p>
                    <p className="text-xs text-[#666] font-['Pretendard'] mt-1">
                      {policy?.plcyExplnCn || "정책 설명을 불러올 수 없습니다."}
                    </p>
                    {policy?.plcyKywdNm && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {policy.plcyKywdNm.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs text-[#13D564] font-['Pretendard']"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-end mt-2">
                      <span 
                        className="text-xs font-['Pretendard'] font-medium"
                        style={{ color: policy?.deadline ? getDeadlineColor(policy.deadline) : "#666" }}
                      >
                        {policy?.deadline || "-"}
                      </span>
                    </div>
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
            className="text-[#D5D5D5] font-['Pretendard'] text-sm cursor-pointer"
          >
            더보기
          </button>
        </div>
      </div>

    </div>
  );
}
