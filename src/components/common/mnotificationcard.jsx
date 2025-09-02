import React from 'react';

function MNotificationCard({
  title = '',
  message = '',
  date,
  onClose,
  onClick,
  className,
  style,
}) {
  const green = '#06FA6B';

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        border: `2px solid ${green}`,
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        ...style,
      }}
    >
      {/* 좌측: 제목/메시지 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {title && (
          <div style={{ color: green, fontWeight: 700 }}>{title}</div>
        )}
        {message && (
          <div style={{ color: green, opacity: 0.9 }}>{message}</div>
        )}
      </div>

      {/* 우측: 날짜 */}
      <div style={{ color: green, alignSelf: 'center', whiteSpace: 'nowrap' }}>
        {date}
      </div>

      {/* 닫기 아이콘 (X) */}
      <button
        type="button"
        aria-label="알림 닫기"
        onClick={(e) => {
          e.stopPropagation();
          if (onClose) onClose();
        }}
        style={{
          position: 'absolute',
          top: 8,
          right: 10,
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: green,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          lineHeight: 1,
          padding: 0,
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6L18 18M18 6L6 18" stroke={green} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default MNotificationCard; 