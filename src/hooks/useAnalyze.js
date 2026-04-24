import { useState } from 'react';

/**
 * Custom hook to handle CSV file upload and data analysis.
 * 
 * @returns {Object} An object containing state and the upload function.
 * @returns {string} return.status - 'idle' | 'uploading' | 'success' | 'error'
 * @returns {Object|null} return.data - The parsed response from the backend.
 * @returns {string|null} return.error - The error message, if any.
 * @returns {Function} return.analyzeFile - Function to trigger the file upload.
 */
export function useAnalyze() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Uploads a file to the backend for analysis.
   * 
   * @param {File} file - The CSV file to analyze.
   */
  const analyzeFile = async (file) => {
    setStatus('uploading');
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = 'An error occurred during analysis.';
        try {
          const errorData = await response.json();
          if (errorData.detail) errorMsg = errorData.detail;
        } catch (e) {
          // ignore if response isn't JSON
        }
        throw new Error(errorMsg);
      }

      const responseData = await response.json();
      setData(responseData);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Failed to connect to the server.');
      setStatus('error');
    }
  };

  return { status, data, error, analyzeFile };
}
