import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bookmarkXIcon from "../assets/icons/bookmark-x.svg";
import bookmarkOIcon from "../assets/icons/bookmark-o.svg";

export default function AllRecommendations() {
  const navigate = useNavigate();
  
  // 북마크 상태 관리
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  // 키워드별 게시물 데이터
  const recommendationsByKeyword = {
    // 교육 카테고리
    5: { // 교육지원
      id: 101,
      title: "청년 교육지원 프로그램",
      description: "청년들을 위한 다양한 교육지원 혜택을 제공합니다.",
      tags: ["#교육지원", "#청년정책"],
      deadline: "D-5",
      deadlineColor: "#4A90E2"
    },
    11: { // 장기미취업청년
      id: 102,
      title: "장기미취업청년 지원사업",
      description: "장기미취업청년을 위한 맞춤형 지원 프로그램입니다.",
      tags: ["#장기미취업청년", "#취업지원"],
      deadline: "D-10",
      deadlineColor: "#4A90E2"
    },
    12: { // 공공일대학
      id: 103,
      title: "공공일대학 참여 프로그램",
      description: "공공일대학을 통한 직업교육 기회를 제공합니다.",
      tags: ["#공공일대학", "#직업교육"],
      deadline: "D-15",
      deadlineColor: "#4A90E2"
    },
    14: { // 육아
      id: 104,
      title: "청년 육아지원 정책",
      description: "청년층 육아 부담 완화를 위한 지원책입니다.",
      tags: ["#육아지원", "#청년부모"],
      deadline: "상시",
      deadlineColor: "#22C55E"
    },
    
    // 취업 카테고리
    7: { // 일터
      id: 201,
      title: "청년 일터 지원사업",
      description: "청년들의 안정적인 일터 마련을 지원합니다.",
      tags: ["#일터", "#청년취업"],
      deadline: "D-7",
      deadlineColor: "#4A90E2"
    },
    8: { // 벤처
      id: 202,
      title: "청년 벤처 창업지원",
      description: "혁신적인 벤처 창업을 꿈꾸는 청년들을 지원합니다.",
      tags: ["#벤처", "#창업지원"],
      deadline: "오늘 마감",
      deadlineColor: "#FF4D4D"
    },
    9: { // 중소기업
      id: 203,
      title: "중소기업 취업 인센티브",
      description: "중소기업 취업 시 다양한 혜택을 제공합니다.",
      tags: ["#중소기업", "#취업인센티브"],
      deadline: "D-3",
      deadlineColor: "#4A90E2"
    },
    10: { // 전남가업
      id: 204,
      title: "전남 청년 가업 승계지원",
      description: "전남지역 청년들의 가업 승계를 지원합니다.",
      tags: ["#전남가업", "#가업승계"],
      deadline: "D-20",
      deadlineColor: "#4A90E2"
    },
    
    // 주거 카테고리
    3: { // 박우처
      id: 301,
      title: "박우처 주거지원 프로그램",
      description: "청년들의 주거 안정을 위한 박우처 지원사업입니다.",
      tags: ["#박우처", "#주거지원"],
      deadline: "D-12",
      deadlineColor: "#4A90E2"
    },
    16: { // 해외진출
      id: 302,
      title: "청년 해외진출 지원사업",
      description: "글로벌 진출을 꿈꾸는 청년들을 위한 지원책입니다.",
      tags: ["#해외진출", "#글로벌"],
      deadline: "D-30",
      deadlineColor: "#4A90E2"
    },
    17: { // 주거지원
      id: 303,
      title: "청년 주거지원 종합대책",
      description: "청년층 주거 부담 완화를 위한 종합적인 지원책입니다.",
      tags: ["#주거지원", "#청년주거"],
      deadline: "상시",
      deadlineColor: "#22C55E"
    },
    
    // 금융 카테고리
    1: { // 대출
      id: 401,
      title: "청년 저금리 대출 상품",
      description: "청년들을 위한 특별 저금리 대출 프로그램입니다.",
      tags: ["#대출", "#저금리"],
      deadline: "D-8",
      deadlineColor: "#4A90E2"
    },
    2: { // 보조금
      id: 402,
      title: "청년 창업 보조금 지원",
      description: "창업을 준비하는 청년들을 위한 보조금을 지원합니다.",
      tags: ["#보조금", "#창업지원"],
      deadline: "D-14",
      deadlineColor: "#4A90E2"
    },
    4: { // 금리혜택
      id: 403,
      title: "청년 특별 금리혜택",
      description: "청년층 대상 특별 금리 혜택 프로그램입니다.",
      tags: ["#금리혜택", "#청년금융"],
      deadline: "D-6",
      deadlineColor: "#4A90E2"
    },
    
    // 복지 카테고리
    6: { // 맞춤형상담서비스
      id: 501,
      title: "청년 맞춤형 상담서비스",
      description: "청년들을 위한 개별 맞춤형 상담 서비스를 제공합니다.",
      tags: ["#맞춤형상담서비스", "#청년상담"],
      deadline: "상시",
      deadlineColor: "#22C55E"
    },
    13: { // 신문화복
      id: 502,
      title: "신문화복지 지원사업",
      description: "청년들의 문화복지 향상을 위한 지원사업입니다.",
      tags: ["#신문화복", "#문화복지"],
      deadline: "D-25",
      deadlineColor: "#4A90E2"
    },
    15: { // 출산
      id: 503,
      title: "청년 출산지원 정책",
      description: "청년층의 출산을 장려하고 지원하는 정책입니다.",
      tags: ["#출산지원", "#청년출산"],
      deadline: "상시",
      deadlineColor: "#22C55E"
    }
  };

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

  // 선택된 카테고리의 키워드들에 해당하는 게시물들을 가져오는 함수
  const getRecommendationsForCategory = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return [];
    
    return category.keywords.map(keyword => recommendationsByKeyword[keyword.id]).filter(Boolean);
  };

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
            {getRecommendationsForCategory(selectedCategory).map((item) => (
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
