import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg";
import MenuBar from "../components/layout/MenuBar";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  
  // URL에서 검색어 가져오기
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';

  // 더미 검색 결과 데이터
  const searchResults = [
    {
      id: 1,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "오늘 마감",
      deadlineColor: "#FF4D4D"
    },
    {
      id: 2,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-3",
      deadlineColor: "#4A90E2"
    },
    {
      id: 3,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-50 +",
      deadlineColor: "#4A90E2"
    },
    {
      id: 4,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "오늘 마감",
      deadlineColor: "#FF4D4D"
    },
    {
      id: 5,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-3",
      deadlineColor: "#4A90E2"
    },
    {
      id: 6,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-50 +",
      deadlineColor: "#4A90E2"
    }
  ];

  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    if (currentSearchTerm.trim()) {
      navigate(`/search-result?q=${encodeURIComponent(currentSearchTerm.trim())}`);
      window.location.reload(); // 페이지 새로고침으로 결과 업데이트
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
        <div className="ml-3 mb-2 mt-4">
          <h2 className="text-[#121212] font-['Pretendard'] text-xl font-semibold">
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
                className="w-full px-4 py-[0.7rem] pr-12 border-2 border-[#13D564] rounded-full focus:outline-none text-sm text-black"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex justify-end mb-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#666666]">정확도순</span>
            <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 검색 결과 리스트 */}
        <div className="space-y-0 mb-20">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start">
                {/* 왼쪽: 북마크 아이콘 */}
                <div className="mr-3 mt-1 cursor-pointer" onClick={() => toggleBookmark(item.id)}>
                  <img 
                    src={bookmarkedItems.has(item.id) ? bookmarkOIcon : bookmarkXIcon}
                    alt="북마크"
                    width="20"
                    height="23"
                  />
                </div>

                {/* 중간: 제목과 설명 */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#000000] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed mb-2">
                    {item.description}
                  </p>
                  
                  {/* 태그들 */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs text-[#A6A6A6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 오른쪽: 마감일 */}
                <div className="ml-3">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      color: item.deadlineColor,
                      backgroundColor: item.deadlineColor + "20"
                    }}
                  >
                    {item.deadline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
      <MenuBar />
    </div>
  );
}
