import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tick, toggleTimer } from "../store/focusSlice";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";

const FocusTimer = () => {
  const { timeLeft, isActive, energy } = useSelector(
    (state: any) => state.focus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => dispatch(tick()), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, dispatch]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-4xl shadow-xl">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Anneau de progression */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="753.9"
            initial={{ strokeDashoffset: 753.9 }}
            animate={{
              strokeDashoffset:
                753.9 *
                (1 -
                  timeLeft /
                    (energy === "low"
                      ? 900
                      : energy === "medium"
                      ? 1500
                      : 2700)),
            }}
            className={
              energy === "low"
                ? "text-red-400"
                : energy === "medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          />
        </svg>
        <div className="absolute text-5xl font-bold text-gray-800">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(toggleTimer())}
        className="mt-8 px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center gap-3 font-semibold"
      >
        {isActive ? <FaPause /> : <FaPlay />} {isActive ? "Pause" : "Commencer"}
      </motion.button>
    </div>
  );
};

export default FocusTimer;
