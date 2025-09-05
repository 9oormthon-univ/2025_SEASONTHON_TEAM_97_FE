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
        <div className="flex gap-6 mb-6 overflow-x-auto">
          {/* 첫 번째 카드 */}
          <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-5 relative">
            <div className="w-[70px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-5 text-center text-white mb-8">
              매칭률 90%
            </div>
            <div className="text-white mt-1">
              <h3 className="font-['Pretendard'] text-xl font-bold mb-1">
                [국가 장학금]
              </h3>
              <p className="font-['Pretendard'] text-base font-medium mb-1">
                최대 300만원
              </p>
              <p className="font-['Pretendard'] text-sm absolute bottom-6">
                2025.09.27 ~ 2025.12.21
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <button className="text-white text-sm font-['Pretendard']">
                더보기
              </button>
            </div>
          </div>

          {/* 두 번째 카드 (일부만 보이도록) */}
          <div className="min-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] p-4 relative">
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
    </div>
  );
}
