import React from "react";
import { CheckCircle2, Clock, Truck, Package } from "lucide-react";
import { Shipment } from "../lib/types";
import { motion } from "framer-motion";

interface ShipmentTimelineProps {
  shipment: Shipment;
}

/**
 * Renders a vertical transit timeline for a `Shipment`.
 * - Each timeline event is animated into view
 * - Shows a calculated progress bar at the bottom
 */
const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ shipment }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 px-2">
        Transit Timeline
      </h3>

      <div className="space-y-10 relative flex-1">
        {/* Visual connector down the left side */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100 z-0" />

        {(shipment.timeline || []).map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex gap-6 relative z-10 ${index < shipment.timeline.length - 1 ? "opacity-60" : ""}`}
          >
            <div
              className={`mt-1.5 rounded-full w-6 h-6 shrink-0 border-4 border-white shadow-sm flex items-center justify-center ${
                index === shipment.timeline.length - 1
                  ? "bg-fx-purple"
                  : "bg-slate-400"
              }`}
            ></div>

            <div className="flex-1">
              <p
                className={`font-black text-sm tracking-tight ${
                  index === shipment.timeline.length - 1
                    ? "text-slate-900"
                    : "text-slate-700"
                }`}
              >
                {event.status}
              </p>
              <p className="text-[10px] text-fx-orange font-mono font-bold mt-1">
                {event.time}
              </p>
            </div>
          </motion.div>
        ))}

        {/* If the shipment is not yet complete, show a scheduled arrival row */}
        {shipment.progress < 100 && (
          <div className="flex gap-6 opacity-30">
            <div className="mt-1.5 rounded-full w-6 h-6 shrink-0 border-2 border-slate-200 bg-white" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">
                Final Destination Arrival
              </p>
              <p className="text-[10px] text-slate-500 italic mt-1 uppercase tracking-tight">
                Scheduled Hub: {shipment.destination?.name || "Destination"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress summary and bar */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-3">
          <span className="text-slate-400">Voyage Completion</span>
          <span className="text-fx-orange">{shipment.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${shipment.progress}%` }}
            className="h-full bg-fx-purple rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ShipmentTimeline;
