import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Calendar,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ForecastPoint, IndianLanguage } from '../types';
import { getTranslations } from '../utils/translations';

interface ForecastChartsProps {
  points: ForecastPoint[];
  timeframe: 30 | 60 | 90;
  onTimeframeChange: (days: 30 | 60 | 90) => void;
  hasSimulatedChanges?: boolean;
  language?: IndianLanguage;
}

export const ForecastCharts: React.FC<ForecastChartsProps> = ({
  points,
  timeframe,
  onTimeframeChange,
  hasSimulatedChanges = false,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute min and max balance for dynamic SVG chart scaling
  const allValues = points.flatMap((p) => [
    p.p10BearScenario,
    p.p50MedianExpected,
    p.p90BullScenario,
    p.simulatedTwinBalance,
  ]);
  const minVal = Math.min(...allValues, 0);
  const maxVal = Math.max(...allValues, 20000);
  const range = maxVal - minVal || 1;

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const getX = (index: number) => {
    return paddingX + (index / (points.length - 1 || 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const normalized = (val - minVal) / range;
    return svgHeight - paddingY - normalized * chartHeight;
  };

  // Build SVG path strings
  const p50Path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.p50MedianExpected)}`)
    .join(' ');

  const simulatedPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.simulatedTwinBalance)}`)
    .join(' ');

  // Area between P10 and P90 confidence envelope
  const envelopeTop = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.p90BullScenario)}`).join(' ');
  const envelopeBottom = points
    .slice()
    .reverse()
    .map((p, i) => `L ${getX(points.length - 1 - i)} ${getY(p.p10BearScenario)}`)
    .join(' ');
  const envelopePath = `${envelopeTop} ${envelopeBottom} Z`;

  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  const crunchPointsCount = points.filter((p) => p.isCrunchAlert).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header with Timeframe Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Calendar className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {t.forecastTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.forecastSubtitle}
          </p>
        </div>

        {/* 30 / 60 / 90 Days Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => onTimeframeChange(30)}
            className={`px-3 py-1 rounded-lg transition-all ${
              timeframe === 30 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            30 {t.days}
          </button>
          <button
            onClick={() => onTimeframeChange(60)}
            className={`px-3 py-1 rounded-lg transition-all ${
              timeframe === 60 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            60 {t.days}
          </button>
          <button
            onClick={() => onTimeframeChange(90)}
            className={`px-3 py-1 rounded-lg transition-all ${
              timeframe === 90 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            90 {t.days}
          </button>
        </div>
      </div>

      {/* Legend & Crunch Alert summary */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">P50 Expected Median</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-300" />
            <span className="text-slate-600">P10 - P90 Volatility Envelope</span>
          </div>
          {hasSimulatedChanges && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600" />
              <span className="font-bold text-indigo-700">Simulated Income Twin</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-slate-500">Scheduled EMI Debits</span>
          </div>
        </div>

        {crunchPointsCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{crunchPointsCount} days projected below ₹1,500 safety float</span>
          </div>
        )}
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-hidden bg-slate-50/70 rounded-xl p-2 border border-slate-100">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-56 sm:h-64 cursor-crosshair select-none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Horizontal Grid lines */}
          <line
            x1={paddingX}
            y1={getY(maxVal * 0.75)}
            x2={svgWidth - paddingX}
            y2={getY(maxVal * 0.75)}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={getY(maxVal * 0.5)}
            x2={svgWidth - paddingX}
            y2={getY(maxVal * 0.5)}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={getY(0)}
            x2={svgWidth - paddingX}
            y2={getY(0)}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Zero balance indicator label */}
          <text
            x={paddingX - 6}
            y={getY(0) + 4}
            textAnchor="end"
            className="text-[10px] font-mono fill-slate-400"
          >
            ₹0
          </text>
          <text
            x={paddingX - 6}
            y={getY(maxVal * 0.5) + 4}
            textAnchor="end"
            className="text-[10px] font-mono fill-slate-400"
          >
            ₹{Math.round(maxVal * 0.5).toLocaleString('en-IN')}
          </text>

          {/* P10 to P90 Confidence Interval Area */}
          <path d={envelopePath} fill="#10b981" fillOpacity="0.12" />

          {/* Scheduled EMI debit dot markers */}
          {points.map((p, i) => {
            if (p.scheduledEmiOutflow <= 0) return null;
            return (
              <g key={`emi-${i}`}>
                <circle
                  cx={getX(i)}
                  cy={getY(p.p50MedianExpected)}
                  r="3.5"
                  className="fill-rose-500 stroke-white stroke-2"
                />
              </g>
            );
          })}

          {/* P50 Expected Median Baseline Line */}
          <path
            d={p50Path}
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Simulated Income Twin Line */}
          {hasSimulatedChanges && (
            <path
              d={simulatedPath}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
              strokeDasharray="5 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Hover tracker cursor line */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={paddingY}
                x2={getX(hoveredIndex)}
                y2={svgHeight - paddingY}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(points[hoveredIndex].p50MedianExpected)}
                r="5"
                className="fill-emerald-600 stroke-white stroke-2 shadow-md"
              />
              {hasSimulatedChanges && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(points[hoveredIndex].simulatedTwinBalance)}
                  r="5"
                  className="fill-indigo-600 stroke-white stroke-2 shadow-md"
                />
              )}
            </g>
          )}

          {/* Interactive hover overlays */}
          {points.map((_, i) => (
            <rect
              key={`overlay-${i}`}
              x={getX(i) - (chartWidth / points.length) / 2}
              y={0}
              width={chartWidth / points.length}
              height={svgHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(i)}
            />
          ))}
        </svg>

        {/* Floating Tooltip Box */}
        {hoveredPoint && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200 text-xs font-mono space-y-1 max-w-[210px]">
            <div className="text-[11px] font-bold text-slate-800 border-b border-slate-100 pb-1">
              📅 {hoveredPoint.dateLabel} (Day {hoveredPoint.day})
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>P50 Expected:</span>
              <span>₹{hoveredPoint.p50MedianExpected.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>P10 (Slump):</span>
              <span>₹{hoveredPoint.p10BearScenario.toLocaleString('en-IN')}</span>
            </div>
            {hasSimulatedChanges && (
              <div className="flex justify-between text-indigo-700 font-bold pt-0.5 border-t border-slate-100">
                <span>Simulated Twin:</span>
                <span>₹{hoveredPoint.simulatedTwinBalance.toLocaleString('en-IN')}</span>
              </div>
            )}
            {hoveredPoint.scheduledEmiOutflow > 0 && (
              <div className="flex justify-between text-rose-600 text-[10px] font-medium pt-0.5">
                <span>EMI Auto-Debit:</span>
                <span>-₹{hoveredPoint.scheduledEmiOutflow.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actionable Guidance Note */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-xs text-slate-600">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          <strong>Seasonality Insight:</strong> Projections account for platform weekly payout cycles (e.g. Swiggy/Zomato on Tuesdays &amp; Fridays). Maintain a rolling float of at least ₹3,000 before the 10th of every month to avoid NACH clearing delays.
        </span>
      </div>
    </div>
  );
};
