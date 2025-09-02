import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSvg from "../../assets/icons/Group 1000003882.svg";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 /login으로 이동
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#BDBDBD]">
      {/* 메인 콘텐츠 영역 */}
      <div className="h-screen w-[480px] mx-auto flex flex-col items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          {/* SVG 로고 */}
          <img src={logoSvg} alt="청춘스케치" className="w-32 h-32 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
