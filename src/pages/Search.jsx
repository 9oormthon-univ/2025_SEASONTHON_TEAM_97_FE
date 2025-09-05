import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-result?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-5 pt-6">
        <div className="ml-3 mb-2 mt-4">
          <h2 className="text-[#121212] font-['Pretendard'] text-xl font-semibold">
            필요한 정보를 직접 검색해보세요!
          </h2>
        </div>

        {/* 검색바 */}
        <div className="mb-4">
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

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#121212] font-['Pretendard'] mb-4">추천 검색어</h2>
          <div className="flex flex-wrap gap-2">
            <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-base text-[#A6A6A6] font-['Pretendard'] mb-4">
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