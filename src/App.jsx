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
import Header from "./components/layout/Header";
import MainLayout from "./components/layout/MainLayout";
import MenuBar from "./components/layout/MenuBar";
import DevNavigation from "./components/layout/DevNavigation";

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
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/kakao-nickname" element={<KakaoNickname />} />
          
          {/* 메인 앱 페이지 (헤더 + 네비 포함) */}
          <Route path="/home" element={
            <>
              <Header />
              <MainLayout>
                <Homepage />
              </MainLayout>
              <MenuBar />
            </>
          } />
          <Route path="/search" element={
            <>
              <Header />
              <MainLayout>
                <SearchPage />
              </MainLayout>
              <MenuBar />
            </>
          } />
          <Route path="/mypage" element={
            <>
              <Header />
              <MainLayout>
                <MyPage />
              </MainLayout>
              <MenuBar />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
