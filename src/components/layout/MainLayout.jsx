function MainLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
