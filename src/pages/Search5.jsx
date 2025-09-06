import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hatIcon from "../assets/icons/hat.svg";
import coinIcon from "../assets/icons/coin.svg";

export default function Search5() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleTabClick = (tab) => {
    if (tab === 'detail') {
      navigate('/search3');
    } else if (tab === 'related') {
      navigate('/search4');
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
        <button 
          className="flex-1 text-center py-3 text-gray-500 font-['Pretendard'] hover:text-[#5294FF] transition-colors"
          onClick={() => handleTabClick('related')}
        >
          구비서류
        </button>
        <div className="flex-1 text-center py-3 border-b-2 border-[#5294FF] text-[#5294FF] font-['Pretendard'] font-semibold">
          평가
        </div>
      </div>

       {/* 콘텐츠 */}
       <div className="p-4">
         {/* 평가 결과 카드 */}
         <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
           <p className="text-sm text-gray-600 mb-2 font-['Pretendard']">총 126명의 공정직인 반응을 남겨주셨습니다!</p>
           <div className="flex justify-center items-center space-x-8">
             <div className="flex items-center">
               <span className="text-4xl mr-2">😊</span>
               <span className="text-2xl font-bold text-gray-800 font-['Pretendard']">126</span>
             </div>
             <div className="flex items-center">
               <span className="text-4xl mr-2">😕</span>
               <span className="text-2xl font-bold text-gray-800 font-['Pretendard']">126</span>
             </div>
           </div>
         </div>

         {/* 댓글 섹션 */}
         <div className="space-y-4">
           {/* 댓글 1 */}
           <div className="flex items-start space-x-3">
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-500 text-sm">👤</span>
             </div>
             <div className="flex-1">
               <div className="flex items-center space-x-2 mb-1">
                 <span className="font-semibold text-sm text-gray-800 font-['Pretendard']">홍길동</span>
                 <span className="text-xs text-gray-500 font-['Pretendard']">2시간 / 익명 / 학생</span>
               </div>
               <p className="text-sm text-gray-700 font-['Pretendard']">
                 좋은 제도인 것 같아요 ㅎㅎ*
               </p>
               <div className="text-xs text-gray-500 font-['Pretendard'] mt-1">
                 익명 신청함부터
               </div>
             </div>
           </div>

           {/* 댓글 2 */}
           <div className="flex items-start space-x-3">
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-500 text-sm">👤</span>
             </div>
             <div className="flex-1">
               <div className="flex items-center space-x-2 mb-1">
                 <span className="font-semibold text-sm text-gray-800 font-['Pretendard']">😊😊</span>
                 <span className="text-xs text-gray-500 font-['Pretendard']">2시간 / 익명 / 학생</span>
               </div>
               <p className="text-sm text-gray-700 font-['Pretendard']">
                 추천해요
               </p>
             </div>
           </div>

           {/* 댓글 3 */}
           <div className="flex items-start space-x-3">
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
               <span className="text-gray-500 text-sm">👤</span>
             </div>
             <div className="flex-1">
               <div className="flex items-center space-x-2 mb-1">
                 <span className="font-semibold text-sm text-gray-800 font-['Pretendard']">김목삼</span>
                 <span className="text-xs text-gray-500 font-['Pretendard']">2시간 / 익명 / 학생</span>
               </div>
               <p className="text-sm text-gray-700 font-['Pretendard']">
                 도움이 정말 많아져요.
               </p>
             </div>
           </div>
         </div>

         {/* 댓글 입력 */}
         <div className="mt-6">
           <div className="flex items-center space-x-3 p-3 border-2 border-[#13D564] rounded-lg">
             <input 
               type="text" 
               placeholder="정책에 대한 의견을 남겨보세요!"
               className="flex-1 outline-none text-sm font-['Pretendard'] placeholder-gray-400"
             />
             <button className="text-[#13D564] hover:text-[#11B656]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
               </svg>
             </button>
           </div>
         </div>
       </div>
    </div>
  );
}
