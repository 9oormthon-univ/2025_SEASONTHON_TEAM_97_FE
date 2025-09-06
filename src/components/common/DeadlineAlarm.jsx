import React from 'react';

const DeadlineAlarm = ({ 
  isOpen, 
  onClose, 
  category = "청년", 
  policyName = "정책", 
  daysLeft = 5 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[9999] px-0 pb-0">
      <div 
        className={`relative w-full transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* 알람 배경 - 흰색 둥근 모서리 */}
        <div className="bg-white relative overflow-hidden" style={{ width: '24.375rem', height: '19.75rem', flexShrink: 0, borderRadius: '2.25rem 2.25rem 0 0', background: '#FFF' }}>
          
          {/* 상단 컨텐츠 영역 */}
          <div className="px-6 pt-8 pb-6 text-center">
            {/* 제목 */}
            <h2 className="text-[#13D564] text-lg font-bold mb-6 font-['Pretendard']">
              잇지 말고 확인 하세요!
            </h2>
            
            {/* 메시지 */}
            <div className="text-center mb-8">
              <p className="text-[#13D564] text-sm font-medium font-['Pretendard']">
                {category} {policyName}의 마감일이 얼마 안 남았어요!
              </p>
            </div>
          </div>
          
          {/* 하단 버튼 영역 */}
          <div style={{ background: '#13D564' }} className="py-4 px-6">
            <button
              onClick={onClose}
              className="text-white text-sm font-medium font-['Pretendard'] w-full text-center"
            >
              오늘 하루 이 창이 또시 열지지 않기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineAlarm;
