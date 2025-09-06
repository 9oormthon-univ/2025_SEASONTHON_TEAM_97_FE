import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-image-input").click();
  };

  const handleLogout = () => {
    // 로그아웃 처리
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem === "북마크") {
      navigate("/scrap");
    }
    // 다른 메뉴 클릭 처리
  };

  return (
    <div className="mx-auto ml-5 mr-5">
      {/* 프로필 섹션 */}
      <div className="text-center mb-8">
        <div className="inline-block mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">홍길동</h1>
        <p className="text-gray-500 text-sm">20대 / 남자 / 학생</p>
      </div>

      {/* 메뉴 섹션 */}
      <div className="space-y-6">
        {/* 프로필 */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">프로필</h2>
          <div className="space-y-2">
            <button
              onClick={triggerFileInput}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              이미지 변경
            </button>
            <button
              onClick={() => handleMenuClick("정보 변경")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              정보 변경
            </button>
          </div>
        </div>

        {/* 신청내역 */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">신청내역</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleMenuClick("기록 조회")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              기록 조회
            </button>
          </div>
        </div>

        {/* 즐겨찾기 */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">즐겨찾기</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleMenuClick("북마크")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              북마크
            </button>
          </div>
        </div>

        {/* 설정 */}
        <div>
          <h2 className="text-lg font-bold text-black mb-3">설정</h2>
          <div className="space-y-2">
            <button
              onClick={() => handleMenuClick("비밀번호 변경")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => handleMenuClick("알림 설정")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem] cursor-pointer"
            >
              알림 설정
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-1 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
