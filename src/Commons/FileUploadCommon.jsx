import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudUpload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import Papa from "papaparse";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [headers, setHeaders] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState("");
  const fileInputRef = useRef(null);
  const progressContainerRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const validateFile = (selectedFile) => {
    setError("");
    Papa.parse(selectedFile, {
      header: true,
      complete: (result) => {
        const fileHeaders = Object.keys(result.data[0] || {});
        
        if (fileHeaders.length === 0) {
          setError("The file appears to be empty or cannot be parsed.");
          setFile(null);
          return;
        }

        setHeaders(fileHeaders);
        setFile(selectedFile);
        startUpload();
      },
      error: () => {
        setError("Error reading the file. Please upload a valid CSV file.");
      },
    });
  };

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
    progressContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  useEffect(() => {
    if (progress > 0 && progress < 100 && !error) {
      progressContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [progress]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const resetFile = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    setError("");
    setHeaders([]);
    setSelectedHeader("");
  };

  return (
    <div className="w-full">
      <Label>Select a File</Label>
      <div
        className="border bg-muted h-[20rem] rounded-lg p-8 text-center flex flex-col justify-center items-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBrowseClick}

      >
        <CloudUpload className="mb-4" />
        <div className="mb-4">
          <p className="text-gray-500">Drag and Drop a file</p>
        </div>
        <div className="inline-block text-sm underline">
          <span
            className="text-primary ml-auto inline-block text-sm underline font-bold cursor-pointer"
          >
            Browse
          </span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

     

      <div className="flex mt-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold">Supported File Type:</span> .csv, .xls,
          .xlsx
        </p>
      </div>

      <div ref={progressContainerRef}>
        {file && !error && (
          <div className="mt-4 border p-4 rounded-lg bg-gray-50 flex items-center justify-between">
            <div className="flex items-center">
              <CloudUpload className="mr-2 text-gray-500" />
              <div>
                <p className="font-bold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                </p>
              </div>
            </div>
            {progress === 100 ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <X className="cursor-pointer" onClick={resetFile} />
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 border p-4 rounded-lg bg-red-100 text-red-600 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {progress > 0 && progress < 100 && !error && (
          <div className="mt-2">
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        )}
         {headers.length > 0 && (
        <div className="mt-4">
          <Label>Select to map</Label>
          <Select 
            value={selectedHeader} 
            onValueChange={setSelectedHeader}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a header" />
            </SelectTrigger>
            <SelectContent>
              {headers.map((header) => (
                <SelectItem key={header} value={header}>
                  {header}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      </div>
    </div>
  );
};

export default FileUpload;