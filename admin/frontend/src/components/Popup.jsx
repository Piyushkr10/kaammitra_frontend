import React from "react";

/**
 * A simple, temporary popup message component.
 * It is positioned at the top right of the screen and fades in.
 * @param {object} props - Component props.
 * @param {string} props.message - The message to be displayed in the popup.
 */
export default function Popup({ message }) {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down">
      {message}
    </div>
  );
}