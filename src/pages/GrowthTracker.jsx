import React, { useState } from 'react';

const Dashboard = () => {
  // 현재 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 관심분야별 지원 현황 데이터 (예시 데이터)
  const [policyData] = useState({
    일자리: 8,
    주거: 6,
    교육: 9,
    복지문화: 7,
    권리: 5
  });

  // 월 변경 함수
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // 현재 월의 날짜들 생성
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // 이전 달의 빈 날짜들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // 요일 배열
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
  
  // 레이더 차트 데이터 정규화 (0-10 스케일)
  const normalizedData = Object.values(policyData).map(value => (value / 10) * 100);
  const categories = Object.keys(policyData);

  return (
    <div className="w-full bg-[#FAFAF8]">
      <div className="ml-5 mr-5 mx-auto pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-7 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          성장 스케치
        </h1>
        <div className="flex items-center gap-4 self-center md:self-auto">
          <button 
            className="bg-transparent border-none text-lg text-green-500 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
            onClick={() => changeMonth(-1)}
            aria-label="이전 달"
          >
            ←
          </button>
          <span className="text-base font-medium text-green-500 min-w-[120px] text-center">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button 
            className="bg-transparent border-none text-lg text-green-500 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
            onClick={() => changeMonth(1)}
            aria-label="다음 달"
          >
            →
          </button>
        </div>
      </div>

      {/* 캘린더 섹션 */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-600 py-2 md:py-3">
              {day}
            </div>
          ))}
        </div>
        
        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {getDaysInMonth(currentDate).map((day, index) => (
            <div key={index} className="min-h-[45px] md:min-h-[50px] lg:min-h-[60px] flex flex-col items-center p-1 transition-colors duration-200 hover:bg-gray-50 hover:rounded-md">
              {day && (
                <>
                  <span className="text-sm md:text-base text-green-500 font-medium mb-1">
                    {day}
                  </span>
                  <div className="w-full flex flex-col gap-0.5">
                    {/* 특정 날짜에 이벤트 표시 (예시) */}
                    {day >= 3 && day <= 6 && (
                      <div className="bg-green-500 text-white text-[0.5rem] md:text-[0.5625rem] lg:text-[0.625rem] px-1 py-0.5 rounded-sm text-center whitespace-nowrap overflow-hidden text-ellipsis min-h-[0.875rem] md:min-h-[1rem] flex items-center justify-center">
                        {/* 빈 이벤트 바 */}
                      </div>
                    )}
                    {day === 8 && (
                      <div className="bg-green-500 text-white text-[0.5rem] md:text-[0.5625rem] lg:text-[0.625rem] px-1 py-0.5 rounded-sm text-center whitespace-nowrap overflow-hidden text-ellipsis min-h-[0.875rem] md:min-h-[1rem] flex items-center justify-center">
                        {/* 빈 이벤트 바 */}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 레이더 차트 섹션 */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-20">
        <div className="flex flex-col items-center">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-5 text-center">
            신청한 정책
          </h3>
          <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* 그리드 원들 */}
              {[20, 40, 60, 80, 100].map((radius, index) => (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}
              
              {/* 축 라인들 */}
              {categories.map((_, index) => {
                const angle = (index * 72) - 90; // 5개 축, 72도 간격
                const x = 100 + 100 * Math.cos((angle * Math.PI) / 180);
                const y = 100 + 100 * Math.sin((angle * Math.PI) / 180);
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="#e0e0e0"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* 데이터 폴리곤 */}
              <polygon
                points={categories.map((_, index) => {
                  const angle = (index * 72) - 90;
                  const value = normalizedData[index];
                  const x = 100 + (value * Math.cos((angle * Math.PI) / 180));
                  const y = 100 + (value * Math.sin((angle * Math.PI) / 180));
                  return `${x},${y}`;
                }).join(' ')}
                fill="#4CAF50"
                fillOpacity="0.3"
                stroke="#4CAF50"
                strokeWidth="2"
              />
              
              {/* 데이터 포인트들 */}
              {categories.map((_, index) => {
                const angle = (index * 72) - 90;
                const value = normalizedData[index];
                const x = 100 + (value * Math.cos((angle * Math.PI) / 180));
                const y = 100 + (value * Math.sin((angle * Math.PI) / 180));
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#4CAF50"
                  />
                );
              })}
            </svg>
            
            {/* 카테고리 라벨들 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {categories.map((category, index) => {
                const angle = (index * 72) - 90;
                const x = 100 + 120 * Math.cos((angle * Math.PI) / 180);
                const y = 100 + 120 * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={index}
                    className="absolute text-[0.5625rem] md:text-[0.625rem] lg:text-xs text-gray-600 font-medium text-center whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                    }}
                  >
                    {category}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
