import {useState} from "react";
import {Link} from "react-router-dom";
import bellSvg from "../../assets/icons/Union.svg";
export default function Homepage(){
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="flex flex-row items-end w-full justify-end p-8" > 
                <img src={bellSvg} alt="bell" style={{ width: '22px', height: '27px', flexShrink: 0 }} />
            </div>
            <div >
                <h1 style={{ 
                color: "#121212",
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "normal",
                textAlign: "left",
                paddingBottom: "8px",  
                paddingLeft: "16px"  
                }}>오늘 나와 비슷한 나이에게 추천
                </h1>
            </div>
            <div className="p-2.75">
                <div style={{
                    padding:'16px',
                    width:'280px',
                    height:'200px',
                    backgroundColor: "#13D564",
                    borderRadius:"18px",
                    paddingLeft:"18px",
                    paddingTop:"18px",
                    }}>
                        <h1 style={{
                            width:'62px',
                            height:'20px',
                            borderRadius:'6px',
                            background:'#27AA5E',
                            fontFamily: "Pretendard",
                            fontSize:'10px',
                            fontWeight:'700',
                            lineHeight:'normal',
                            textAlign:'center',
                            color:'#FFF',
                        }}>매칭률 90%</h1>
                </div>
            </div>
            <div>
                <h1 style={{
                    color:'#121212',
                    fontFamily: "Pretendard",
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "normal",
                    marginTop: '10px',
                }}>맞춤 추천
                </h1>
            </div>

            {/* 추천 리스트 */}
            <div style={{
                backgroundColor: "#FFF",
                borderRadius: "12px",
                marginTop: "8px",
            }}>
                <div style={{ padding: "16px", borderBottom: "1px solid #eee" }}>
                    <p style={{ fontSize: "12px", color: "#121212" }}>[제목] 테스트</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", marginTop: "4px" }}>게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p style={{ fontSize: "12px", color: "red", marginTop: "6px" }}>오늘 마감</p>
                </div>

                <div style={{ padding: "16px", borderBottom: "1px solid #eee" }}>
                    <p style={{ fontSize: "12px", color: "#121212" }}>[제목] 테스트</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", marginTop: "4px" }}>게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "6px" }}>오늘 마감</p>
                </div>

                <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: "12px", color: "#121212" }}>[제목] 테스트</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", marginTop: "4px" }}>게시글의 첫 문장을 미리 보여줍니다.</p>
                    <p style={{ fontSize: "12px", color: "blue", marginTop: "6px" }}>D-50</p>
                </div>
            </div>

        </div>
    );
};
