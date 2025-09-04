import React, { useState } from "react";

export default function MyPage() {
  const [profileImage, setProfileImage] = useState(null);

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

  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log("로그아웃");
    // 여기에 실제 로그아웃 로직을 추가할 수 있습니다
  };

  const handleMenuClick = (menuItem) => {
    console.log(`${menuItem} 클릭됨`);
    // 여기에 각 메뉴 항목에 대한 실제 기능을 구현할 수 있습니다
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 프로필 섹션 */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
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
          <label className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1 cursor-pointer hover:bg-green-600 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
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
              onClick={() => handleMenuClick("이미지 변경")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
            >
              이미지 변경
            </button>
            <button
              onClick={() => handleMenuClick("정보 변경")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
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
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
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
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
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
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => handleMenuClick("알림 설정")}
              className="w-full text-left py-2 px-1 text-black hover:text-green-500 transition-colors text-[0.85rem]"
            >
              알림 설정
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-1 text-red-500 hover:text-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
