import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { IndianLanguage, Transaction } from '../types';
import { getTranslations } from '../utils/translations';

interface TransactionHistoryProps {
  transactions: Transaction[];
  statementFileName: string;
  language?: IndianLanguage;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  statementFileName,
  language = 'en',
}) => {
  const t = getTranslations(language);
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter((t) => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchQuery && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {t.transactionsTitle}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              Document AI Extracted
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Source: {statementFileName}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchTxnPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              {t.allFilter}
            </button>
            <button
              onClick={() => setFilterType('credit')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'credit' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              {t.payoutsFilter}
            </button>
            <button
              onClick={() => setFilterType('debit')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'debit' ? 'bg-white text-rose-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              {t.debitsFilter}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
        {filtered.map((tx) => (
          <div key={tx.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span
                className={`p-2 rounded-xl shrink-0 ${
                  tx.type === 'credit'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {tx.type === 'credit' ? (
                  <ArrowDownLeft className="w-4 h-4" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </span>
              <div>
                <span className="font-bold text-slate-900 block">{tx.description}</span>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{tx.date}</span>
                  <span>&bull;</span>
                  <span className="font-mono">{tx.channel}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`font-mono font-bold block ${
                  tx.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'
                }`}
              >
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Bal: ₹{tx.balanceAfter.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
