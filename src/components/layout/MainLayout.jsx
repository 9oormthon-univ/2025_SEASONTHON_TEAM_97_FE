function MainLayout({ children }) {
  return (
    <main className="flex-1 overflow-y-auto pt-16 pb-12 bg-[#F5F5F5]">
      <div className="mx-auto">
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
