import React, { useState } from 'react';


function Button({
  onClick,
  disabled = false,
  children = '다음',
  className,
  style,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    if (onClick) onClick();
    
    // 1초 후 원래 색상으로 복원
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  // 색상 정의
  const brightGreen = '#13D564';
  const lightGreen = '#AEEAC7'; // 연한 녹색

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
      style={{
        width: 280,
        height: 36,
        background: isClicked ? lightGreen : brightGreen,
        color: '#FFFFFF',
        border: 'none',
        borderRadius: 4,
        fontSize: 16,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isClicked 
          ? '0 2px 8px rgba(168, 230, 207, 0.3)' 
          : '0 4px 12px rgba(6, 250, 107, 0.3)',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button; 