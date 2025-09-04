export default function Homepage() {
  return (
    <div className="w-full bg-[#F5F5F5]">
      <div className="ml-5 mx-auto pt-6">
        {/* 비슷한 연령대 추천 */}
        <div className="mb-1.5">
          <h1 className="ml-3 text-[#121212] font-['Pretendard'] text-xl font-semibold leading-normal text-left">
            비슷한 연령대 추천
          </h1>
        </div>

        {/* 장학금 카드들 */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {/* 첫 번째 카드 */}
          <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-6 relative">
            <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
              매칭률 90%
            </div>
            <div className="text-white mt-4">
              <h3 className="font-['Pretendard'] text-xl font-bold mb-2">
                [국가 장학금]
              </h3>
              <p className="font-['Pretendard'] text-base font-medium mb-3">
                최대 300만원
              </p>
              <p className="font-['Pretendard'] text-sm opacity-90">
                2025.09.27 ~ 2025.12.21
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <button className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-['Pretendard'] font-medium">
                더보기
              </button>
            </div>
          </div>

          {/* 두 번째 카드 (일부만 보이도록) */}
          <div className="min-w-[280px] h-[160px] bg-[#13D564] rounded-[18px] p-4 relative">
            <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-6">
              매칭률 90%
            </div>
            <div className="text-white">
              <h3 className="font-['Pretendard'] text-lg font-bold mb-1">
                [국가 장학금]
              </h3>
              <p className="font-['Pretendard'] text-sm font-medium mb-2">
                최대 350만원
              </p>
              <p className="font-['Pretendard'] text-xs opacity-90 mb-4">
                2025.09.20 ~ 2025.11.30
              </p>
            </div>
          </div>
        </div>

        {/* 맞춤 추천 제목 */}
        <div className="mb-4">
          <h1 className="text-[#121212] font-['Pretendard'] text-xl font-semibold leading-normal">
            맞춤 추천
          </h1>
        </div>

        {/* 추천 리스트 */}
        <div className="bg-white rounded-xl mb-20 mr-5">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-[#121212] font-['Pretendard'] font-medium">
              [제목] 테스트
            </p>
            <p className="text-xs text-[#666] font-['Pretendard'] mt-1">
              게시글의 첫 문장을 미리 보여줍니다.
            </p>
            <div className="flex justify-end mt-2">
              <span className="text-xs text-[#FF4D4D] font-['Pretendard'] font-medium">
                오늘 마감
              </span>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-[#121212] font-['Pretendard'] font-medium">
              [제목] 테스트
            </p>
            <p className="text-xs text-[#666] font-['Pretendard'] mt-1">
              게시글의 첫 문장을 미리 보여줍니다.
            </p>
            <div className="flex justify-end mt-2">
              <span className="text-xs text-[#FF4D4D] font-['Pretendard'] font-medium">
                오늘 마감
              </span>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-[#121212] font-['Pretendard'] font-medium">
              [제목] 테스트
            </p>
            <p className="text-xs text-[#666] font-['Pretendard'] mt-1">
              게시글의 첫 문장을 미리 보여줍니다.
            </p>
            <div className="flex justify-end mt-2">
              <span className="text-xs text-[#4A90E2] font-['Pretendard'] font-medium">
                D-50 +
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-3 max-w-sm mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="#13D564">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs text-[#13D564] font-['Pretendard']">
              홈
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="#C4C4C4">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <span className="text-xs text-[#C4C4C4] font-['Pretendard']">
              검색
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="#C4C4C4">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xs text-[#C4C4C4] font-['Pretendard']">
              북마크
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="#C4C4C4">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-xs text-[#C4C4C4] font-['Pretendard']">
              마이페이지
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
