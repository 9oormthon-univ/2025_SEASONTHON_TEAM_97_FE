import React from 'react';

function NotificationCard({
  title = '[알림]',
  message = '',
  date,
  dot = true,
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
      {/* 왼쪽 텍스트 블록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ color: green, fontWeight: 700 }}>{title}</div>
        {message && (
          <div style={{ color: green, opacity: 0.9 }}>{message}</div>
        )}
      </div>

      {/* 오른쪽 날짜 */}
      <div style={{ color: green, alignSelf: 'center', whiteSpace: 'nowrap' }}>
        {date}
      </div>

      {/* 우측 상단 dot */}
      {dot && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 8,
            right: 10,
            width: 6,
            height: 6,
            borderRadius: 999,
            backgroundColor: green,
          }}
        />
      )}
    </div>
  );
}

export default NotificationCard; 