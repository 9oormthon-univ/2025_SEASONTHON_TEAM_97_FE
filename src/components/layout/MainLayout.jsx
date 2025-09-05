import { useAlarms } from '../../contexts/AlarmContext';
import RecommendationAlarm from '../common/RecommendationAlarm';
import DeadlineAlarm from '../common/DeadlineAlarm';

function MainLayout({ children }) {
  // 전역 알람 관리
  const {
    recommendationAlarm,
    deadlineAlarm,
    closeRecommendationAlarm,
    closeDeadlineAlarm
  } = useAlarms();


  return (
    <>
      <main className="flex-1 overflow-y-auto pb-12 bg-[#FAFAF8]">
        <div className="mx-auto">
          {children}
        </div>
      </main>
      
      {/* 전역 알람 모달들 */}
      <RecommendationAlarm
        isOpen={recommendationAlarm.isOpen}
        onClose={closeRecommendationAlarm}
        userName={recommendationAlarm.userName}
        category={recommendationAlarm.category}
        policyName={recommendationAlarm.policyName}
        count={recommendationAlarm.count}
      />
      
      <DeadlineAlarm
        isOpen={deadlineAlarm.isOpen}
        onClose={closeDeadlineAlarm}
        category={deadlineAlarm.category}
        policyName={deadlineAlarm.policyName}
        daysLeft={deadlineAlarm.daysLeft}
      />
    </>
  );
}

export default MainLayout;
