import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hatIcon from "../assets/icons/hat.svg";
import coinIcon from "../assets/icons/coin.svg";

export default function Search4() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleTabClick = (tab) => {
    if (tab === 'detail') {
      navigate('/search3');
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
        <button 
          className="flex-1 text-center py-3 text-gray-500 font-['Pretendard'] hover:text-[#5294FF] transition-colors"
          onClick={() => handleTabClick('detail')}
        >
          상세 내용
        </button>
        <div className="flex-1 text-center py-3 border-b-2 border-[#5294FF] text-[#5294FF] font-['Pretendard'] font-semibold">
          구비서류
        </div>
        <button 
          className="flex-1 text-center py-3 text-gray-500 font-['Pretendard'] hover:text-[#5294FF] transition-colors"
          onClick={() => handleTabClick('inquiry')}
        >
          평가
        </button>
      </div>

       {/* 콘텐츠 */}
       <div className="p-4">
         {/* 구비서류 섹션 */}
         <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
           <h2 className="font-['Pretendard'] font-semibold text-lg mb-4 text-[#2E7D32]">구비서류</h2>
           
           {/* 지원대상 상세 */}
           <div className="mb-6">
             <div className="bg-[#13D564] text-white px-3 py-1 rounded-full inline-block mb-3">
               <span className="text-xs font-['Pretendard'] font-medium">지원대상</span>
             </div>
             <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
               <strong>지원대상:</strong> 국정원 및 사설유치원에 다니는 3~5세 유아
             </p>
             <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
               • <strong>'21년 1~2월생</strong>으로 유치원 입학을 희망하여 3세반에 취원한 유아도 지원 대상
             </p>
             <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-3">
               • <strong>최대학습 아동</strong>(17.1.1~12.31 출생)이 취학을 유예하는 경우, 
               유치원 1년에 한하여 5세 유아 무상교육비 지원(취학유예에 동치서 제출)
             </p>
             <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard']">
               ※ 단, 지원기간은 3년을 초과할 수 없음.
             </p>
           </div>

           {/* 추가지원 */}
           <div className="mb-6">
             <h3 className="font-['Pretendard'] font-semibold text-md mb-3 text-[#5294FF]">추가지원:</h3>
             <p className="text-sm text-gray-700 leading-relaxed font-['Pretendard'] mb-2">
               저소득층 유아(유아학비 지원 대상 자격이 있고, 사립유치원에 다니는 법정저소득층(기초생활보장 수급자, 자상위계층, 한부모 가정) 유아)
             </p>
           </div>

           {/* 아래의 경우 지원대상에서 제외 */}
           <div className="mb-6">
             <h3 className="font-['Pretendard'] font-semibold text-md mb-3 text-[#5294FF]">아래의 경우 지원대상에서 제외:</h3>
             <div className="space-y-2 text-sm text-gray-700 leading-relaxed font-['Pretendard']">
               <p>• 대한민국 국적을 가지지 않은 유아(난민 및 재한외국인 처우 기본법, 에 따라 난민부분장을 인정받은 자격으로 유아(유아 제외)</p>
               <p>• 가정 양육수당 및 어린이집 보육료를 지원 받는 유아</p>
               <p>• 유치원 이용시간에 아이돌봄서비스 등과 중복지원 불가</p>
               <p>• 휴원 제출 기간이 31일에 되는 날 유아학비 지원자격 중지</p>
             </div>
           </div>
         </div>

        
       </div>
    </div>
  );
}
