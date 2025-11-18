import { useState, useEffect } from 'react';
import styles from './welfare_reservation.module.css';
import logo from '@/assets/logo.svg';

// API
import { loadReservation } from '@/api/welfareApi.js';

// "2025-11-25T23:59:59Z" -> "2025.11.25"
function formatExpirationDate(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

// reservedAt -> 섹션 키용(YYYY-MM-DD)
function getDateKey(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return 'invalid';
  return d.toISOString().split('T')[0]; // "2025-11-12"
}

// reservedAt -> "11월 12일"
function formatReservedLabel(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ko-KR', {
    month: 'long', // "11월"
    day: 'numeric', // "12일"
  });
}

export default function WelfareReservation() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    loadReservation()
      .then((data) => {
        setPosts(data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 날짜별 그룹화 (reservedAt 기준)
  const grouped = posts.reduce((acc, item) => {
    const key = getDateKey(item.reservedAt);
    if (!acc[key]) {
      acc[key] = {
        label: formatReservedLabel(item.reservedAt),
        items: [],
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  // 날짜 내림차순 정렬 (최근 날짜 위로)
  const sortedDateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const handleReviewClick = (item) => {
    if (item.isReviewed) {
      console.log('이미 리뷰 작성 완료:', item.storeId);
      return;
    }
    console.log('리뷰 작성으로 이동 예정:', item.storeId);
    // 예: navigate(`/review/${item.storeId}`);
  };

  return (
    <div className={styles.welfareReservationContainer}>
      {/* 상단 헤더 */}
      <div className={styles.topHeader}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.topHeaderText}>예약 현황</div>
      </div>

      {/* 컬럼 헤더 */}
      <div className={styles.reservationTableHeader}>
        <div>가게명</div>
        <div>마감기한</div>
        <div>상태</div>
      </div>
      <hr className={styles.divider} />

      {/* 로딩 / 빈 상태 / 리스트 */}
      {loading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : posts.length === 0 ? (
        <div className={styles.empty}>예약 내역이 없습니다.</div>
      ) : (
        <div className={styles.reservationList}>
          {sortedDateKeys.map((dateKey) => {
            const section = grouped[dateKey];
            return (
              <div key={dateKey} className={styles.dateSection}>
                {/* 날짜 헤더: 예) 11월 12일 */}
                <div className={styles.dateLabel}>{section.label}</div>

                {/* 해당 날짜의 예약들 */}
                {section.items.map((item) => (
                  <div>
                    <div key={item.storeId} className={styles.row}>
                      <div className={styles.cellStore}>{item.storeName}</div>
                      <div className={styles.cellDeadline}>
                        {formatExpirationDate(item.expirationDate)}
                      </div>
                      <div className={styles.cellStatus}>
                        {item.isReviewed ? (
                          <button
                            type="button"
                            className={`${styles.statusButton} ${styles.statusDone}`}
                            onClick={() => handleReviewClick(item)}
                          >
                            ✓ 작성 완료
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={`${styles.statusButton} ${styles.statusTodo}`}
                            onClick={() => handleReviewClick(item)}
                          >
                            리뷰작성
                          </button>
                        )}
                      </div>
                    </div>
                    <hr className={styles.sectionDivider} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
