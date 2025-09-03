import React, { useState } from 'react';
import homeO from '../../assets/icons/home-o.svg';
import homeX from '../../assets/icons/home-x.svg';
import searchO from '../../assets/icons/search-o.svg';
import searchX from '../../assets/icons/search-x.svg';
import bookmarkO from '../../assets/icons/bookmark-o.svg';
import bookmarkX from '../../assets/icons/bookmark-x.svg';
import mypageO from '../../assets/icons/mypage-o.svg';
import mypageX from '../../assets/icons/mypage-x.svg';

function MenuBar() {
  const [currentTab, setCurrentTab] = useState('home');

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    // 여기에 실제 네비게이션 로직을 추가할 수 있습니다
    console.log('탭 변경:', tabName);
  };

  const tabs = [
    { id: 'home', label: '홈', iconO: homeO, iconX: homeX },
    { id: 'search', label: '검색', iconO: searchO, iconX: searchX },
    { id: 'bookmark', label: '북마크', iconO: bookmarkO, iconX: bookmarkX },
    { id: 'mypage', label: '마이페이지', iconO: mypageO, iconX: mypageX },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-200 p-2 fixed bottom-0 left-0 z-50 flex justify-around items-center shadow-lg">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const currentIcon = isActive ? tab.iconO : tab.iconX;
        
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
              isActive ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            <img 
              src={currentIcon} 
              alt={tab.label}
              className="w-6 h-6 transition-all duration-200"
            />
            <span className={`text-xs font-medium transition-all duration-200 ${
              isActive ? 'text-green-500' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}

export default MenuBar;
