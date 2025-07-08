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
    // Method 1: Fetch and create blob (most reliable for binary files)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Verify content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/pdf')) {
      console.warn('Unexpected content type:', contentType);
    }
    
    // Get the blob and ensure it's treated as PDF
    const blob = await response.blob();
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    
    // Create download link
    const blobUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
    return true;
    
  } catch (error) {
    console.error('Blob download failed:', error);
    
    // Method 2: Direct link fallback
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
      
    } catch (fallbackError) {
      console.error('Direct download fallback failed:', fallbackError);
      
      // Method 3: Open in new tab as last resort
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
        return true;
      } catch (finalError) {
        console.error('All download methods failed:', finalError);
        return false;
      }
    }
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