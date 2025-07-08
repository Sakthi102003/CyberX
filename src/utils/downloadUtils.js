/**
 * Utility functions for handling file downloads
 */

/**
 * Downloads a PDF file with proper error handling and fallback mechanisms
 * @param {string} url - The URL of the PDF file
 * @param {string} filename - The desired filename for the download
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadPDF = async (url, filename) => {
  try {
    // Method 1: Fetch with proper headers
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get the blob directly without content-type check to avoid CORS issues
    const blob = await response.blob();
    
    // Create download link with forced download attribute
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.target = '_blank'; // Open in new tab as fallback
    link.rel = 'noopener noreferrer';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    
    // Fallback: Try opening in new tab
    window.open(url, '_blank');
    return false;
  }
};

/**
 * Downloads the resume PDF with predefined settings
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadResume = async () => {
  const success = await downloadPDF('/resume.pdf', 'Sakthimurugan_Resume.pdf');
  
  if (!success) {
    alert('Resume download is currently unavailable. Please contact me directly at sakthimurugan102003@gmail.com');
  }
  
  return success;
};

/**
 * Validates if a PDF file is accessible
 * @param {string} url - The URL of the PDF file
 * @returns {Promise<boolean>} - Returns true if PDF is accessible
 */
export const validatePDFAccess = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.includes('application/pdf');
  } catch (error) {
    console.error('PDF validation failed:', error);
    return false;
  }
};