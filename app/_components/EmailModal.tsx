'use client';

import { useState } from 'react';

const ALLOWED_EMAILS = new Set([
  'info@sollviantech.com',
  'divyanshu@sollviantech.com',
  'ankit.roy@sollviantech.com',
  'abhishek.goswami@sollviantech.com',
]);

interface EmailModalProps {
  onClose: () => void;
}

export default function EmailModal({ onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ALLOWED_EMAILS.has(email.trim().toLowerCase())) {
      setError('');
      setShowDownload(true);
    } else {
      setError('This email is wrong');
      setShowDownload(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setUploadMessage(`Success! File available at: ${data.url}`);
      } else {
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setUploadMessage('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[6px]"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-2xl p-8 bg-[#071430] border border-cyan-400/40 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl leading-none"
        >
          ×
        </button>

        {/* Email icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-cyan-400/10 border border-cyan-400/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-white text-xl font-bold mb-1">
          Download Access
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter your authorized email to unlock the download.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setShowDownload(false);
              }}
              placeholder="name@sollviantech.com"
              className="w-full h-11 rounded-lg px-4 text-white text-sm outline-none bg-[#020e1c]/80 border border-[#00c8ff]/30 focus:border-cyan-400 transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-black text-sm bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(0,212,255,0.5)]"
          >
            Verify &amp; Unlock
          </button>

          {/* Download & Upload section on success */}
          {showDownload && (
            <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-cyan-400/20">
              <button
                type="button"
                onClick={() => { window.location.href = '/api/download'; }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-black text-sm bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(0,212,255,0.5)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v13m0 0l-4-4m4 4l4-4" />
                </svg>
                Download Now
              </button>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm bg-[#0a2342] border border-cyan-400/30 hover:bg-[#0d2f59] transition-all disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 16V3m0 0l-4 4m4-4l4 4" />
                  </svg>
                  {isUploading ? 'Uploading...' : 'Upload File (Keep original name)'}
                </button>
              </div>
              {uploadMessage && (
                <p className={`text-xs text-center break-all ${uploadMessage.startsWith('Error') || uploadMessage.startsWith('Upload failed') ? 'text-red-400' : 'text-green-400'}`}>
                  {uploadMessage}
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
