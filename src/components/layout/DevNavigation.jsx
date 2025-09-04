import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DevNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { name: '스플래시(완료)', path: '/', color: 'bg-purple-500' },
    { name: '로그인', path: '/login', color: 'bg-blue-500' },
    { name: '회원가입1', path: '/signup/step1', color: 'bg-indigo-500' },
    { name: '회원가입2', path: '/signup/step2', color: 'bg-cyan-500' },
    { name: '카카오닉네임', path: '/kakao-nickname', color: 'bg-yellow-500' },
    { name: '로그인성공', path: '/login-success', color: 'bg-green-500' },
    { name: '홈', path: '/home', color: 'bg-emerald-500' },
    { name: '검색', path: '/search', color: 'bg-teal-500' },
    { name: '마이페이지', path: '/mypage', color: 'bg-orange-500' },
  ];

  const handlePageChange = (path) => {
    navigate(path);
    setIsVisible(false);
  };

  const currentPage = pages.find(page => page.path === location.pathname);

  return (
    <div className="fixed top-4 left-4 z-[9999]">
      {/* 호버 트리거 영역 */}
      <div
        className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-red-600 transition-all duration-200"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <span className="text-white text-xs font-bold">DEV</span>
      </div>

      {/* 네비게이션 메뉴 */}
      {isVisible && (
        <div
          className="absolute top-14 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="text-xs text-gray-500 mb-2 font-semibold">
            현재: {currentPage?.name || '알 수 없음'}
          </div>
          
          <div className="space-y-1">
            {pages.map((page) => {
              const isCurrentPage = location.pathname === page.path;
              return (
                <button
                  key={page.path}
                  onClick={() => handlePageChange(page.path)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 flex items-center gap-2 ${
                    isCurrentPage
                      ? 'bg-gray-100 text-gray-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${page.color}`}></div>
                  {page.name}
                  {isCurrentPage && (
                    <span className="ml-auto text-xs text-green-600">●</span>
                  )}
                </button>
              );
            })}
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
