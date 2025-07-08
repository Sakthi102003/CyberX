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
    // First, validate that the PDF is accessible
    const isValid = await validatePDFAccess(url);
    if (!isValid) {
      throw new Error('PDF file is not accessible or invalid');
    }

    // Fetch the PDF as a blob for better control
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    
    // Ensure the blob is treated as a PDF
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    
    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(pdfBlob);
    
    // Create a download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
    
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    
    // Fallback: try simple link-based download
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (fallbackError) {
      console.error('Fallback download also failed:', fallbackError);
      // Last resort: open in new tab
      window.open(url, '_blank');
      return false;
    }
  }
};

/**
 * Downloads the resume PDF with predefined settings
 * @returns {Promise<boolean>} - Returns true if download was successful
 */
export const downloadResume = async () => {
  try {
    // Get the base URL dynamically
    const baseUrl = window.location.origin;
    const resumeUrl = `${baseUrl}/resume.pdf`;
    
    // Validate PDF access first
    const isValid = await validatePDFAccess(resumeUrl);
    if (!isValid) {
      throw new Error('Resume PDF is not accessible');
    }
    
    const success = await downloadPDF(resumeUrl, 'Sakthimurugan_Resume.pdf');
    
    if (!success) {
      throw new Error('Download failed');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to download resume:', error);
    
    // More user-friendly error message
    let errorMessage = 'Unable to download resume. ';
    if (error.message.includes('not accessible')) {
      errorMessage += 'The resume file is currently unavailable. ';
    } else if (error.message.includes('network')) {
      errorMessage += 'Please check your internet connection. ';
    } else {
      errorMessage += 'An unexpected error occurred. ';
    }
    errorMessage += 'Please try again or contact me at sakthimurugan102003@gmail.com';
    
    alert(errorMessage);
    return false;
  }
};

/**
 * Validates if a PDF file is accessible and properly formatted
 * @param {string} url - The URL of the PDF file
 * @returns {Promise<boolean>} - Returns true if PDF is accessible and valid
 */
export const validatePDFAccess = async (url) => {
  try {
    // First, check with HEAD request for basic accessibility
    const headResponse = await fetch(url, { method: 'HEAD' });
    if (!headResponse.ok) {
      console.error('PDF HEAD request failed:', headResponse.status);
      return false;
    }
    
    const contentType = headResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/pdf')) {
      console.error('Invalid content type:', contentType);
      return false;
    }
    
    // Get a small portion of the file to validate PDF signature
    const response = await fetch(url, {
      headers: { 'Range': 'bytes=0-10' }
    });
    
    if (!response.ok) {
      // If range request fails, try regular request but limit the read
      const fullResponse = await fetch(url);
      if (!fullResponse.ok) {
        return false;
      }
      
      const blob = await fullResponse.blob();
      const arrayBuffer = await blob.slice(0, 10).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const signature = String.fromCharCode(...uint8Array.slice(0, 4));
      
      return signature === '%PDF';
    }
    
    // Handle range request response
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const signature = String.fromCharCode(...uint8Array.slice(0, 4));
    
    return signature === '%PDF';
  } catch (error) {
    console.error('PDF validation failed:', error);
    return false;
  }
};

/**
 * Opens a PDF file in a new tab for preview
 * @param {string} url - The URL of the PDF file
 * @returns {Promise<boolean>} - Returns true if PDF was opened successfully
 */
export const openPDFInNewTab = async (url) => {
  try {
    // Validate PDF access first
    const isValid = await validatePDFAccess(url);
    if (!isValid) {
      throw new Error('PDF file is not accessible');
    }
    
    // Open in new tab
    const newWindow = window.open(url, '_blank');
    
    // Check if popup was blocked
    if (!newWindow) {
      throw new Error('Popup blocked');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to open PDF in new tab:', error);
    return false;
  }
};

/**
 * Opens the resume PDF in a new tab for preview
 * @returns {Promise<boolean>} - Returns true if PDF was opened successfully
 */
export const previewResume = async () => {
  try {
    const baseUrl = window.location.origin;
    const resumeUrl = `${baseUrl}/resume.pdf`;
    
    const success = await openPDFInNewTab(resumeUrl);
    
    if (!success) {
      // Fallback to direct link
      window.open(resumeUrl, '_blank');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to preview resume:', error);
    alert('Unable to preview resume. Please try downloading it instead.');
    return false;
  }
};