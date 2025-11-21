import './reservationList_row.css';
import icon_clock from '@/assets/icon_clock_selected.svg';
import icon_users from '@/assets/icon_people.svg';

function formatTime(timeStr) {
  const d = new Date(timeStr);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes()
  ).padStart(2, '0')}`;
}

export default function ReservationRow({ reservation }) {
  const { centerName, endTime, count, status } = reservation;

  const timeText = formatTime(endTime);

  const isPickupPending = status === '픽업 전';
  const isPickupDone = status === '픽업 완료';
  const isReviewDone = status === '작성 완료';

  // 라벨: 작성 완료는 체크만 붙여줌(원하면 제거 가능)
  const statusLabel = isReviewDone ? '✓ 작성 완료' : status;

  // 스타일 클래스 (표시용)
  let statusClass = 'status-pending';
  if (isPickupDone) statusClass = 'status-pickup-done';
  if (isReviewDone) statusClass = 'status-done';

  return (
    <div className="store-reservation-row">
      {/* 시설명 */}
      <div className="store-reservation-item">
        <p className="store-center-name break-text">{centerName || '미지정'}</p>
      </div>

      {/* 마감시간 */}
      <div className="store-reservation-item">
        <img src={icon_clock} alt="" className="icon-search" />
        <span className="store-time">{timeText}</span>
      </div>

      {/* 수량 */}
      <div className="store-reservation-item">
        <img src={icon_users} alt="" className="icon-search" />
        <span className="store-quantity">{count}</span>
      </div>

      {/* 상태 표시 (버튼이지만 항상 disabled) */}
      <div className={`store-reservation-item ${statusClass}`}>
        <button disabled aria-disabled="true">
          {statusLabel}
        </button>
      </div>
    </div>
  );
}
