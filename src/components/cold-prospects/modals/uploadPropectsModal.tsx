"use client";

import React, { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { SelectInput, TextInput } from "@/components/roles/utils";
import {
  CheckIcon, ChevronRightIcon, ChevronLeftIcon,
  TableIcon, UploadIcon, XIcon,
} from "@/icons";

enum ImportStep {
  SELECT_METHOD = 0,
  UPLOAD_FILE = 1,
  MAP_FIELDS = 2,
}

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: any[]) => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({ isOpen, onClose, onImportComplete }) => {
  const [step, setStep] = useState<ImportStep>(ImportStep.SELECT_METHOD);
  const [file, setFile] = useState<File | null>(null);

  const [fileMeta, setFileMeta] = useState({
    title: "",
    accessibleBy: "Only me",
    description: "",
  });

  const [previewData, setPreviewData] = useState<any[][]>([]);
  const [headerMappings, setHeaderMappings] = useState<Record<number, string>>({});

  const systemFields = [
    { label: "Lead's name", value: "lead_name" },
    { label: "First name", value: "first_name" },
    { label: "Last name", value: "last_name" },
    { label: "Phone", value: "phone" },
    { label: "Email", value: "email" },
    { label: "Estimated closing date", value: "est_date" },
    { label: "Client folder name", value: "folder" },
    { label: "Tags", value: "tags" },
    { label: "Amount", value: "amount" },
    { label: "Probability", value: "prob" },
    { label: "Ignore Column", value: "ignore" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileMeta(prev => ({ ...prev, title: selectedFile.name.split('.')[0] }));

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }) as any[][];

      if (rows.length > 0) {
        // Find the index of the REAL header row (the one containing "Assigned To")
        // We look for the first row that has multiple columns filled out
        const headerRowIndex = rows.findIndex(row =>
          row.some(cell => cell?.toString().toLowerCase().includes("assigned")) ||
          row.filter(cell => cell !== "").length > 3
        );

        // If we found a real header row, start from there, otherwise start at 0
        const startIdx = headerRowIndex !== -1 ? headerRowIndex : 0;
        const validRows = rows.slice(startIdx).filter(row => row.some(cell => cell !== ""));

        setPreviewData(validRows);

        const init: Record<number, string> = {};
        validRows[0].forEach((_, i) => init[i] = "");
        setHeaderMappings(init);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const resetFlow = useCallback(() => {
    setStep(ImportStep.SELECT_METHOD);
    setFile(null);
    setPreviewData([]);
    onClose();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={resetFlow} className="max-w-7xl p-0 overflow-hidden rounded-3xl">
      {/* Top Banner Header */}
      <div className="relative p-8 bg-slate-900 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold tracking-tight uppercase italic">Import Prospects</h3>
            <p className="text-slate-400 text-sm mt-1">Map your file headers to the correct system fields.</p>
          </div>
          <button onClick={resetFlow} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-8">
          {["Method", "Configure", "Map Fields"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= i ? "bg-brand-500" : "bg-slate-800 text-slate-500"}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium ${step >= i ? "text-white" : "text-slate-500"}`}>{label}</span>
              {i < 2 && <div className="w-8 h-[1px] bg-slate-800" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-slate-950">
        {step === ImportStep.SELECT_METHOD && (
          <div className="grid grid-cols-2 gap-6 py-4 animate-in fade-in">
            <SelectionCard icon={<TableIcon className="w-8 h-8" />} title="New empty list" desc="Create an empty list and populate it manually." onClick={() => { }} />
            <SelectionCard icon={<UploadIcon className="w-8 h-8" />} title="Import from Excel" desc="Upload a Excel or CSV file in a few clicks." highlight onClick={() => setStep(ImportStep.UPLOAD_FILE)} />
          </div>
        )}

        {step === ImportStep.UPLOAD_FILE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-brand-500 transition-all cursor-pointer">
              <input type="file" className="hidden" id="fileImport" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
              <label htmlFor="fileImport" className="cursor-pointer">
                <UploadIcon className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="font-bold text-slate-700">{file ? file.name : "Upload your file (.csv, .xls, .xlsx)"}</p>
              </label>
            </div>
            <div className="space-y-4">
              <TextInput label="Title" value={fileMeta.title} onChange={(v) => setFileMeta({ ...fileMeta, title: v })} />
              <SelectInput label="Accessible by" value={fileMeta.accessibleBy} options={[{ label: "Only me", value: "Only me" }]} onChange={() => { }} />
              <textarea
                className="w-full p-3 rounded-xl border border-slate-200 bg-transparent text-sm min-h-[100px]"
                placeholder="Description"
                value={fileMeta.description}
                onChange={(e) => setFileMeta({ ...fileMeta, description: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === ImportStep.MAP_FIELDS && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="max-h-[550px] overflow-auto rounded-2xl border border-slate-100 shadow-xl scrollbar-hide">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-slate-900 sticky top-0 z-20">
                  <tr>
                    {/* The logic: We use Row 0 exclusively for the header labels */}
                    {previewData[0]?.map((columnHeader, index) => (
                      <th key={index} className="p-4 border-r border-slate-800 min-w-[240px]">
                        <div className="mb-2 text-[11px] text-brand-500 font-black uppercase tracking-widest truncate">
                          File Header: {columnHeader || "Untitled"}
                        </div>
                        <SelectInput
                          value={headerMappings[index]}
                          options={systemFields}
                          placeholder={`Assign "${columnHeader || 'Column ' + (index + 1)}"`}
                          onChange={(val) => setHeaderMappings(prev => ({ ...prev, [index]: val }))}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 bg-white">
                  {/* SLICE STARTING FROM 1: This hides the header row from the table body */}
                  {previewData.slice(1, 16).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-4 border-r border-slate-50 text-slate-600 font-medium whitespace-nowrap">
                          {cell?.toString() || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                * Previewing top 15 records (Skipping header row)
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <Button onClick={() => step > 0 && setStep(step - 1)} className={step === 0 ? "invisible" : ""}>
            <ChevronLeftIcon className="mr-2 w-4 h-4" /> Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={resetFlow} className="rounded-xl px-6">Cancel</Button>
            {step !== ImportStep.SELECT_METHOD && (
              <Button
                variant="primary"
                className="rounded-xl px-10 shadow-lg shadow-brand-500/20"
                onClick={() => {
                  if (step === ImportStep.UPLOAD_FILE) setStep(ImportStep.MAP_FIELDS);
                  else resetFlow();
                }}
                disabled={step === ImportStep.UPLOAD_FILE && !file}
              >
                {step === ImportStep.MAP_FIELDS ? "Continue" : "Next Step"}
                <ChevronRightIcon className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const SelectionCard = ({ icon, title, desc, onClick, highlight = false }: any) => (
  <button onClick={onClick} className={`group relative flex flex-col items-center text-center p-8 rounded-[2rem] border-2 transition-all ${highlight ? "border-brand-500 bg-white dark:bg-slate-900 shadow-xl scale-105 z-10" : "border-slate-100 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50"}`}>
    <div className={`mb-5 p-5 rounded-2xl ${highlight ? "bg-brand-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>{icon}</div>
    <h4 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed px-2">{desc}</p>
  </button>
);

export default BulkImportModal;