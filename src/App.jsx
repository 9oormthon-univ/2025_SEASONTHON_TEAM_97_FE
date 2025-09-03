import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/auth/SplashScreen";
import LoginPage from "./components/auth/LoginPage";
import SignUp_1 from "./components/auth/SignUp_1";
import SignUp_2 from "./components/auth/SignUp_2";
import KakaoLoginCallback from "./components/auth/KakaoLoginCallback";
import LoginSuccess from "./components/auth/LoginSuccess";
import KakaoNickname from "./components/auth/KakaoNickname";
import Homepage from "./pages/home";
import SearchPage from "./pages/search";
import MyPage from "./pages/mypage";
import Header from "./components/layout/Header";
import MainLayout from "./components/layout/MainLayout";
import MenuBar from "./components/layout/MenuBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup-1" element={<SignUp_1 />} />
          <Route path="/signup-2" element={<SignUp_2 />} />
          <Route path="/KakaoLoginCallback" element={<KakaoLoginCallback />} />
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
          <Route path="/kakao-nickname" element={<KakaoNickname />} />
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
          <Route path="/Home" element={
            <>
              <Header />
              <MainLayout>
                <Homepage />
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
