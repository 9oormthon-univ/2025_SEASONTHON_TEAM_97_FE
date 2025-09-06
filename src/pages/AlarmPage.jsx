import { useNavigate } from "react-router-dom";

export default function AlarmPage() {
  const navigate = useNavigate();

  // 더미 알람 데이터
  const notifications = [
    {
      id: 1,
      type: "주제톡",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: false,
    },
    {
      id: 2,
      type: "알림",
      title: "테스트입니다.\n테스트입니다.",
      time: "2025.09.21",
      isRead: false,
    },
    {
      id: 3,
      type: "알림",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: true,
    },
    {
      id: 4,
      type: "알림",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: true,
    },
    {
      id: 5,
      type: "알림",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: true,
    },
    {
      id: 6,
      type: "알림",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: true,
    },
    {
      id: 7,
      type: "알림",
      title: "테스트입니다.",
      time: "2025.09.21",
      isRead: true,
    },
  ];

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col bg-[#FAFAF8]">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 h-16 flex-shrink-0">
          <button
            onClick={handleBackClick}
            className="p-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <svg 
              width="0.625rem" 
              height="1.125rem" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#13D564" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <h1 className="font-['Pretendard'] flex flex-col justify-center" style={{ display: 'flex', width: '2.875rem', height: '1.5rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, lineHeight: 'normal' }}>알림</h1>
          
          <div className="w-8"></div> {/* 스페이서 */}
        </div>

        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ borderBottom: '1px solid #E9E9E9' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-['Pretendard'] bg-gray-100 px-2 py-1 rounded" style={{ width: '8.6875rem', height: '1.125rem', flexShrink: 0, color: '#121212', fontSize: '0.875rem', fontWeight: 600, lineHeight: 'normal', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      [{notification.type}]
                    </span>
                    {!notification.isRead && (
                      <div className="bg-[#13D564] rounded-full ml-2" style={{ width: '0.25rem', height: '0.25rem', flexShrink: 0, fill: '#13D564' }}></div>
                    )}
                  </div>
                  <p className="font-['Pretendard'] whitespace-pre-line flex flex-col justify-center" style={{ display: 'flex', width: '10rem', height: '0.75rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', fontSize: '0.75rem', fontWeight: 400, lineHeight: 'normal' }}>
                    {notification.title}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="font-['Pretendard'] flex flex-col justify-center" style={{ display: 'flex', width: '3.25rem', height: '0.75rem', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, color: '#121212', textAlign: 'center', fontSize: '0.625rem', fontWeight: 500, lineHeight: 'normal' }}>
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
