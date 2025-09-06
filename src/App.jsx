import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/auth/SplashScreen";
import LoginPage from "./components/auth/LoginPage";
import SignUp_1 from "./components/auth/SignUp_1";
import SignUp_2 from "./components/auth/SignUp_2";
import KakaoLoginCallback from "./components/auth/KakaoLoginCallback";
import LoginSuccess from "./components/auth/LoginSuccess";
import KakaoNickname from "./components/auth/KakaoNickname";
import Homepage from "./pages/HomePage.jsx";
import SearchPage from "./pages/Search.jsx";
import MyPage from "./pages/MyPage.jsx";
import AlarmPage from "./pages/AlarmPage.jsx";
import AllRecommendations from "./pages/AllRecommendations.jsx";
import Header from "./components/layout/Header";
import MainLayout from "./components/layout/MainLayout";
import MenuBar from "./components/layout/MenuBar";
import DevNavigation from "./components/layout/DevNavigation";
import Dashboard from "./pages/Dashboard.jsx";
import Scrap from "./pages/Scrap.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        {/* 개발자용 네비게이션 - 모든 페이지에 표시 */}
        <DevNavigation />
        <Routes>
          {/* 인증 관련 페이지 (레이아웃 없음) */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/step1" element={<SignUp_1 />} />
          <Route path="/signup/step2" element={<SignUp_2 />} />
          <Route path="/kakao-login-callback" element={<KakaoLoginCallback />} />
          <Route path="/KakaoLoginCallback" element={<KakaoLoginCallback />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/kakao-nickname" element={<KakaoNickname />} />
          
          {/* 메인 앱 페이지 (헤더 + 콘텐츠 + 네비 포함) */}
          <Route path="/home" element={
            <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
              <Header />
              <MainLayout>
                <Homepage />
              </MainLayout>
              <MenuBar />
            </div>
          } />
          <Route path="/search" element={
            <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
              <Header />
              <MainLayout>
                <SearchPage />
              </MainLayout>
              <MenuBar />
            </div>
          } />
          <Route path="/mypage" element={
            <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
              <Header />
              <MainLayout>
                <MyPage />
              </MainLayout>
              <MenuBar />
            </div>
          } />
          <Route path="/dashboard" element={
            <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
              <Header />
              <MainLayout>
                <Dashboard />
              </MainLayout>
              <MenuBar />
            </div>  
          } />
          <Route path="/scrap" element={
            <div className="w-full min-h-screen bg-[#FAFAF8] flex flex-col">
              <Header />
              <MainLayout>
                <Scrap />
              </MainLayout>
              <MenuBar />
            </div>
          } />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/all-recommendations" element={<AllRecommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
