
import React, { useState, useCallback, useRef } from 'react';
import { colorizeImage } from '../services/geminiService';
import { UploadIcon, DownloadIcon, SpinnerIcon, ImageIcon } from './icons';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // remove 'data:*/*;base64,' prefix
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};


const ToolPage: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [colorizedImageUrl, setColorizedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setOriginalFile(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setColorizedImageUrl(null);
      setError(null);
    } else if (file) {
      setError('Please select a valid image file.');
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if(isEntering) {
        setIsDragging(true);
    } else {
        setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleColorize = useCallback(async () => {
    if (!originalFile) return;

    setIsLoading(true);
    setError(null);
    setColorizedImageUrl(null);

    try {
      const base64Image = await fileToBase64(originalFile);
      const colorizedBase64 = await colorizeImage(base64Image, originalFile.type);
      setColorizedImageUrl(`data:image/png;base64,${colorizedBase64}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalFile]);

  const resetState = () => {
    setOriginalFile(null);
    setOriginalImageUrl(null);
    setColorizedImageUrl(null);
    setIsLoading(false);
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center animate-fade-in">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Bring Your Memories to Life</h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">Upload a black and white photo and let our AI add vibrant, realistic color.</p>
        </div>

        {!originalImageUrl && (
            <div 
                onDragEnter={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                isDragging ? 'border-brand-primary bg-brand-light dark:bg-brand-dark/20' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 hover:border-brand-secondary dark:hover:border-brand-secondary'
                }`}
            >
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                accept="image/*"
                className="hidden"
            />
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <UploadIcon className={`w-12 h-12 transition-colors ${isDragging ? 'text-brand-primary' : 'text-slate-400 dark:text-slate-500'}`} />
                <p className="text-slate-600 dark:text-slate-300 font-semibold">
                <span className="text-brand-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">PNG, JPG, WEBP up to 10MB</p>
            </div>
            </div>
        )}

        {error && <div className="mt-4 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-md animate-fade-in">{error}</div>}

        {originalImageUrl && (
            <div className="w-full mt-8 flex flex-col items-center animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Original</h3>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg">
                    <img src={originalImageUrl} alt="Original black and white" className="rounded-md w-full h-auto object-contain max-h-[60vh]" />
                </div>
                </div>
                <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Colorized</h3>
                    <div className="rounded-lg shadow-lg w-full h-auto aspect-square bg-white dark:bg-slate-800 flex items-center justify-center min-h-[300px] md:min-h-full p-2">
                        {isLoading && (
                            <div className="flex flex-col items-center space-y-4 text-slate-500 dark:text-slate-400">
                                <SpinnerIcon className="w-12 h-12 animate-spin-slow text-brand-primary" />
                                <p>Colorizing your photo...</p>
                                <p className="text-sm">This can take a moment.</p>
                            </div>
                        )}
                        {colorizedImageUrl && !isLoading && (
                            <img src={colorizedImageUrl} alt="Colorized" className="rounded-md w-full h-auto object-contain max-h-[60vh] animate-fade-in" />
                        )}
                        {!isLoading && !colorizedImageUrl && 
                          <div className="flex flex-col items-center text-slate-400 dark:text-slate-500 space-y-2">
                            <ImageIcon className="w-24 h-24" />
                            <p>Your result will appear here</p>
                          </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleColorize}
                    disabled={isLoading}
                    className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Colorize Now'
                    )}
                </button>

                {colorizedImageUrl && !isLoading && (
                <a
                    href={colorizedImageUrl}
                    download="ColorizePro-result.png"
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download Image
                </a>
                )}
                <button
                    onClick={resetState}
                    className="px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 transition-colors duration-300"
                >
                    Start Over
                </button>
            </div>
            </div>
        )}
    </div>
  );
};

export default ToolPage;