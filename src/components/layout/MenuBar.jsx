import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeO from '../../assets/icons/home-o.svg';
import homeX from '../../assets/icons/home-x.svg';
import searchO from '../../assets/icons/search-o.svg';
import searchX from '../../assets/icons/search-x.svg';
import growthO from '../../assets/icons/growth-o.svg';
import growthX from '../../assets/icons/growth-x.svg';
import mypageO from '../../assets/icons/mypage-o.svg';
import mypageX from '../../assets/icons/mypage-x.svg';

function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 탭 결정
  const getCurrentTab = () => {
    if (location.pathname === '/home') return 'home';
    if (location.pathname === '/search') return 'search';
    if (location.pathname === '/mypage') return 'mypage';
    return 'home'; // 기본값
  };

  const currentTab = getCurrentTab();

  const handleTabClick = (tabName) => {
    // 탭에 따른 페이지 이동
    switch (tabName) {
      case 'home':
        navigate('/home');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'bookmark':
        // 북마크 페이지가 구현되면 여기에 경로 추가
        console.log('북마크 페이지로 이동');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
      default:
        break;
    }
  };

  const tabs = [
    { id: 'home', label: '홈', iconO: homeO, iconX: homeX },
    { id: 'search', label: '검색', iconO: searchO, iconX: searchX },
    { id: 'bookmark', label: '북마크', iconO: growthO, iconX: growthX },
    { id: 'mypage', label: '마이페이지', iconO: mypageO, iconX: mypageX },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-3 px-2 fixed bottom-0 left-0 z-50 flex justify-around items-center shadow-lg">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const currentIcon = isActive ? tab.iconO : tab.iconX;
        
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className="flex flex-col items-center bg-transparent border-none cursor-pointer p-1 rounded-lg transition-all duration-200 min-w-[45px]"
          >
            <img 
              src={currentIcon} 
              alt={tab.label}
              className="w-4 h-4 transition-all duration-200"
            />
          </button>
        );
      })}
    </footer>
  );
}

export default MenuBar;
