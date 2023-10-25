import { useEffect, useRef } from "react";

/**
 * Call handler when click detected outside of ref
 * @param {Function} handler - Function to call
 * @param {Boolean} listenCapturing - Weather or not to listen during the caputing phase
 * @returns {Ref} Ref to element
 */
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
