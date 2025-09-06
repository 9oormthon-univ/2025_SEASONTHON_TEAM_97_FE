import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hatIcon from "../assets/icons/hat.svg";
import coinIcon from "../assets/icons/coin.svg";

export default function Search3() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleTabClick = (tab) => {
    if (tab === 'related') {
      navigate('/search4');
    } else if (tab === 'inquiry') {
      navigate('/search5');
    }
  };

  return (
    <div className="w-full bg-[#FAFAF8] min-h-screen">
      {/* 헤더 */}
      <div className="bg-[#5294FF] px-4 py-4 relative">
        {/* 상단 정보 및 북마크 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="bg-white rounded-full px-3 py-1 mb-3">
              <span className="text-[#5294FF] text-xs font-['Pretendard'] font-medium">10대들이 가장 많이 본 정책</span>
            </div>
            <h1 className="text-white font-['Pretendard'] font-bold text-2xl mb-2">[국가 장학금]</h1>
            <div className="text-white font-['Pretendard'] text-sm">
              <p className="font-semibold">2차 국가 장학금</p>
              <p className="text-white/80">2025.09.27 ~ 2025.12.21</p>
            </div>
          </div>
          <button 
            onClick={toggleBookmark}
            className="bg-[#13D564] p-2 rounded-lg"
          >
            <svg className="w-6 h-6 text-white" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
        
        {/* 대학 모자 아이콘과 동전 */}
        <div className="flex justify-end items-center relative mt-4">
          <img src={hatIcon} alt="대학 모자" className="w-20 h-20 mr-4" />
          <img src={coinIcon} alt="동전" className="w-16 h-16" />
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white flex">
        <div className="flex-1 text-center py-3 border-b-2 border-[#5294FF] text-[#5294FF] font-['Pretendard'] font-semibold">
          상세 내용
        </div>
        <button 
          className="flex-1 text-center py-3 text-gray-500 font-['Pretendard'] hover:text-[#5294FF] transition-colors"
          onClick={() => handleTabClick('related')}
        >
          구비서류
        </button>
        <button 
          className="flex-1 text-center py-3 text-gray-500 font-['Pretendard'] hover:text-[#5294FF] transition-colors"
          onClick={() => handleTabClick('inquiry')}
        >
          평가
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="p-4">
        {/* AI 요약 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center mb-3">
            <h2 className="font-['Pretendard'] font-semibold text-lg">AI 요약</h2>
          </div>
          <div className="bg-[#F8F9FA] rounded-lg p-3">
            <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard']">
              테스트 
            </p>
          </div>
        </div>

        {/* 지원대상 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="font-['Pretendard'] font-semibold text-lg mb-3 text-[#2E7D32]">지원대상</h3>
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
            테스트 
          </p>
          
          <div className="bg-[#E3F2FD] rounded-lg p-3 mb-3">
            <p className="text-sm text-[#1976D2] leading-relaxed font-['Pretendard']">
              테스트 
            </p>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard']">
           테스트
          </p>
        </div>

        {/* 지원내용 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="font-['Pretendard'] font-semibold text-lg mb-3 text-[#2E7D32]">지원내용</h3>
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
            테스트  
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
            테스트
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard']">
            테스트
          </p>
        </div>

        {/* 추가 지원 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">💬</span>
            </div>
            <h3 className="font-['Pretendard'] font-semibold text-lg">추가 지원</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard']">
            문자보명:
            <br/>
            테스트
          </p>
        </div>

        {/* 연관 정보 주의사항 */}
        <div className="bg-[#FFF3E0] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#F57F17] text-center font-['Pretendard']">
            테스트
          </p>
        </div>
      </div>
    </div>
  );
}
