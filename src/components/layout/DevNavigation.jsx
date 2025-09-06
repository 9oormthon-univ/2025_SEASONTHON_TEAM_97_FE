import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlarms } from "../../contexts/AlarmContext";

function DevNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 알람 훅 사용
  const { showRecommendationAlarm, showDeadlineAlarm } = useAlarms();

  const pages = [
    { name: "스플래시", path: "/", color: "bg-purple-500" },
    { name: "로그인", path: "/login", color: "bg-blue-500" },
    { name: "회원가입1", path: "/signup/step1", color: "bg-indigo-500" },
    { name: "회원가입2", path: "/signup/step2", color: "bg-cyan-500" },
    { name: "카카오닉네임", path: "/kakao-nickname", color: "bg-yellow-500" },
    { name: "로그인성공", path: "/login-success", color: "bg-green-500" },
    { name: "홈", path: "/home", color: "bg-emerald-500" },
    { name: "검색", path: "/search", color: "bg-teal-500" },
    { name: "마이페이지", path: "/mypage", color: "bg-orange-500" },
    { name: "스크랩", path: "/scrap", color: "bg-red-500" },
  ];

  const handlePageChange = (path) => {
    navigate(path);
    setIsVisible(false);
  };

  // 알람 테스트 함수들 (홈페이지에서만 실행)
  const testRecommendationAlarm = () => {
    if (location.pathname !== "/home") {
      alert("홈페이지에서만 알람을 테스트할 수 있습니다.");
      setIsVisible(false);
      return;
    }
    showRecommendationAlarm(
      {
        userName: "김청년",
        category: "청년창업",
        policyName: "청년창업지원금",
        count: 5,
      },
      true
    );
    setIsVisible(false);
  };

  const testDeadlineAlarm = () => {
    if (location.pathname !== "/home") {
      alert("홈페이지에서만 알람을 테스트할 수 있습니다.");
      setIsVisible(false);
      return;
    }
    showDeadlineAlarm(
      {
        policyId: "test_policy",
        category: "청년주거",
        policyName: "청년전세임대",
        daysLeft: 3,
      },
      true
    );
    setIsVisible(false);
  };

  const currentPage = pages.find((page) => page.path === location.pathname);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      {/* 클릭 트리거 영역 */}
      <div
        className="w-[3rem] h-[3rem] bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-red-600 transition-all duration-200"
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="text-white text-xs font-bold">DEV</span>
      </div>

      {/* 네비게이션 메뉴 */}
      {isVisible && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]">
          <div className="text-xs text-gray-500 mb-2 font-semibold">
            현재: {currentPage?.name || "알 수 없음"}
          </div>

          <div className="space-y-1">
            {pages.map((page) => {
              const isCurrentPage = location.pathname === page.path;
              return (
                <button
                  key={page.path}
                  onClick={() => handlePageChange(page.path)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                    isCurrentPage
                      ? "bg-gray-100 text-gray-800 font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <div
                    className={`w-[0.75rem] h-[0.75rem] rounded-full ${page.color}`}
                  ></div>
                  {page.name}
                  {isCurrentPage && (
                    <span className="ml-auto text-xs text-green-600">●</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 알람 테스트 섹션 */}
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2 font-semibold">
              알람 테스트
            </div>
            <div className="space-y-1">
              <button
                onClick={testRecommendationAlarm}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 flex items-center gap-2 cursor-pointer"
              >
                <div className="w-[0.75rem] h-[0.75rem] rounded-full bg-blue-500"></div>
                알람 1 (맞춤 추천)
              </button>
              <button
                onClick={testDeadlineAlarm}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150 flex items-center gap-2 cursor-pointer"
              >
                <div className="w-[0.75rem] h-[0.75rem] rounded-full bg-red-500"></div>
                알람 2 (마감일)
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              개발 모드 - 배포 시 제거
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DevNavigation;
