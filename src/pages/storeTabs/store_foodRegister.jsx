import { useState } from 'react';
import FoodItemForm from './foodItemForm.jsx';
import './store_foodRegister.css';
import { createFoods } from '@/api/storeApi';

/**
 * 개별 음식 아이템의 초기 상태를 만드는 함수
 * 사용자가 여러 개 등록할 수 있으므로, 등록 폼 한 개를 반환한다.
 */
function createEmptyItem() {
  return {
    id: crypto.randomUUID(), // 프론트에서만 쓰는 임시 id (리스트 관리용)
    foodName: '', // 음식 이름
    description: '', // 설명 (선택)
    quantity: 1, // 수량 (기본값 1)
    expireDate: '', // 유통기한
    deadlineDate: '', // 수령 마감 날짜(필수)
    imageUrl: '', // 이미지 URL
  };
}

export default function StoreFoodRegister({ setActiveTab }) {
  // 등록할 품목 리스트 (최초 1개)
  const [items, setItems] = useState([createEmptyItem()]);

  // 중복 제출 방지용 (버튼 비활성화)
  const [submitting, setSubmitting] = useState(false);

  /**
   * 개별 아이템 변경 시 업데이트하는 함수
   * - id로 특정 아이템을 찾아서 수정된(newItem) 값으로 교체한다.
   */
  const handleChangeItem = (id, newItem) => {
    setItems((prev) => prev.map((it) => (it.id === id ? newItem : it)));
  };

  /**
   * 새로운 빈 아이템을 하나 추가한다.
   */
  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  /**
   * 특정 아이템(id)을 리스트에서 제거한다.
   */
  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  /**
   * 전체 품목 등록 submit 함수
   * - 입력 검증
   * - API 호출
   * - 성공 시 초기화 및 홈 탭 전환
   */
  const handleSubmitAll = async (e) => {
    e.preventDefault();

    if (submitting) return; // 이미 제출 중이면 중복 방지

    // 필수 입력 체크: 음식 이름, 수량, deadlineDate
    const hasEmpty = items.some(
      (it) => !it.foodName || !it.quantity || !it.deadlineDate
    );

    if (hasEmpty) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true); // 로딩 상태 시작

    try {
      const marketId = JSON.parse(localStorage.getItem('user'))?.userId;
      const res = await createFoods(items, marketId); // 여러 품목 API로 한번에 전송
      if (!res.success) throw new Error('음식 등록에 실패했습니다.');
      alert('음식이 등록되었습니다.');

      // 등록 후 폼 초기화: 가장 첫 번째 빈 폼 1개만 남김
      setItems([createEmptyItem()]);

      // 등록 후 'home' 탭으로 이동
      setActiveTab('home');
    } catch (err) {
      console.error(err);
      alert(err.message || '등록에 실패했습니다.');
    } finally {
      setSubmitting(false); // 로딩 종료
    }
  };

  return (
    <form className="food-register" onSubmit={handleSubmitAll}>
      {/* 상단 소개 문구 */}
      <header className="food-register-header">
        <h1 className="store-name">오늘의 남은 한 조각, </h1>
        <p className="store-name">누군가의 따뜻한 한 끼가 됩니다.</p>
      </header>

      {/* 품목 리스트 – 세로 스크롤 가능 영역 */}
      <div className="food-items-scroll">
        {items.map((item, index) => (
          <FoodItemForm
            key={item.id} // React key
            index={index} // 표시용 번호
            totalCount={items.length} // 총 아이템 수 (삭제 버튼 조건 등에 사용)
            item={item} // 해당 아이템 데이터
            onChange={(newItem) => handleChangeItem(item.id, newItem)} // 필드 변경 시 호출
            onRemove={() => handleRemoveItem(item.id)} // 삭제 이벤트
          />
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="food-register-footer">
        <button type="button" className="btn-secondary" onClick={handleAddItem}>
          품목 추가
        </button>

        <button
          type="submit"
          className="btn-primary"
          disabled={submitting || items.length === 0}
        >
          {/* 제출 중이면 로딩 텍스트 변경 */}
          {submitting ? '등록 중...' : '모두 등록하기'}
        </button>
      </div>
    </form>
  );
}
