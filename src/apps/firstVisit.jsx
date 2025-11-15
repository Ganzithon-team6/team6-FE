import React from "react";
import "./firstVisit.css";
import logo from "@/assets/logo.svg";

export default function FirstVisit() {

  return (
    <div className="first-container">
      <img src={logo} alt="앱 로고" className="first-logo" />

      <div className="first-content">
        <h1 className="first-title">무엇을 하러 오셨나요?</h1>

        <div className="first-buttons">
          <button className="btn primary">🍞 음식 나눠줄래요</button>
          <button className="btn secondary">🙋 음식 받고 싶어요</button>
        </div>
      </div>
    </div>
  );
}
