import React, { useState, useEffect } from "react";

const SLOT_SCORES = [-50, -20, 10, 50, -10, 20, -30];
const ROWS = 7;
const DELAY_MS = 300;
const DAILY_LIMIT = 10;

export default function PlinkoGame() {
  const [path, setPath] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [lifetimeScore, setLifetimeScore] = useState(0);
  const [ballPosition, setBallPosition] = useState(null);
  const [playsToday, setPlaysToday] = useState(0);

  const ethEquivalent = (lifetimeScore * 0.0002).toFixed(4);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const dailyData = JSON.parse(localStorage.getItem("plinko_daily") || "{}");
    const savedScore = parseInt(localStorage.getItem("plinko_lifetime_score")) || 0;

    if (dailyData.date !== today) {
      localStorage.setItem("plinko_daily", JSON.stringify({ date: today, count: 0 }));
      setPlaysToday(0);
    } else {
      setPlaysToday(dailyData.count || 0);
    }

    setLifetimeScore(savedScore);
  }, []);

  useEffect(() => {
    if (!isDropping || currentRow > ROWS) return;

    const timeout = setTimeout(() => {
      setPath((prevPath) => {
        const last = prevPath[prevPath.length - 1];
        const direction = Math.random() < 0.5 ? -1 : 1;
        const next = Math.max(0, Math.min(SLOT_SCORES.length - 1, last + direction));
        setBallPosition({ row: currentRow, col: next });
        return [...prevPath, next];
      });
      setCurrentRow((r) => r + 1);
    }, DELAY_MS);

    if (currentRow === ROWS) {
      const final = path[path.length - 1];
      if (final !== undefined) {
        setTimeout(() => {
          const score = SLOT_SCORES[final];
          const updated = lifetimeScore + score;
          setLifetimeScore(updated);
          localStorage.setItem("plinko_lifetime_score", updated);
          setIsDropping(false);
        }, DELAY_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [isDropping, currentRow, path]);

  const startDrop = () => {
    if (isDropping || playsToday >= DAILY_LIMIT) return;

    const middle = Math.floor(SLOT_SCORES.length / 2);
    setPath([middle]);
    setBallPosition({ row: 0, col: middle });
    setCurrentRow(1);
    setIsDropping(true);

    const today = new Date().toISOString().split("T")[0];
    const newCount = playsToday + 1;
    localStorage.setItem("plinko_daily", JSON.stringify({ date: today, count: newCount }));
    setPlaysToday(newCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 text-white rounded-xl p-6 max-w-md w-full border border-white/20 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-4">🎯 Plinko Game</h1>

        <div className="text-center mb-4">
          <button
            onClick={startDrop}
            disabled={isDropping || playsToday >= DAILY_LIMIT}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              isDropping || playsToday >= DAILY_LIMIT
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
            }`}
          >
            {isDropping
              ? "Dropping..."
              : playsToday >= DAILY_LIMIT
              ? "Daily Limit Reached"
              : "Drop Ball"}
          </button>
        </div>

        <div className="text-center text-lg mb-2">
          Lifetime Score:{" "}
          <span
            className={`font-bold ${
              lifetimeScore < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {lifetimeScore} pts
          </span>
        </div>

        <div className="text-center text-sm text-yellow-300 mb-4">
          ≈ {ethEquivalent} ETH earned
        </div>

        {/* Peg Grid */}
        <div className="space-y-2 mt-6 mb-4">
          {[...Array(ROWS + 1)].map((_, row) => (
            <div key={row} className="flex justify-center gap-2">
              {SLOT_SCORES.map((_, col) => {
                const isBallHere =
                  ballPosition?.row === row && ballPosition?.col === col;
                return (
                  <div
                    key={col}
                    className={`w-6 h-6 rounded-full ${
                      isBallHere ? "bg-cyan-400 animate-bounce" : "bg-white/20"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 text-sm text-white/80">
          {SLOT_SCORES.map((score, idx) => (
            <div
              key={idx}
              className={`w-10 text-center font-bold ${
                score < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {score}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-center text-gray-400">
          {playsToday}/{DAILY_LIMIT} plays today
        </p>
        <button className=" mt-4 ml-20 px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400">Withdraw Ether</button>
      </div>
    </div>
  );
}
