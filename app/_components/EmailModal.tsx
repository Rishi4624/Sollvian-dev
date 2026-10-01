'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
    } catch {
      setUploadMessage('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#203a30]/45 px-4 backdrop-blur-[4px]"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md border border-[#203a30]/10 bg-[#fffefa] p-7 shadow-[0_24px_80px_-35px_rgba(31,58,48,0.65)] sm:p-9"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#203a30]/10 text-xl leading-none text-[#657066] transition-colors hover:bg-[#eef0e9] hover:text-[#203a30]"
          aria-label="Close dialog"
        >
          ×
        </button>

        {/* Email icon */}
        <div className="flex justify-center mb-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8b6744]/20 bg-[#8b6744]/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#8b6744]"
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

        <h2 className="mb-1 text-center font-serif text-[28px] text-[#203a30]">
          Download Access
        </h2>
        <p className="mb-6 text-center text-[13px] leading-relaxed text-[#727c72]">
          Enter your authorized email to unlock the download.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#687269]">
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
              className="h-11 w-full rounded-lg border border-[#203a30]/15 bg-white px-4 text-sm text-[#203a30] outline-none transition-colors placeholder:text-[#9aa198] focus:border-[#71866b]"
              required
              autoFocus
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-[#a14f42]">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#244337] py-3 text-sm font-bold text-white transition-colors hover:bg-[#315844]"
          >
            Verify &amp; Unlock
          </button>

          {/* Download & Upload section on success */}
          {showDownload && (
            <div className="mt-2 flex flex-col gap-4 border-t border-[#203a30]/10 pt-4">
              <button
                type="button"
                onClick={() => router.push('/api/download')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#244337] py-3 text-sm font-bold text-white transition-colors hover:bg-[#315844]"
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
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#203a30]/15 bg-[#eef0e9] py-3 text-sm font-bold text-[#344c3e] transition-colors hover:bg-[#e4e8df] disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 16V3m0 0l-4 4m4-4l4 4" />
                  </svg>
                  {isUploading ? 'Uploading...' : 'Upload File (Keep original name)'}
                </button>
              </div>
              {uploadMessage && (
                <p className={`break-all text-center text-xs ${uploadMessage.startsWith('Error') || uploadMessage.startsWith('Upload failed') ? 'text-[#a14f42]' : 'text-[#52704e]'}`}>
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
