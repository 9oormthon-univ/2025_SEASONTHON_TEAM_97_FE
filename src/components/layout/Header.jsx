import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/home';
  
  // 신규 알람 상태 (실제로는 상태 관리나 API에서 가져올 값)
  const hasNewAlarm = true;

  const handleAlarmClick = () => {
    navigate('/alarm');
  };

  return (
    <header className="w-full bg-[#FAFAF8] text-white pt-10 pb-4 px-4 text-center fixed top-0 left-0 z-50 relative">
      
      {/* 홈페이지일 때만 알람 아이콘 표시 */}
      {isHomePage && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {hasNewAlarm ? (
            // 신규 알람이 있을 때 alarm-o.svg
            <img
              src="/src/assets/icons/alarm-o.svg" 
              alt="New alarm" 
              className="w-6 h-6 cursor-pointer"
              onClick={handleAlarmClick}
            />
          ) : (
            // 신규 알람이 없을 때 alarm-x.svg
            <img 
              src="/src/assets/icons/alarm-x.svg" 
              alt="No alarm" 
              className="w-6 h-6 cursor-pointer"
              onClick={handleAlarmClick}
            />
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
