import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg";

export default function AllRecommendations() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [allPolicies, setAllPolicies] = useState([]);
  const [categorizedPolicies, setCategorizedPolicies] = useState({});
  const [loading, setLoading] = useState(true);

  // 카테고리 목록
  const categories = ["전체", "교육", "취업", "주거", "금융", "복지"];

  // API 데이터 로드
  useEffect(() => {
    const fetchAllPolicies = async () => {
      try {
        setLoading(true);
        const response = await policyAPI.getAllPolicies();
        if (response.success && response.data) {
          setAllPolicies(response.data);
          
          // 카테고리별로 데이터 분류
          const categorized = {
            "전체": response.data,
            "교육": response.data.filter(policy => 
              policy.plcyKywdNm?.some(keyword => 
                ["교육지원", "장기미취업청년", "육아", "출산"].includes(keyword)
              )
            ),
            "취업": response.data.filter(policy => 
              policy.plcyKywdNm?.some(keyword => 
                ["인턴", "벤처", "중소기업", "청년가장"].includes(keyword)
              )
            ),
            "주거": response.data.filter(policy => 
              policy.plcyKywdNm?.some(keyword => 
                ["바우처", "해외진출", "주거지원", "공공임대주택"].includes(keyword)
              )
            ),
            "금융": response.data.filter(policy => 
              policy.plcyKywdNm?.some(keyword => 
                ["대출", "보조금", "금리혜택", "신용회복"].includes(keyword)
              )
            ),
            "복지": response.data.filter(policy => 
              policy.plcyKywdNm?.some(keyword => 
                ["맞춤형상담서비스"].includes(keyword)
              )
            )
          };
          
          setCategorizedPolicies(categorized);
        } else {
          setAllPolicies([]);
          setCategorizedPolicies({
            "전체": [],
            "교육": [],
            "취업": [],
            "주거": [],
            "금융": [],
            "복지": []
          });
        }
      } catch (error) {
        console.error("정책 데이터 가져오기 실패:", error);
        setAllPolicies([]);
        setCategorizedPolicies({
          "전체": [],
          "교육": [],
          "취업": [],
          "주거": [],
          "금융": [],
          "복지": []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolicies();
  }, []);

  // 현재 선택된 카테고리의 정책들 가져오기
  const getCurrentPolicies = () => {
    return categorizedPolicies[selectedCategory] || [];
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // 북마크 토글 함수
  const toggleBookmark = (itemId) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // 마감일 색상 결정 함수
  const getDeadlineColor = (deadline) => {
    if (deadline.includes("오늘") || deadline.includes("D-0")) return "#FF4D4D";
    if (deadline.includes("D-") && parseInt(deadline.match(/\d+/)?.[0]) <= 7) return "#FF4D4D";
    if (deadline === "상시") return "#22C55E";
    return "#4A90E2";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col bg-[#FAFAF8]">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <button
            onClick={handleBackClick}
            className="p-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#13D564" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <div className="w-8"></div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* 제목 */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#121212] text-left">
              원하는 키워드를 선택하세요!
            </h1>
          </div>

          {/* 카테고리 선택 */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? "bg-[#FFFFFF] text-[#121212] border-2 border-[#13D564]"
                      : "bg-[#F0F0F0] text-[#121212] border-2 border-transparent"
                  }`}
                >
                  #{category}
                </button>
              ))}
            </div>
          </div>

          {/* 정책 리스트 */}
          <div className="space-y-0 mb-20">
            {loading ? (
              <div className="text-center text-[#666] py-8">
                정책을 불러오는 중...
              </div>
            ) : (
              // 항상 6개 항목 표시 (세로 리스트)
              Array.from({ length: 6 }).map((_, index) => {
                const item = getCurrentPolicies()[index];
                return (
                  <div key={index} className="bg-white p-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      {/* 제목 */}
                      <h3 className="text-sm font-medium text-[#000000] flex-1 pr-3">
                        {item?.plcyNm || "정책을 불러올 수 없습니다"}
                      </h3>
                      {/* 북마크 아이콘 */}
                      <button
                        onClick={() => item && toggleBookmark(item.id)}
                        className="flex-shrink-0 cursor-pointer"
                        disabled={!item}
                      >
                        <img
                          src={item && bookmarkedItems.has(item.id) ? bookmarkOIcon : bookmarkXIcon}
                          alt="북마크"
                          className="w-5 h-5"
                          style={{ opacity: item ? 1 : 0.3 }}
                        />
                      </button>
                    </div>
                    
                    {/* 설명 */}
                    <p className="text-xs text-[#666] mb-2">
                      {item?.plcyExplnCn || "설명을 불러올 수 없습니다"}
                    </p>
                    
                    {/* 태그들 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item?.plcyKywdNm ? (
                        item.plcyKywdNm.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs text-[#13D564]">
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#999]">
                          #태그없음
                        </span>
                      )}
                    </div>
                    
                    {/* 마감일 */}
                    <div className="flex justify-end">
                      <span 
                        className="text-xs font-medium"
                        style={{ color: item?.deadline ? getDeadlineColor(item.deadline) : "#999" }}
                      >
                        {item?.deadline || "-"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}