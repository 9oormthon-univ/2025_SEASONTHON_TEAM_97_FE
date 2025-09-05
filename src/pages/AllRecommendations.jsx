import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg";

export default function AllRecommendations() {
  const navigate = useNavigate();
  
  // 북마크 상태 관리
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
  const allRecommendations = [
    {
      id: 1,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
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
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
      tags: ["#취근 10대가 많이 본 정책", "#국가장학금"],
      deadline: "D-50 +",
      deadlineColor: "#4A90E2"
    },
    {
      id: 4,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "오늘 마감",
      deadlineColor: "#FF4D4D"
    },
    {
      id: 5,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-3",
      deadlineColor: "#4A90E2"
    },
    {
      id: 6,
      title: "[제목] 테스트",
      description: "게시글의 첫 문장을 미리 보여줍니다. 안녕하세요.",
      tags: ["#국가장학금", "#국가장학금"],
      deadline: "D-50 +",
      deadlineColor: "#4A90E2"
    }
  ];

  // 카테고리별 키워드 데이터
  const categories = [
    {
      name: "교육",
      keywords: [
        { id: 5, name: "교육지원" },
        { id: 11, name: "장기미취업청년" },
        { id: 12, name: "공공일대학" },
        { id: 14, name: "육아" }
      ]
    },
    {
      name: "취업",
      keywords: [
        { id: 7, name: "일터" },
        { id: 8, name: "벤처" },
        { id: 9, name: "중소기업" },
        { id: 10, name: "전남가업" }
      ]
    },
    {
      name: "주거",
      keywords: [
        { id: 3, name: "박우처" },
        { id: 16, name: "해외진출" },
        { id: 17, name: "주거지원" }
      ]
    },
    {
      name: "금융",
      keywords: [
        { id: 1, name: "대출" },
        { id: 2, name: "보조금" },
        { id: 4, name: "금리혜택" }
      ]
    },
    {
      name: "복지",
      keywords: [
        { id: 6, name: "맞춤형상담서비스" },
        { id: 13, name: "신문화복" },
        { id: 15, name: "출산" }
      ]
    }
  ];

  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState("취업");

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
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
          
          <div className="w-8"></div> {/* 스페이서 */}
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
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category.name
                      ? "bg-[#FFFFFF] text-[#121212] border-2 border-[#13D564]"
                      : "bg-[#F0F0F0] text-[#121212] border-2 border-transparent"
                  }`}
                >
                  #{category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 추천 리스트 */}
          <div className="overflow-hidden">
            {allRecommendations.map((item) => (
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
      </div>
    </div>
  );
}
