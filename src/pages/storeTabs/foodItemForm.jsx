import './foodItemForm.css';
import uploadIcon from '@/assets/icon_upload.svg';
import { useState, useEffect } from 'react';

export default function FoodItemForm({
  index,
  totalCount,
  item,
  onChange,
  onRemove,
}) {
  // 단일 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFieldChange = (field, value) => {
    onChange({
      ...item,
      [field]: value,
    });
  };

  // 이미지: 단일 File만 저장
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    onChange({
      ...item,
      imageUrl: file, // 배열이 아니라 File 하나
    });
  };

  // 미리보기 URL 생성/해제
  useEffect(() => {
    if (!item.imageUrl) {
      setPreviewUrl('');
      return;
    }

    const url = URL.createObjectURL(item.imageUrl);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [item.imageUrl]);

  return (
    <section className="food-item">
      {/* 상단 품목 번호 */}
      <div className="food-item-header">
        <div className="food-item-index-area">
          <span>
            품목 {index + 1} / {totalCount}
          </span>
        </div>
        {totalCount > 1 && (
          <button type="button" className="food-item-remove" onClick={onRemove}>
            삭제
          </button>
        )}
      </div>

      <div className="food-item-body">
        {/* 음식 이미지 업로드 / 미리보기 */}
        <div className="field">
          <label className="field-label">음식 사진</label>
          <div className="food-photo-box">
            {/* 단일 미리보기 */}
            {previewUrl && (
              <div className="food-photo-preview-list">
                <div className="food-photo-preview-item">
                  <img
                    src={previewUrl}
                    alt="선택한 이미지"
                    className="food-photo-preview-img"
                  />
                </div>
              </div>
            )}

            {/* 업로드 버튼 영역 */}
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
              <img src={uploadIcon} alt="업로드 아이콘" />
              <span className="upload-text">
                {previewUrl ? '이미지 변경' : '이미지 선택'}
              </span>
            </label>
          </div>
        </div>

        {/* 음식명 */}
        <div className="field">
          <label className="field-label">음식명</label>
          <input
            className="field-input"
            type="text"
            placeholder="예: 식빵 & 크루아상"
            value={item.foodName || ''}
            onChange={(e) => handleFieldChange('foodName', e.target.value)}
          />
        </div>

        {/* 음식 설명 */}
        <div className="field">
          <label className="field-label">음식설명</label>
          <input
            className="field-input"
            type="text"
            placeholder="예: 오후 3시에 구운 따끈따끈한 빵"
            value={item.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
        </div>

        {/* 수량 */}
        <div className="field">
          <label className="field-label">수량 (인분)</label>
          <div className="quantity-box">
            <button
              type="button"
              className="qty-btn"
              onClick={() =>
                handleFieldChange(
                  'quantity',
                  Math.max(1, (item.quantity || 1) - 1)
                )
              }
            >
              -
            </button>
            <span className="qty-value">{item.quantity || 1}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() =>
                handleFieldChange('quantity', (item.quantity || 1) + 1)
              }
            >
              +
            </button>
          </div>
        </div>

        {/* 유통기한 */}
        <div className="field">
          <label className="field-label">유통기한</label>
          <input
            className="field-input"
            type="date"
            value={item.expireDate || ''}
            onChange={(e) => handleFieldChange('expireDate', e.target.value)}
          />
        </div>

        {/* 마감기한 */}
        <div className="field">
          <label className="field-label">마감기한</label>
          <input
            className="field-input"
            type="date"
            value={item.deadlineDate || ''}
            onChange={(e) => handleFieldChange('deadlineDate', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
