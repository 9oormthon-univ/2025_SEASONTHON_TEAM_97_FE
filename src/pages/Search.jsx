import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { policyAPI } from "../services/api";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [popularPolicies, setPopularPolicies] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 인기 정책 불러오기 (조회수 기준 상위 4개)
  useEffect(() => {
    const fetchPopularPolicies = async () => {
      try {
        const response = await policyAPI.getPopularPolicies(4);
        if (response.success && response.data) {
          // 조회수(inqCnt) 기준으로 내림차순 정렬
          const sortedPolicies = response.data.sort((a, b) => (b.inqCnt || 0) - (a.inqCnt || 0));
          setPopularPolicies(sortedPolicies.slice(0, 4));
        } else {
          setPopularPolicies(null); // API 실패 시 null로 설정
        }
      } catch (error) {
        console.error("인기 정책 가져오기 실패:", error);
        setPopularPolicies(null); // 에러 시 null로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPolicies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-result?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 정책 이름으로 검색하는 함수
  const handlePolicyClick = (policyName) => {
    navigate(`/search-result?q=${encodeURIComponent(policyName)}`);
  };

  return (
    <div className="w-full bg-[#FAFAF8]">
      <div className="ml-5 mx-auto pt-6">
        <div className="ml-3 mb-2 mt-4">
          <h2 className="text-[#121212] font-['Pretendard'] text-xl font-semibold">
            필요한 정보를 직접 검색해보세요!
          </h2>
        </div>

        {/* 검색바 */}
        <div className="mb-4 mr-5">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력해주세요."
                className="w-full px-4 py-[0.7rem] pr-12 border-2 border-[#13D564] rounded-full focus:outline-none text-sm text-black placeholder-[#D5E5DC]"
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

        <div className="ml-3 mb-4">
          <h2 className="text-lg font-semibold text-[#121212] font-['Pretendard'] mb-4">추천 검색어</h2>
          <div className="flex flex-wrap gap-2 mr-5">
            {loading ? (
              // 로딩 중 스켈레톤 UI
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ))
            ) : popularPolicies && popularPolicies.length > 0 ? (
              // 실제 인기 정책 데이터
              popularPolicies.map((policy, index) => (
                <button
                  key={policy.id || index}
                  onClick={() => handlePolicyClick(policy.plcyNm)}
                  className="px-3 py-2 bg-gray-200 text-[#666] rounded-full text-sm hover:bg-gray-300 transition-colors cursor-pointer truncate max-w-[120px]"
                >
                  {policy.plcyNm}
                </button>
              ))
            ) : (
              // API 호출 실패 시 null 처리
              <div className="text-sm text-[#A6A6A6] font-['Pretendard']">
                추천 검색어를 불러올 수 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="ml-3 mb-20 mr-5">
          <h3 className="text-base text-[#A6A6A6] font-['Pretendard'] mb-2">
            이렇게 검색하면 원하는 검색 내용을 찾을 수 있어요!
          </h3>
          <ul className="space-y-2 text-sm text-[#A6A6A6]">
            <li>• 문장보다는 단어로 검색을 해주세요!</li>
            <li>• 검색어의 맞춤법, 오타를 확인한 후 검색해주세요!</li>
            <li>• 특수 기호는 검색 내용을 찾는데 어려움을 줄 수 있습니다!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}