import React, { useCallback, useMemo } from 'react';

function SearchInput({
  value,
  defaultValue,
  onChange,
  onSearch,
  placeholder = '검색어를 입력해주세요.',
  className,
  style,
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (e) => {
      const next = e.target.value;
      if (!isControlled) {
        setInternalValue(next);
      }
      if (onChange) onChange(next);
    },
    [isControlled, onChange]
  );

  const triggerSearch = useCallback(() => {
    if (onSearch) onSearch(currentValue || '');
  }, [onSearch, currentValue]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch();
      }
    },
    [triggerSearch]
  );

  const styles = useMemo(() => {
    const green = '#13D564';
    return {
      wrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: 560,
        height: 44,
        borderRadius: 9999,
        border: `2px solid ${green}`,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08) inset',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 48,
        boxSizing: 'border-box',
        ...style,
      },
      input: {
        flex: 1,
        height: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: 14,
        color: '#1A1A1A',
      },
      placeholder: {
        color: '#BFBFBF',
      },
      iconButton: {
        position: 'absolute',
        right: 6,
        top: 6,
        bottom: 6,
        width: 32,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        background: 'transparent',
      },
      icon: {
        display: 'block',
      },
    };
  }, [style]);

  return (
    <div className={className} style={styles.wrapper}>
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={styles.input}
        aria-label="검색어 입력"
      />
      <button
        type="button"
        onClick={triggerSearch}
        style={styles.iconButton}
        aria-label="검색하기"
      >
        {/* Inline SVG (돋보기) */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.icon}
        >
          <circle cx="11" cy="11" r="7" stroke="#1ED760" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#1ED760" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default SearchInput;
