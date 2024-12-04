import React, { useEffect, useState } from "react";
import "./style.scss";
import { apiLink } from "../../../config/api";

const LuckyWheelVoucher = ({ onVoucherSelected }) => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(`${apiLink}/api/voucher/list`);
        const result = await response.json();
        if (response.ok) {
          setVouchers(result.data);
        } else {
          console.error("Error fetching vouchers:", result.message);
        }
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleSpin = () => {
    if (isSpinning || vouchers.length === 0 || hasSpun) return;
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * vouchers.length);
    const selected = vouchers[randomIndex];

    const segmentAngle = 360 / vouchers.length;
    const targetRotation = rotation + 360 * 5 + randomIndex * segmentAngle;

    setRotation(targetRotation);

    setTimeout(() => {
      setSelectedVoucher(selected);
      if (onVoucherSelected) onVoucherSelected(selected);
      setIsSpinning(false);
      setHasSpun(true);
    }, 3000);
  };

  return (
    <div className="modern-wheel">
      <div className="wheel-container">
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          {vouchers.map((voucher, index) => (
            <div
              key={voucher._id}
              className="wheel-segment"
              style={{
                transform: `rotate(${index * (360 / vouchers.length)}deg)`
              }}
            >
              <div className="segment-content">{`${voucher?.discount}%`}</div>
            </div>
          ))}
        </div>

        <div
          className={`wheel-center ${isSpinning || hasSpun ? "disabled" : ""}`}
          onClick={handleSpin}
        >
          {isSpinning ? "" : hasSpun ? "Đã quay" : "Quay"}
        </div>
      </div>
      {selectedVoucher && (
        <div className="voucher-result">
          <p>Chúc mừng bạn nhận được voucher:</p>
          <p>
            <strong>{selectedVoucher.code}</strong> - Giảm{" "}
            <strong>{selectedVoucher.discount}%</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default LuckyWheelVoucher;
