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
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <button
            onClick={handleBackClick}
            className="p-2 cursor-pointer"
            aria-label="뒤로가기"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="#13D564" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <h1 className="text-xl font-bold text-[#121212]">알림</h1>
          
          <div className="w-8"></div> {/* 스페이서 */}
        </div>

        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-[#121212] bg-gray-100 px-2 py-1 rounded">
                      [{notification.type}]
                    </span>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-[#13D564] rounded-full ml-2"></div>
                    )}
                  </div>
                  <p className="text-sm text-[#121212] leading-relaxed whitespace-pre-line">
                    {notification.title}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-xs text-gray-500">
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
