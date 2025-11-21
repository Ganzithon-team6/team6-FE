const BASE_URL = import.meta.env.VITE_API_BASE_URL; // 나중에 백엔드 주소 넣을 곳
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// 복지시설 가게 상품 목록 불러오기 - completed
export async function fetchPosts() {
  if (USE_MOCK || !BASE_URL) {
    // 🔹 개발 중: 더미 JSON 사용
    const res = await fetch('../mocks/posts.json');
    if (!res.ok) throw new Error('mock 데이터 불러오기 실패');
    const data = await res.json();
    // 필요하면 여기서 sortType에 따라 정렬해도 됨
    return data;
  }

  const res = await fetch(`${BASE_URL}/api/center/products/get`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('API 요청 실패');
  const data = await res.json();
  return data;
}

// 복지시설 예약 현황 조회 - completed
export async function loadReservation(centerId) {
  if (USE_MOCK || !BASE_URL) {
    // 개발 중: 더미 JSON 사용
    const res = await fetch('../mocks/reservation.json');
    if (!res.ok) throw new Error('mock 데이터 불러오기 실패');
    const data = await res.json();
    // 필요하면 여기서 sortType에 따라 정렬해도 됨
    return data;
  }

  const res = await fetch(
    `${BASE_URL}/api/center/reservations/read/${centerId}`,
    {
      method: 'GET',
    }
  );
  if (!res.ok) throw new Error('API 요청 실패');
  console.log('예약 현황 조회 응답', res);
  return data;
}

export async function createReservation(productId, centerId, count) {
  console.log('예약 생성 API 호출', { productId, centerId, count });
  const res = await fetch(`${BASE_URL}/api/center/reservations/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, centerId, count }),
  });
  if (!res.ok) throw new Error('API 요청 실패');
  return res;
}

// 복지시설 리뷰 불러오기 - completed
export async function loadReview(marketId) {
  let data;
  if (USE_MOCK || !BASE_URL) {
    // 개발 중: 더미 JSON 사용
    const res = await fetch('../mocks/review.json');
    if (!res.ok) throw new Error('mock 데이터 불러오기 실패');
    data = await res.json();
  }

  const res = await fetch(`${BASE_URL}/api/reviews/market/${marketId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('API 요청 실패');
  data = await res.json();

  // marketId에 해당하는 리뷰만 필터링
  const item = data.find((r) => r.marketId === marketId);
  return item;
}

//-----------------------------------------------------------------------
// 복지시설 홈- 음식 상세페이지 들어갔을때 - completed
export async function fetchCenterProductDetail(productId) {
  let data;
  //더미
  if (USE_MOCK || !BASE_URL) {
    const res = await fetch('/mocks/productDetail.json');
    if (!res.ok) throw new Error('mock 상세 데이터 불러오기 실패');
    const list = await res.json();

    data = list.find((item) => item.productId === Number(productId));
    if (!data) throw new Error('해당 상품을 찾을 수 없습니다.');
  } else {
    const res = await fetch(
      `${BASE_URL}/api/center/products/get/detail/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 나중 JWT
        },
      }
    );
    if (!res.ok) throw new Error('상품 상세 API 요청 실패');
    data = await res.json();
  }

  return data;
}

export async function checkReceipt(reservationId, file) {
  const res = await fetch(`${BASE_URL}/api/receipts/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reservationId, file }),
  });
  return res.status == 'SUCCESS' ? true : false;
}
