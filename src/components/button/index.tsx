import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`p-4 transisiton-colors text-lg font-medium focus:outline-none text-white ${
      canClick
        ? "bg-gray-600 hover:bg-gray-800"
        : "bg-gray-200 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
