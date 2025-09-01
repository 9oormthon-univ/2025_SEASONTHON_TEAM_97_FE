// 인가코드를 백엔드에 전달(파싱)할 코드 작성된 페이지

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const KakaoLoginCallback = () => {
    const navigate = useNavigate();

    // 현재 url에서 쿼리 스트링(인가코드) 파싱
    const code = new URLSearchParams(window.location.search).get('code');
    
    useEffect(()=> {
        const fetchToken = async () => {
            try {
                // 백엔드로 전송
                // import.meta.env.VITE_APP_URL: .env 파일에 정의된 백엔드 서버 주소 (예: http://localhost:8080)
                // /callback: 백엔드에서 구현한 카카오 로그인 처리용 API 경로
                console.log("인가코드:", code);
                
                const response = await axios.get(`${import.meta.env.VITE_APP_URL}/callback`, {
                    params: { code }
                });

                //응답 파싱
                const {accessToken, userId, userName} = response.data;

                // 토큰&사용자 정보 받아서 localStorage에 저장
                localStorage.setItem("userId", userId);
                localStorage.setItem("userName", userName);
                localStorage.setItem("accessToken", accessToken);

                console.log("응답 데이터:", response.data);

                //로그인 성공 시 페이지 이동
                console.log("로그인 성공! 페이지 이동");
                navigate('/LoginSuccess');
            } catch (error) {
                alert("카카오 로그인 실패" + error.response?.data?.message);
            }
        };

        if (code) {
            fetchToken();
        } else {
            alert("인가코드 없음" + error.response?.data?.message);
            navigate('/');
        }

    }, [code, navigate]);

    return (
        <div>카카오 로그인 처리 중...</div>
    )
}

export default KakaoLoginCallback;