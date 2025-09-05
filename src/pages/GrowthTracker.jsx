import React, { useState } from "react";
import MenuBar from "../components/layout/MenuBar";

export default function GrowthTracker() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8)); // 2025년 9월

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // 달력 데이터 생성
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    
    // 빈 날짜들로 시작
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // 실제 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  // 더미 데이터 (실제로는 API나 상태 관리에서 가져올 데이터)
  const eventDays = [2, 3, 4, 5, 8, 9]; // 신청하기 이벤트가 있는 날들
  const progressData = [80, 65, 90, 75, 85]; // 레이더 차트 데이터

  return (
    <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* 헤더 */}
      <div className="px-5 py-4">
        <h1 className="text-xl font-bold text-[#121212] font-['Pretendard']">
          성장 스케치
        </h1>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-5">
        {/* 달력 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePrevMonth}
            className="p-2 text-[#13D564] text-2xl"
          >
            ❮
          </button>
          <h2 className="text-lg font-semibold text-[#121212]">
            {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
          </h2>
          <button 
            onClick={handleNextMonth}
            className="p-2 text-[#13D564] text-2xl"
          >
            ❯
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-[#666] py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 달력 그리드 */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {calendar.map((day, index) => (
            <div key={index} className="relative">
              {day && (
                <div className="h-12 flex flex-col items-center justify-center relative">
                  <span className={`text-sm ${
                    index % 7 === 0 ? 'text-red-500' : 
                    index % 7 === 6 ? 'text-blue-500' : 
                    'text-[#13D564]'
                  } font-medium`}>
                    {day}
                  </span>
                  {eventDays.includes(day) && (
                    <div className="absolute inset-0 bg-[#13D564] bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-[#13D564] font-bold">
                        @@@ 신청하기
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 이번 달 누적 신청량 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#121212] mb-4">
            이번 달 누적 신청량
          </h3>
          
          {/* 레이더 차트 영역 */}
          <div className="flex justify-center mb-4">
            <div className="relative w-64 h-64">
              {/* 레이더 차트 배경 */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* 배경 펜타곤들 */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
                  <polygon
                    key={i}
                    points="100,20 171,76 142,156 58,156 29,76"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="1"
                    transform={`scale(${scale}) translate(${(1-scale)*100}, ${(1-scale)*100})`}
                  />
                ))}
                
                {/* 데이터 펜타곤 */}
                <polygon
                  points={`100,${20 + (100-20) * (1 - progressData[0]/100)} ${171 - (171-100) * progressData[1]/100},${76 + (100-76) * (1 - progressData[1]/100)} ${142 - (142-100) * progressData[2]/100},${156 - (156-100) * (1 - progressData[2]/100)} ${58 + (100-58) * progressData[3]/100},${156 - (156-100) * (1 - progressData[3]/100)} ${29 + (100-29) * progressData[4]/100},${76 + (100-76) * (1 - progressData[4]/100)}`}
                  fill="#13D564"
                  fillOpacity="0.3"
                  stroke="#13D564"
                  strokeWidth="2"
                />
                
                {/* 축 선들 */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="#E5E5E5" strokeWidth="1" />
                <line x1="100" y1="100" x2="171" y2="76" stroke="#E5E5E5" strokeWidth="1" />
                <line x1="100" y1="100" x2="142" y2="156" stroke="#E5E5E5" strokeWidth="1" />
                <line x1="100" y1="100" x2="58" y2="156" stroke="#E5E5E5" strokeWidth="1" />
                <line x1="100" y1="100" x2="29" y2="76" stroke="#E5E5E5" strokeWidth="1" />
              </svg>
              
              {/* 라벨들 */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-[#666]">
                신청한 정책
              </div>
              <div className="absolute top-16 right-2 text-xs text-[#666]">
                신청한 정책
              </div>
              <div className="absolute bottom-8 right-8 text-xs text-[#666]">
                신청한 정책
              </div>
              <div className="absolute bottom-8 left-8 text-xs text-[#666]">
                신청한 정책
              </div>
              <div className="absolute top-16 left-2 text-xs text-[#666]">
                신청한 정책
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
      <MenuBar />
    </div>
  );
}
