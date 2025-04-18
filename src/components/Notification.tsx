import React, { useEffect, useState } from "react";
import { COLORS } from "../lib/constants";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  show: boolean;
  onClose: () => void;
}

export default function Notification({
  message,
  type,
  show,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Background color based on notification type
  const bgColor = {
    success: COLORS.SUCCESS,
    error: COLORS.ERROR,
    info: COLORS.PRIMARY,
  };

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    setIsVisible(show);

    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-5 right-5 p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-xs transition-all duration-300"
      style={{
        backgroundColor: bgColor[type],
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Icon based on type */}
      <div className="text-white">
        {type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )}
        {type === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        )}
        {type === "info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
      </div>

      {/* Message text */}
      <p className="text-white text-right">{message}</p>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-1 left-1 text-white/80 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
