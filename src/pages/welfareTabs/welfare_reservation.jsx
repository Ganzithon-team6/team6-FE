import { useState, useEffect } from 'react';
import styles from './welfare_reservation.module.css';
import logo from '@/assets/logo.svg';

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
