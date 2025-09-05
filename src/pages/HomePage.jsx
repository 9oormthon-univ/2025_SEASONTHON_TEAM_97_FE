import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";

export default function Homepage() {
  const navigate = useNavigate();
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedPolicies = async () => {
      try {
        const response = await policyAPI.getRecommendedPolicies();
        if (response.success && response.data) {
          setRecommendedPolicies(response.data);
        } else {
          setRecommendedPolicies([]);
        }
      } catch (error) {
        console.error("추천 정책 가져오기 실패:", error);
        setRecommendedPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPolicies();
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
          {/* 첫 번째 카드 */}
          <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
            <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
              매칭률 90%
            </div>
            <div className="text-white mt-1">
              <h3 className="font-['Pretendard'] text-xl font-bold mb-1">
                [국가 장학금]
              </h3>
              <p className="font-['Pretendard'] text-base font-medium mb-1">
                최대 300만원
              </p>
              <p className="font-['Pretendard'] text-sm absolute bottom-6">
                2025.09.27 ~ 2025.12.21
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <button className="text-white text-sm font-['Pretendard'] cursor-pointer">
                더보기
              </button>
            </div>
          </div>

          {/* 두 번째 카드 (일부만 보이도록) */}
          <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
            <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
              매칭률 90%
            </div>
            <div className="text-white mt-1">
              <h3 className="font-['Pretendard'] text-xl font-bold mb-1">
                [국가 장학금]
              </h3>
              <p className="font-['Pretendard'] text-base font-medium mb-1">
                최대 300만원
              </p>
              <p className="font-['Pretendard'] text-sm absolute bottom-6">
                2025.09.27 ~ 2025.12.21
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <button className="text-white text-sm font-['Pretendard'] cursor-pointer">
                더보기
              </button>
            </div>
          </div>
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
