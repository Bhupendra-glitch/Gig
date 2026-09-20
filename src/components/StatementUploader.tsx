import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Lock,
  CheckCircle2,
  X,
  Sparkles,
  Eye,
  Database,
} from 'lucide-react';
import { GigPersona } from '../types';

interface StatementUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  activePersona: GigPersona;
  onStatementProcessed: (fileName: string) => void;
}

export const StatementUploader: React.FC<StatementUploaderProps> = ({
  isOpen,
  onClose,
  activePersona,
  onStatementProcessed,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'ocr' | 'dlp' | 'done'>('idle');
  const [selectedFile, setSelectedFile] = useState<string>(activePersona.statementFileName);

  if (!isOpen) return null;

  const handleSimulateExtraction = async () => {
    setIsProcessing(true);
    setStage('uploading');

    setTimeout(() => {
      setStage('ocr');
    }, 700);

    setTimeout(() => {
      setStage('dlp');
    }, 1500);

    setTimeout(() => {
      setStage('done');
      setIsProcessing(false);
      onStatementProcessed(selectedFile);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <UploadCloud className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Document AI &amp; Cloud DLP Ingestion
                </h3>
                <p className="text-xs text-slate-500">
                  Upload bank statement, passbook photo, or UPI transaction export
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 space-y-4">
          {/* Preloaded file selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Sample Statement or Drop Custom File:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFile('HDFC_Bank_UPI_Statement_RaviKumar_90D.pdf')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedFile.includes('RaviKumar')
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-bold block">Ravi (Swiggy)</span>
                <span className="text-[10px] text-slate-500">HDFC UPI Statement (90D)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFile('ICICI_Current_Account_PoojaIyer_Q2.pdf')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedFile.includes('PoojaIyer')
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-bold block">Pooja (Freelance)</span>
                <span className="text-[10px] text-slate-500">ICICI Current Q2 (PDF)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFile('SBI_Merchant_VPA_Statement_ArunStore.csv')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedFile.includes('ArunStore')
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span className="font-bold block">Arun (Kirana)</span>
                <span className="text-[10px] text-slate-500">SBI Merchant QR (CSV)</span>
              </button>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500/80 rounded-xl p-6 text-center bg-slate-50/70 transition-all cursor-pointer">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs text-emerald-600 mb-2">
              <FileCheck className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-slate-800">
              Active File: <span className="text-emerald-700 font-mono">{selectedFile}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports e-Statements (PDF, password-free), CamScanner images, or CSV exports
            </p>
          </div>

          {/* Google Cloud DLP & Privacy Protection Callout */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Google Cloud DLP &amp; KMS De-Identification
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                AES-256 HSM Tokenized
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-slate-400">
                Aadhaar: <span className="text-amber-400 font-bold">XXXX-XXXX-8921</span>
              </div>
              <div className="text-slate-400">
                PAN: <span className="text-amber-400 font-bold">XXXXXX481K</span>
              </div>
              <div className="text-slate-400">
                Account No: <span className="text-emerald-400 font-bold">XXXXXXXX7839</span>
              </div>
              <div className="text-slate-400">
                Phone: <span className="text-emerald-400 font-bold">+91 XXXXX 49210</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              PII is automatically masked client-side and through Google Cloud DLP before reaching financial scoring models. No raw identities are stored.
            </p>
          </div>

          {/* Pipeline Progress Stages */}
          {stage !== 'idle' && (
            <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  {stage === 'uploading' && 'Ingesting document to Cloud Storage (asia-south1)...'}
                  {stage === 'ocr' && 'Google Document AI v2.1: OCR & Table Parsing (98.4% conf)...'}
                  {stage === 'dlp' && 'Google Cloud DLP: Redacting PAN, Aadhaar & Account numbers...'}
                  {stage === 'done' && 'Structured Cashflow Entities Extracted & Ready!'}
                </span>
                <span className="text-[11px] font-mono text-emerald-700">
                  {stage === 'uploading' && '25%'}
                  {stage === 'ocr' && '65%'}
                  {stage === 'dlp' && '90%'}
                  {stage === 'done' && '100%'}
                </span>
              </div>
              <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width:
                      stage === 'uploading'
                        ? '25%'
                        : stage === 'ocr'
                        ? '65%'
                        : stage === 'dlp'
                        ? '90%'
                        : '100%',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulateExtraction}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            {isProcessing ? (
              <>Processing Document AI...</>
            ) : (
              <>
                <Database className="w-3.5 h-3.5" />
                Parse &amp; Extract Structured Cashflow
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
