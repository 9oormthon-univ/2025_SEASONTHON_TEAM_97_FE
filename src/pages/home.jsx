
import bellSvg from "../assets/icons/union.svg?url";

export default function Homepage() {
    return (
        <div className="w-[90%] max-w-sm mx-auto">          
            {/* 알림 아이콘 */}
            <div className="flex flex-row items-end w-full justify-end p-4 mb-5"> 
                <img src={bellSvg} alt="bell" className="w-[22px] h-[27px] flex-shrink-0" />
            </div>
            
            {/* 오늘 나와 비슷한 나이에게 추천 */}
            <div className="mb-4">
                <h1 className="text-[#121212] font-['Pretendard'] text-xl font-semibold leading-normal text-left pb-2 pl-4">
                    오늘 나와 비슷한 나이에게 추천
                </h1>
            </div>
            
            {/* 매칭률 카드 */}
            <div className="px-2.75 mb-4">
                <div className="p-4 w-full max-w-[280px] h-[200px] bg-[#13D564] rounded-[18px] pl-[18px] pt-[18px]">
                    <h1 className="w-[62px] h-5 rounded-md bg-[#27AA5E] font-['Pretendard'] text-[10px] font-bold leading-normal text-center text-white">
                        매칭률 90%
                    </h1>
                </div>
            </div>
            
            {/* 맞춤 추천 제목 */}
            <div className="mb-3">
                <h1 className="text-[#121212] font-['Pretendard'] text-xl font-semibold leading-normal mt-2.5">
                    맞춤 추천
                </h1>
            </div>

            {/* 추천 리스트 */}
            <div className="bg-white rounded-xl mt-2 mb-5">
                <div className="p-4 border-b border-gray-200">
                    <p className="text-xs text-[#121212]">[제목] 테스트</p>
                    <p className="text-sm font-semibold mt-1">게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p className="text-xs text-red-500 mt-1.5">오늘 마감</p>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <p className="text-xs text-[#121212]">[제목] 테스트</p>
                    <p className="text-sm font-semibold mt-1">게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p className="text-xs text-gray-500 mt-1.5">오늘 마감</p>
                </div>

                <div className="p-4">
                    <p className="text-xs text-[#121212]">[제목] 테스트</p>
                    <p className="text-sm font-semibold mt-1">게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p className="text-xs text-blue-500 mt-1.5">D-50</p>
                </div>
            </div>
        </div>
    );
}
