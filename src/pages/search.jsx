import React, { useState } from 'react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);
    // 여기에 실제 검색 로직을 구현할 수 있습니다
  };

  return (
    <div className="w-[90%] max-w-sm mx-auto">
      {/* 제목 */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-black">
          필요한 정보를 직접 검색해보세요!
        </h1>
      </div>

      {/* 검색바 */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력해주세요."
            className="w-full px-4 py-[0.7rem] border-2 border-[#13D564] rounded-lg focus:outline-none focus:border-[#13D564] text-sm outline-none"
            style={{
              outline: "none",
              boxShadow: "none"
            }}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* 추천 검색어 구역 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-black mb-4">추천 검색어</h2>
        <div className="flex flex-wrap gap-2">
          {/* 추천 검색어 버튼들 - 빈 구역으로 유지 */}
          <div className="w-24 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {/* 빈 구역 */}
          </div>
          <div className="w-24 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {/* 빈 구역 */}
          </div>
          <div className="w-24 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {/* 빈 구역 */}
          </div>
          <div className="w-24 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {/* 빈 구역 */}
          </div>
        </div>
      </div>

      {/* 검색 팁 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-black mb-4">
          이렇게 검색하면 원하는 검색 내용을 찾을 수 있어요!
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            문장보다는 단어로 검색을 해주세요!
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            검색어의 맞춤법, 오타를 확인한 후 검색해주세요!
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            특수 기호는 검색 내용을 찾는데 어려움을 줄 수 있습니다!
          </li>
        </ul>
      </div>
    </div>
  );
}
