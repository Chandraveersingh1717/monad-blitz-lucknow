import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const BidModal = ({ isOpen, onClose, minBid = 5.89, serviceFee = 0.89, availableQty = 7 }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const bid = parseFloat(bidAmount) || 0;
    const qty = parseInt(quantity) || 1;
    const totalCalc = (bid + serviceFee) * qty;
    setTotal(totalCalc.toFixed(2));
  }, [bidAmount, quantity, serviceFee]);

  const handleBid = () => {
    const bid = parseFloat(bidAmount);
    const qty = parseInt(quantity);

    if (!bid || bid < minBid) {
      toast.error(`Bid must be at least ${minBid} ETH`);
      return;
    }
    if (!qty || qty < 1 || qty > availableQty) {
      toast.error(`Quantity must be between 1 and ${availableQty}`);
      return;
    }

    toast.success(`Placed bid of ${total} ETH for ${qty} item(s)`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#1e1e2f] text-white rounded-xl w-full max-w-md p-6 relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-white text-lg">✕</button>

        <h2 className="text-xl font-semibold text-center mb-3">Place a Bid</h2>
        <p className="text-center text-sm text-gray-400 mb-4">
          You must bid at least <strong>{minBid} ETH</strong>
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Bid Amount</label>
          <div className="flex items-center bg-[#2a2a3b] px-3 rounded">
            <input
              type="number"
              min={minBid}
              step="0.01"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="bg-transparent w-full py-2 focus:outline-none text-white"
              placeholder="00.00 ETH"
            />
            <span className="text-sm text-gray-400">ETH</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">
            Enter Quantity, {availableQty} available
          </label>
          <input
            type="number"
            min={1}
            max={availableQty}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full py-2 px-3 rounded bg-[#2a2a3b] focus:outline-none text-white"
            placeholder="Enter quantity"
          />
        </div>

        <div className="text-sm text-gray-400 space-y-1 mb-5">
          <div className="flex justify-between">
            <span>You must bid at least</span>
            <span>{minBid} ETH</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>{serviceFee} ETH</span>
          </div>
          <div className="flex justify-between font-semibold text-white">
            <span>Total Bid Amount</span>
            <span>{total} ETH</span>
          </div>
        </div>

        <button
          onClick={handleBid}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md transition text-white font-medium"
        >
          Place a Bid
        </button>
      </motion.div>
    </div>
  );
};

export default BidModal;
