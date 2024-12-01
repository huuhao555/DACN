import React, { useState } from "react";
import "./style.scss";

const vouchers = [
  { label: "2%", code: "HDTECH2", percentage: 5 },
  { label: "5%", code: "HDTECH5", percentage: 10 },
  { label: "7%", code: "HDTECH7", percentage: 10 },
  { label: "9%", code: "HDTECH9", percentage: 15 },
  { label: "10%", code: "HDTECH10", percentage: 10 },
  { label: "12%", code: "HDTECH12", percentage: 10 },
  { label: "14%", code: "HDTECH14", percentage: 10 },
  { label: "15%", code: "HDTECH15", percentage: 10 },
  { label: "18%", code: "HDTECH18", percentage: 10 },
  { label: "20%", code: "HDTECH20", percentage: 10 }
];

const LuckyWheelVoucher = ({ onVoucherSelected }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * vouchers.length);
    const selected = vouchers[randomIndex];

    const segmentAngle = 360 / vouchers.length;
    const targetRotation = rotation + 360 * 5 + randomIndex * segmentAngle;

    setRotation(targetRotation);

    setTimeout(() => {
      setSelectedVoucher(selected);
      onVoucherSelected(selected);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="lucky-wheel">
      <div className="wheel-container">
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
