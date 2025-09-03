import React, { useState } from 'react';

function NavigationBar({
  activeTab = 'home',
  onTabChange,
  className,
  style,
}) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    if (onTabChange) onTabChange(tabName);
  };

  const green = '#13D564';
  const gray = '#9CA3AF';

  const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'search', icon: '🔍', label: '검색' },
    { id: 'bookmark', icon: '🔖', label: '북마크' },
    { id: 'profile', icon: '👤', label: '프로필' },
  ];

  return (
    <nav
      className={className}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        padding: '8px 0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        ...style,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabClick(tab.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: 8,
            transition: 'all 0.2s ease',
            minWidth: 60,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: currentTab === tab.id ? green : gray,
              transition: 'color 0.2s ease',
            }}
          >
            {tab.icon}
          </span>
          <span
            style={{
              fontSize: 12,
              color: currentTab === tab.id ? green : gray,
              fontWeight: currentTab === tab.id ? 600 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default NavigationBar; 