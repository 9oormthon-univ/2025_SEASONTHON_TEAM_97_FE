import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg";
import MenuBar from "../components/layout/MenuBar";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  
  // URL에서 검색어 가져오기
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';

  // API에서 검색 결과 가져오기
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          setLoading(true);
          const response = await policyAPI.searchPolicies(searchTerm);
          if (response.success && response.data) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("검색 실패:", error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
    setCurrentSearchTerm(searchTerm);
  }, [searchTerm]);

  // 마감일 색상 결정 함수
  const getDeadlineColor = (deadline) => {
    if (deadline.includes("오늘") || deadline.includes("D-0")) return "#FF4D4D";
    if (deadline.includes("D-") && parseInt(deadline.match(/\d+/)?.[0]) <= 7) return "#FF4D4D";
    if (deadline === "상시") return "#22C55E";
    return "#4A90E2";
  };

  // 검색 기능
  const handleSearch = (e) => {
    e.preventDefault();
    if (currentSearchTerm.trim()) {
      navigate(`/search-result?q=${encodeURIComponent(currentSearchTerm.trim())}`);
    }
  };

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

  // 검색어 하이라이트 함수
  const highlightSearchTerm = (text, searchTerm) => {
    if (!text || !searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4">
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

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-5">
        {/* 검색 결과 헤더 */}
        <div className="ml-3 mb-2 mt-4">
          <h2 className="font-['Pretendard']" style={{ width: '18.75rem', height: '1.125rem', flexShrink: 0, color: '#464646', fontSize: '1rem', fontWeight: 600, lineHeight: 'normal' }}>
            "{searchTerm}"과 관련된 정보
          </h2>
        </div>

        {/* 검색바 */}
        <div className="mb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={currentSearchTerm}
                onChange={(e) => setCurrentSearchTerm(e.target.value)}
                placeholder="검색어를 입력해주세요."
                className="px-4 pr-12 focus:outline-none text-sm text-black placeholder-[#D5E5DC]"
                style={{ width: '20rem', height: '2.25rem', flexShrink: 0, borderRadius: '1.3125rem', border: '1px solid #13D564', background: '#FFF' }}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle 
                    cx="11" 
                    cy="11" 
                    r="8" 
                    stroke="#13D564" 
                    strokeWidth="2"
                  />
                  <path 
                    d="m21 21-4.35-4.35" 
                    stroke="#13D564" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex justify-end mb-1">
          <div className="flex items-center space-x-2">
            <span className="font-['Pretendard'] flex flex-col justify-center" style={{ display: 'flex', width: '2.625rem', height: '0.75rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', textAlign: 'center', fontSize: '0.75rem', fontWeight: 500, lineHeight: 'normal' }}>정확도순</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 검색 결과 리스트 */}
        <div className="space-y-0 mb-20">
          {loading ? (
            <div className="text-center text-[#666] py-8">
              검색 결과를 불러오는 중...
            </div>
          ) : (
            // 항상 5개 항목 표시 (AllRecommendations와 동일한 구조)
            Array.from({ length: 5 }).map((_, index) => {
              const item = searchResults[index];
              return (
                <div key={index} className="p-3 last:border-b-0 min-h-[4.5rem] flex" style={{ borderBottom: index < 4 ? '1px solid #E9E9E9' : 'none' }}>
                  {/* 북마크 아이콘 */}
                  <button
                    onClick={() => item && toggleBookmark(item.id)}
                    className="flex-shrink-0 cursor-pointer mr-3 mt-1"
                    disabled={!item}
                  >
                    <img
                      src={item && bookmarkedItems.has(item.id) ? bookmarkOIcon : bookmarkXIcon}
                      alt="북마크"
                      className=""
                      style={{ 
                        width: '1rem', 
                        height: '1.1875rem', 
                        flexShrink: 0, 
                        aspectRatio: '16/19', 
                        fill: '#D5D5D5',
                        opacity: item ? 1 : 0.3 
                      }}
                    />
                  </button>
                  
                  {/* 콘텐츠 영역 */}
                  <div className="flex-1 flex flex-col">
                    {/* 태그들 - 맨 위로 이동 */}
                    <div className="flex flex-wrap gap-1 mb-1 min-h-[16px]">
                      {item?.plcyKywdNm ? (
                        item.plcyKywdNm.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="font-['Pretendard'] text-[0.625rem] flex flex-col justify-center" style={{ display: 'flex', width: '3.3125rem', height: '0.625rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#A2A2A2', textAlign: 'right', fontWeight: 400, lineHeight: 'normal' }}>
                            #{highlightSearchTerm(tag, searchTerm)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#999]">
                          #태그없음
                        </span>
                      )}
                      {item?.plcyKywdNm && item.plcyKywdNm.length > 3 && (
                        <span className="text-xs text-[#999]">
                          +{item.plcyKywdNm.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 제목 */}
                    <h3 className="font-['Pretendard'] text-[0.75rem] mb-1 overflow-hidden text-ellipsis flex flex-col justify-center" style={{ display: 'flex', width: '19.875rem', height: '0.875rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', fontWeight: 700, lineHeight: 'normal' }}>
                      {item?.plcyNm ? (
                        highlightSearchTerm(item.plcyNm, searchTerm)
                      ) : (
                        `"${searchTerm}"에 대한 검색 결과를 불러올 수 없습니다`
                      )}
                    </h3>
                    
                    {/* 설명과 마감일을 같은 높이에 배치 */}
                    <div className="flex items-center justify-between">
                      {/* 설명 */}
                      <p className="font-['Pretendard'] text-[0.75rem] overflow-hidden text-ellipsis flex flex-col justify-center flex-1 mr-2" style={{ display: 'flex', width: '16.1875rem', height: '1.625rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', fontWeight: 400, lineHeight: 'normal' }}>
                        {item?.plcyExplnCn ? (
                          highlightSearchTerm(item.plcyExplnCn, searchTerm)
                        ) : (
                          "정책 설명을 불러올 수 없습니다"
                        )}
                      </p>
                      
                      {/* 마감일 */}
                      <span 
                        className="font-['Pretendard'] text-xs font-medium flex-shrink-0"
                        style={{ 
                          width: '4rem',
                          height: '1.875rem',
                          flexShrink: 0,
                          borderRadius: '0.875rem',
                          background: '#F0F0F0',
                          color: item?.deadline ? getDeadlineColor(item.deadline) : "#999",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
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

      {/* 하단 네비게이션 바 */}
      <MenuBar />
    </div>
  );
}