import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// 지금은 토큰 사용 안함 → 아예 빈 헤더만 유지
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

// 가게 예약 데이터 불러오기(가게 홈)
export async function fetchStoreData(marketId, accessToken) {
  if (USE_MOCK || !BASE_URL) {
    // 🔹 더미데이터 사용
    const res = await fetch('/mocks/storeReservations.json');
    if (!res.ok) throw new Error('mock 데이터 불러오기 실패');
    const data = await res.json();
    return data; // [{ centerName, endTime, count, status, reservationTime }, ...]
  }

  // 실제 서버
  const res = await fetch(
    `${BASE_URL}/api/market/reservations/read/${marketId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    }
  );

  if (!res.ok) {
    throw new Error('예약 조회 API 요청 실패');
  }

  const data = await res.json();
  return data;
}

// === 상품 등록 ===
export async function createFoods(items, marketId) {
  if (!marketId) throw new Error('marketId가 필요합니다.');

  if (USE_MOCK || !BASE_URL) {
    console.log('음식 등록(mock)', items);
    await new Promise((res) => setTimeout(res, 500));
    return { success: true };
  }

  // FormData 생성
  const formData = new FormData();

  // marketId가 path가 아니라 body로 필요하면 같이 append
  formData.append('marketId', marketId);

  // items를 FormData에 명세 형태로 넣기
  items.forEach((it, idx) => {
    // 텍스트/숫자 필드들
    formData.append(`foods[${idx}].name`, it.foodName);
    formData.append(`foods[${idx}].description`, it.description);
    formData.append(`foods[${idx}].count`, String(it.quantity));
    formData.append(`foods[${idx}].endTime`, `${it.deadlineDate}T23:59:59`);
    formData.append(`foods[${idx}].foodDeadline`, `${it.expireDate}T23:59:59`);

    // 이미지: File 그대로 append
    if (it.imageUrl) {
      formData.append(`foods[${idx}].image`, it.imageUrl);
      // ↑ 백엔드가 받는 키가 image가 아니라 imageUrl이면
      // formData.append(`foods[${idx}].imageUrl`, it.imageUrl);
      // 로 바꿔줘
    }
  });

  // axios POST
  const res = await axios.post(
    `${BASE_URL}/api/markets/${marketId}/products`,
    formData
  );

  return res.data;
}
