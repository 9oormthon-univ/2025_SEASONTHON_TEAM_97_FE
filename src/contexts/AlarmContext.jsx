import React, { createContext, useContext, useState, useEffect } from "react";

const AlarmContext = createContext();

export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error("useAlarms must be used within an AlarmProvider");
  }
  return context;
};

export const AlarmProvider = ({ children }) => {
  const [recommendationAlarm, setRecommendationAlarm] = useState({
    isOpen: false,
    userName: "",
    category: "",
    policyName: "",
    count: 0,
  });

  const [deadlineAlarm, setDeadlineAlarm] = useState({
    isOpen: false,
    category: "",
    policyName: "",
    daysLeft: 0,
  });

  // 맞춤 추천 알람 표시
  const showRecommendationAlarm = (userData, forcedShow = false) => {
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("lastRecommendationAlarm");

    // 강제 표시이거나 하루에 한 번만 표시
    if (forcedShow || lastShown !== today) {
      const alarmData = {
        isOpen: true,
        userName: userData.userName || "사용자",
        category: userData.category || "청년",
        policyName: userData.policyName || "정책",
        count: userData.count || 0,
      };
      setRecommendationAlarm(alarmData);
    }
  };

  // 마감일 알람 표시
  const showDeadlineAlarm = (policyData, forcedShow = false) => {
    const today = new Date().toDateString();
    const alarmKey = `deadlineAlarm_${policyData.policyId || "default"}`;
    const lastShown = localStorage.getItem(alarmKey);

    // 강제 표시이거나 하루에 한 번만 표시
    if (forcedShow || lastShown !== today) {
      const alarmData = {
        isOpen: true,
        category: policyData.category || "정책",
        policyName: policyData.policyName || "정책",
        daysLeft: policyData.daysLeft || 5,
      };
      setDeadlineAlarm(alarmData);
    }
  };

  // 맞춤 추천 알람 닫기
  const closeRecommendationAlarm = () => {
    setRecommendationAlarm((prev) => ({ ...prev, isOpen: false }));
    const today = new Date().toDateString();
    localStorage.setItem("lastRecommendationAlarm", today);
  };

  // 마감일 알람 닫기
  const closeDeadlineAlarm = () => {
    const policyId = deadlineAlarm.policyId || "default";
    setDeadlineAlarm((prev) => ({ ...prev, isOpen: false }));
    const today = new Date().toDateString();
    const alarmKey = `deadlineAlarm_${policyId}`;
    localStorage.setItem(alarmKey, today);
  };

  // 북마크된 정책들의 마감일 체크
  const checkBookmarkedPoliciesDeadline = () => {
    const bookmarkedPolicies = JSON.parse(
      localStorage.getItem("bookmarkedPolicies") || "[]"
    );
    const today = new Date();

    bookmarkedPolicies.forEach((policy) => {
      if (policy.deadline && policy.deadline !== "상시") {
        // 마감일 파싱 (예: "2024.12.31", "D-5" 등)
        let daysLeft = 0;

        if (policy.deadline.includes("D-")) {
          daysLeft = parseInt(policy.deadline.match(/\d+/)?.[0]) || 0;
        } else if (policy.deadline.includes(".")) {
          const [year, month, day] = policy.deadline.split(".").map(Number);
          const deadlineDate = new Date(year, month - 1, day);
          daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        }

        // 5일 이하 남았으면 알람 표시
        if (daysLeft <= 5 && daysLeft > 0) {
          showDeadlineAlarm({
            policyId: policy.id,
            category: policy.category || "정책",
            policyName: policy.plcyNm || policy.name || "정책",
            daysLeft: daysLeft,
          });
        }
      }
    });
  };

  // 컴포넌트 마운트 시 북마크 정책 마감일 체크
  useEffect(() => {
    checkBookmarkedPoliciesDeadline();
  }, []);

  const value = {
    recommendationAlarm,
    deadlineAlarm,
    showRecommendationAlarm,
    showDeadlineAlarm,
    closeRecommendationAlarm,
    closeDeadlineAlarm,
    checkBookmarkedPoliciesDeadline,
  };

  return (
    <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>
  );
};
