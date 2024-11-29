import React, { useState } from "react";
import "./style.scss";

const vouchers = [
  { label: "5%", code: "HDTECH5", percentage: 5 },
  { label: "10%", code: "HDTECH10", percentage: 10 },
  { label: "15%", code: "HDTECH15", percentage: 10 },
  { label: "20%", code: "HDTECH20", percentage: 15 },
  { label: "25%", code: "HDTECH25", percentage: 10 },
  { label: "30%", code: "HDTECH30", percentage: 10 },
  { label: "35%", code: "HDTECH35", percentage: 10 },
  { label: "40%", code: "HDTECH40", percentage: 10 },
  { label: "45%", code: "HDTECH45", percentage: 10 },
  { label: "50%", code: "HDTECH50", percentage: 10 }
];

const LuckyWheelVoucher = ({ onVoucherSelected }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return; // Chặn quay thêm nếu đang quay
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * vouchers.length);
    const selected = vouchers[randomIndex];

    const segmentAngle = 360 / vouchers.length; // Góc mỗi phần
    const targetRotation = rotation + 360 * 5 + randomIndex * segmentAngle; // Quay thêm 5 vòng

    setRotation(targetRotation);

    // Cập nhật kết quả sau thời gian quay
    setTimeout(() => {
      setSelectedVoucher(selected);
      onVoucherSelected(selected); // Gọi callback với giá trị voucher được chọn
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="lucky-wheel">
      <div className="wheel-container">
        {/* Vòng quay */}
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          {vouchers.map((voucher, index) => (
            <div
              key={index}
              className={`wheel-segment ${
                selectedVoucher && voucher.label === selectedVoucher.label
                  ? "highlight"
                  : ""
              }`}
              style={{
                transform: `rotate(${index * (360 / vouchers.length)}deg)`
              }}
            >
              <span
                style={{
                  transform: `rotate(-${index * (360 / vouchers.length)}deg)`
                }}
              >
                {voucher.label}
              </span>
            </div>
          ))}
        </div>
        {/* Kim */}
        <div className="wheel-pointer"></div>
        <div
          className="wheel-center"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          Quay
        </div>
      </div>
      <button onClick={handleSpin} disabled={isSpinning}>
        {isSpinning ? "Đang quay..." : "Quay"}
      </button>
      {/* <input
        type="text"
        className="voucher-code"
        value={selectedVoucher ? selectedVoucher.code : ""}
        placeholder="Mã voucher của bạn"
        readOnly
      /> */}
    </div>
  );
};

export default LuckyWheelVoucher;
