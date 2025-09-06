import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hatIcon from "../assets/icons/hat.svg";
import coinIcon from "../assets/icons/coin.svg";
import happyIcon from "../assets/icons/happy.svg";
import sadIcon from "../assets/icons/sad.svg";

export default function Detail() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full bg-[#5294FF] min-h-screen">
      {/* 헤더 */}
      <div className="px-4 py-4 relative">
        {/* 뒤로가기 버튼만 */}
        <div className="flex items-center text-white mb-6">
          <button onClick={handleBackClick} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* 상단 정보 및 북마크 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="bg-white rounded-full px-3 py-1 mb-3">
              <span className="text-[#5294FF] text-xs font-['Pretendard'] font-medium">청년이 직접 확인한 정책</span>
            </div>
            <h1 className="text-white font-['Pretendard'] font-bold text-2xl mb-2">국가 장학금</h1>
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
        <div className="flex justify-end items-center relative mb-6">
          <img src={hatIcon} alt="대학 모자" className="w-20 h-20 mr-4" />
          <img src={coinIcon} alt="동전" className="w-16 h-16" />
        </div>

        {/* AI 요약 섹션 */}
        <div className="mb-6">
          <h2 className="text-white font-['Pretendard'] font-semibold text-lg mb-3">AI 요약</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white text-sm leading-relaxed font-['Pretendard'] mb-3">
              저소득층 국정원 및 사립유치원에 다니는 3~5세 유아
            </p>
            <p className="text-white text-sm leading-relaxed font-['Pretendard'] mb-3">
              • '21년 1~2월생으로 유치원 입학을 희망하여 3세반에 
              취원한 유아도 지원 대상
            </p>
            <p className="text-white text-sm leading-relaxed font-['Pretendard']">
              최대 국가의 늘어나 하나가 내용이 안에 아래를 되힌 수 있
              도록 하는 좋은 제 정책이다.
            </p>
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="flex justify-start items-center space-x-6 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <img src={happyIcon} alt="happy" className="w-5 h-5" />
            </div>
            <span className="text-white text-sm font-['Pretendard']">26</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <img src={sadIcon} alt="sad" className="w-5 h-5" />
            </div>
            <span className="text-white text-sm font-['Pretendard']">26</span>
          </div>
        </div>

        {/* 상세 내용 보기 버튼 */}
        <div className="text-left mb-6">
          <button 
            onClick={() => navigate('/Search3')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-['Pretendard'] font-medium text-sm hover:bg-blue-600 transition-colors duration-200 shadow-lg"
          >
            상세 내용 보기
          </button>
        </div>

        {/* 북마크 카운트 */}
        <div className="text-right">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
            <span className="text-white text-sm font-['Pretendard']">📚 26</span>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center py-3 px-6">
        <button className="flex flex-col items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg className="w-6 h-6 text-[#13D564]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button className="flex flex-col items-center">
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
