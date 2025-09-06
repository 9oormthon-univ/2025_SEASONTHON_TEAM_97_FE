import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Scrap = () => {
  const navigate = useNavigate();
  
  // 스크랩된 정책 데이터 (예시 데이터)
  const [scrapedPolicies, setScrapedPolicies] = useState([
    {
      id: 1,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다.",
      tags: ["정부정책지원", "청소년정책"],
      status: "오늘 마감",
      statusType: "urgent", // urgent, normal, extended
      isBookmarked: true,
    },
    {
      id: 2,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다..\n안녕하세요.",
      tags: ["정부정책지원", "청소년정책"],
      status: "D-3",
      statusType: "normal",
      isBookmarked: true,
    },
    {
      id: 3,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다..",
      tags: ["정부정책지원", "청소년정책"],
      status: "D-50+",
      statusType: "extended",
      isBookmarked: true,
    },
    {
      id: 4,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다.",
      tags: ["정부정책지원", "청소년정책"],
      status: "오늘 마감",
      statusType: "urgent",
      isBookmarked: true,
    },
    {
      id: 5,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다.",
      tags: ["정부정책지원", "청소년정책"],
      status: "D-3",
      statusType: "normal",
      isBookmarked: true,
    },
    {
      id: 6,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다.",
      tags: ["정부정책지원", "청소년정책"],
      status: "D-50+",
      statusType: "extended",
      isBookmarked: true,
    },
    {
      id: 7,
      category: "[복지] 테스트",
      description: "테스트과 첫 응답을 미리 확인됩니다.",
      tags: ["정부정책지원", "청소년정책"],
      status: "D-50+",
      statusType: "extended",
      isBookmarked: true,
    },
  ]);

  // 북마크 토글 함수
  const toggleBookmark = (id) => {
    setScrapedPolicies((prev) =>
      prev.map((policy) =>
        policy.id === id
          ? { ...policy, isBookmarked: !policy.isBookmarked }
          : policy
      )
    );
  };

  // 뒤로가기 함수
  const handleGoBack = () => {
    navigate(-1);
  };

  // 상태별 스타일 반환 함수
  const getStatusStyle = (statusType) => {
    switch (statusType) {
      case "urgent":
        return "text-red-500 font-medium";
      case "normal":
        return "text-blue-500 font-medium";
      case "extended":
        return "text-green-500 font-medium";
      default:
        return "text-gray-500 font-medium";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleGoBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="뒤로가기"
          >
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* 페이지 제목 */}
          <h1 className="text-lg font-semibold text-gray-900">스크랩</h1>

          {/* 빈 공간 (레이아웃 균형을 위해) */}
          <div className="w-10"></div>
        </div>
      </div>

      {/* 정책 리스트 섹션 */}
      <div className="px-4 py-2">
        {scrapedPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* 카테고리와 북마크 */}
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {policy.category}
              </span>
              <button
                onClick={() => toggleBookmark(policy.id)}
                className="p-1 rounded transition-colors duration-200 hover:bg-gray-100"
                aria-label={policy.isBookmarked ? "북마크 해제" : "북마크 추가"}
              >
                <svg
                  className={`w-5 h-5 ${
                    policy.isBookmarked
                      ? "text-green-500 fill-current"
                      : "text-gray-400"
                  }`}
                  fill={policy.isBookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>

            {/* 정책 설명 */}
            <p className="text-sm text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
              {policy.description}
            </p>

            {/* 태그와 상태 */}
            <div className="flex items-center justify-between">
              {/* 태그들 */}
              <div className="flex flex-wrap gap-2">
                {policy.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 상태 표시 */}
              <span
                className={`text-sm ${getStatusStyle(policy.statusType)} ml-2`}
              >
                {policy.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태일 때 표시할 메시지 (실제 데이터가 없을 때) */}
      {scrapedPolicies.filter((policy) => policy.isBookmarked).length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            스크랩한 정책이 없습니다
          </h3>
          <p className="text-gray-500 text-center">
            관심 있는 정책을 북마크하여
            <br />
            나중에 쉽게 찾아보세요.
          </p>
        </div>
      )}

      {/* 하단 여백 */}
      <div className="h-20"></div>
    </div>
  );
};

export default Scrap;
