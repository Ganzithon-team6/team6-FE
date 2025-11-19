import { useState, useEffect } from 'react';
import styles from './welfare_reservation.module.css';
import logo from '@/assets/logo.svg';

import { fetchStoreData } from '@/api/storeApi';

// 날짜를 YYYY-MM-DD 형식으로 변환
function formatYMD(date) { 
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// 날짜 라벨: 오늘 / 어제
function getDateLabel(dateStr) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = formatYMD(today);
  const yStr = formatYMD(yesterday);

  if (dateStr === todayStr) return '오늘';
  if (dateStr === yStr) return '어제';

  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

//시간 형식 변환
function formatTime(timeStr) {
  const d = new Date(timeStr);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function WelfareReservation() {
  return (
    <div className={styles.welfareReservationContainer}>
      <div className={styles.topHeader}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.topHeaderText}>예약 현황</div>
      </div>

      <div className={styles.reservationTable}>
        <div className={styles.storeName}>가게명</div>
        <div className={styles.deadline}>마감기한</div>
        <div className={styles.status}>상태</div>
      </div>
      <hr className={styles.divider} />
    </div>
  );
}