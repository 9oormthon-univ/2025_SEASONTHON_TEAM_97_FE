import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg?url";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg?url";
import MenuBar from "../components/layout/MenuBar";

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
            전체: response.data,
            교육: response.data.filter((policy) =>
              policy.plcyKywdNm?.some((keyword) =>
                ["교육지원", "장기미취업청년", "육아", "출산"].includes(keyword)
              )
            ),
            취업: response.data.filter((policy) =>
              policy.plcyKywdNm?.some((keyword) =>
                ["인턴", "벤처", "중소기업", "청년가장"].includes(keyword)
              )
            ),
            주거: response.data.filter((policy) =>
              policy.plcyKywdNm?.some((keyword) =>
                ["바우처", "해외진출", "주거지원", "공공임대주택"].includes(
                  keyword
                )
              )
            ),
            금융: response.data.filter((policy) =>
              policy.plcyKywdNm?.some((keyword) =>
                ["대출", "보조금", "금리혜택", "신용회복"].includes(keyword)
              )
            ),
            복지: response.data.filter((policy) =>
              policy.plcyKywdNm?.some((keyword) =>
                ["맞춤형상담서비스"].includes(keyword)
              )
            ),
          };

          setCategorizedPolicies(categorized);
        } else {
          setAllPolicies([]);
          setCategorizedPolicies({
            전체: [],
            교육: [],
            취업: [],
            주거: [],
            금융: [],
            복지: [],
          });
        }
      } catch (error) {
        console.error("정책 데이터 가져오기 실패:", error);
        setAllPolicies([]);
        setCategorizedPolicies({
          전체: [],
          교육: [],
          취업: [],
          주거: [],
          금융: [],
          복지: [],
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
    console.log("북마크 토글 클릭:", itemId);
    if (!itemId) {
      console.log("itemId가 없습니다");
      return;
    }
    
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      const isCurrentlyBookmarked = newSet.has(itemId);
      
      if (isCurrentlyBookmarked) {
        newSet.delete(itemId);
        console.log("북마크 제거:", itemId);
      } else {
        newSet.add(itemId);
        console.log("북마크 추가:", itemId);
      }
      
      console.log("이전 북마크:", Array.from(prev));
      console.log("새로운 북마크:", Array.from(newSet));
      console.log("아이템", itemId, "북마크 상태:", !isCurrentlyBookmarked);
      
      return newSet;
    });
  };

  // 마감일 색상 결정 함수
  const getDeadlineColor = (deadline) => {
    if (deadline.includes("오늘") || deadline.includes("D-0")) return "#FF4D4D";
    if (deadline.includes("D-") && parseInt(deadline.match(/\d+/)?.[0]) <= 7)
      return "#FF4D4D";
    if (deadline === "상시") return "#22C55E";
    return "#4A90E2";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col bg-[#FAFAF8]">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 h-16 flex-shrink-0">
          <button
            onClick={handleBackClick}
            className="p-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#13D564"
                strokeWidth="3"
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
            <h1
              className="ml-3 text-[1.25rem]  text-left font-semibold leading-normal"
              style={{
                width: "18.75rem",
                height: "1.25rem",
                flexShrink: 0,
                color: "#464646",
                fontWeight: 600,
              }}
            >
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
                  className=" text-xs font-medium transition-colors cursor-pointer"
                  style={{
                    width: "4.5rem",
                    height: "1.5rem",
                    flexShrink: 0,
                    borderRadius: "0.75rem",
                    background:
                      selectedCategory === category ? "#FFFFFF" : "#F0F0F0",
                    color: "#121212",
                    border:
                      selectedCategory === category
                        ? "2px solid #13D564"
                        : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  #{category}
                </button>
              ))}
            </div>
          </div>

          {/* 정책 리스트 */}
          <div className="space-y-2 mb-20">
            {loading ? (
              <div className="text-center text-[#666] py-8">
                정책을 불러오는 중...
              </div>
            ) : (
              // 항상 6개 항목 표시 (세로 리스트)
              Array.from({ length: 6 }).map((_, index) => {
                const item = getCurrentPolicies()[index];
                return (
                  <div
                    key={index}
                    className="p-3 last:border-b-0 min-h-[4.5rem] flex"
                    style={{
                      borderBottom: index < 5 ? "1px solid #E9E9E9" : "none",
                    }}
                  >
                    {/* 북마크 아이콘 */}
                    <button
                      onClick={() => {
                        console.log("북마크 버튼 클릭됨, item:", item?.id);
                        if (item) {
                          toggleBookmark(item.id);
                        }
                      }}
                      className="flex-shrink-0 cursor-pointer mr-3 mt-1"
                      disabled={!item}
                    >
                      {item ? (
                        <img
                          src={
                            bookmarkedItems.has(item.id)
                              ? bookmarkOIcon
                              : bookmarkXIcon
                          }
                          alt={`북마크 ${bookmarkedItems.has(item.id) ? '활성' : '비활성'}`}
                          className=""
                          style={{
                            width: "1rem",
                            height: "1.1875rem",
                            flexShrink: 0,
                            aspectRatio: "16/19",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "1rem",
                            height: "1.1875rem",
                            backgroundColor: "#f0f0f0",
                            opacity: 0.3,
                          }}
                        />
                      )}
                    </button>

                    {/* 콘텐츠 영역 */}
                    <div className="flex-1 flex flex-col">
                      {/* 태그들 - 맨 위로 이동 */}
                      <div className="flex flex-wrap gap-1 mb-1 min-h-[16px]">
                        {item?.plcyKywdNm ? (
                          item.plcyKywdNm.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className=" text-[0.625rem] flex flex-col justify-center"
                              style={{
                                display: "flex",
                                width: "3.3125rem",
                                height: "0.625rem",
                                flexDirection: "column",
                                justifyContent: "center",
                                flexShrink: 0,
                                color: "#A2A2A2",
                                textAlign: "right",
                                fontWeight: 400,
                                lineHeight: "normal",
                              }}
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#999]">#태그없음</span>
                        )}
                        {item?.plcyKywdNm && item.plcyKywdNm.length > 3 && (
                          <span className="text-xs text-[#999]">
                            +{item.plcyKywdNm.length - 3}
                          </span>
                        )}
                      </div>

                      {/* 제목 */}
                      <h3
                        className=" text-[0.75rem] mb-1 overflow-hidden text-ellipsis flex flex-col justify-center"
                        style={{
                          display: "flex",
                          width: "19.875rem",
                          height: "0.875rem",
                          flexDirection: "column",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "#121212",
                          fontWeight: 700,
                          lineHeight: "normal",
                        }}
                      >
                        {item?.plcyNm || "정책을 불러올 수 없습니다"}
                      </h3>

                      {/* 설명과 마감일을 같은 높이에 배치 */}
                      <div className="flex items-center justify-between">
                        {/* 설명 */}
                        <p
                          className=" text-[0.75rem] overflow-hidden text-ellipsis flex flex-col justify-center flex-1 mr-2"
                          style={{
                            display: "flex",
                            width: "16.1875rem",
                            height: "1.625rem",
                            flexDirection: "column",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "#121212",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {item?.plcyExplnCn || "설명을 불러올 수 없습니다"}
                        </p>

                        {/* 마감일 */}
                        <span
                          className=" text-[0.625rem] font-medium flex-shrink-0"
                          style={{
                            width: "3rem",
                            height: "1.375rem",
                            flexShrink: 0,
                            borderRadius: "0.75rem",
                            background: "#F0F0F0",
                            color: item?.deadline
                              ? getDeadlineColor(item.deadline)
                              : "#999",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item?.deadline || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 네비게이션 바 */}
        <MenuBar />
      </div>
    </div>
  );
}
