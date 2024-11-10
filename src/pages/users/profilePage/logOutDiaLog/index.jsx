import React from 'react'
import "./style.scss";

const LogOutDiaLog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="logout-overlay">
            <div className="logout-dialog">
                <div className="logout-icon">
                    <span className="question-mark">?</span>
                </div>
                <h3>Bạn muốn thoát tài khoản</h3>
                <div className="logout-actions">
                    <button className="btn-cancel" onClick={onClose}>
                        Không
                    </button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogOutDiaLog
