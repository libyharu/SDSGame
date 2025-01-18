import React from "react";

type BackgroundProps = {
  children: React.ReactNode; // children을 명시적으로 정의
};

// any 를 사용하기 어려움
//React에서 컴포넌트를 정의할 때 사용할 수 있는 TypeScript의 유틸리티 타입
// const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      style={{
        backgroundColor: "#87CEEB", // 하늘색
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default Background;

//1. React.FC를 사용
//2. props를 정의
