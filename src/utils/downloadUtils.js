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
    // First try: Direct binary download
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return true;
    }

    // For modern browsers
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    // For iOS Safari
    if (window.safari) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Delay revoking the object URL
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return false;
  }
};

/**
 * Downloads the resume PDF with predefined settings
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadResume = async () => {
  try {
    // First try the direct download
    const success = await downloadPDF('/resume.pdf', 'Sakthimurugan_Resume.pdf');
    
    if (!success) {
      // If direct download fails, try opening in new tab
      const newWindow = window.open('/resume.pdf', '_blank');
      
      if (!newWindow) {
        throw new Error('Popup blocked');
      }
    }
    
    return true;
  } catch (error) {
    console.error('Failed to download resume:', error);
    alert('Unable to download resume. Please try opening it directly or contact me at sakthimurugan102003@gmail.com');
    return false;
  }
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