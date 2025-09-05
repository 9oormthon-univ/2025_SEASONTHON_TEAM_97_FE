function MainLayout({ children }) {
  return (
    <main className="flex-1 overflow-y-auto pb-12 bg-[#FAFAF8]">
      <div className="mx-auto">
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
