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

    // Try the blob-based download first (more reliable)
    try {
      const response = await fetch(url, { cache: 'no-cache' });
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
    } catch (blobError) {
      console.warn('Blob download failed, trying fallback:', blobError);
    }
    
    // Fallback 1: try simple link-based download
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
      console.warn('Simple download also failed, opening in new tab:', fallbackError);
    }
    
    // Fallback 2: open in new tab with download hint
    try {
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        // Try to set download attribute via JavaScript
        setTimeout(() => {
          try {
            newWindow.document.title = filename;
          } catch (e) {
            // Cross-origin, ignore
          }
        }, 100);
        return true;
      }
    } catch (newTabError) {
      console.warn('New tab fallback failed:', newTabError);
    }
    
    throw new Error('All download methods failed');
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
    // Get the base URL dynamically, but use absolute path for deployment
    const resumeUrl = `${window.location.origin}/resume.pdf`;
    
    // For development, also try with process.env.PUBLIC_URL
    const altResumeUrl = `${process.env.PUBLIC_URL || ''}/resume.pdf`;
    
    // Try primary URL first
    let success = false;
    try {
      const isValid = await validatePDFAccess(resumeUrl);
      if (isValid) {
        success = await downloadPDF(resumeUrl, 'Sakthimurugan_Resume.pdf');
      }
    } catch (error) {
      console.warn('Primary URL failed, trying alternative:', error);
    }
    
    // If primary fails, try alternative URL
    if (!success && altResumeUrl !== '/resume.pdf') {
      try {
        const isValid = await validatePDFAccess(altResumeUrl);
        if (isValid) {
          success = await downloadPDF(altResumeUrl, 'Sakthimurugan_Resume.pdf');
        }
      } catch (error) {
        console.warn('Alternative URL also failed:', error);
      }
    }
    
    if (!success) {
      throw new Error('All download attempts failed');
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
    const headResponse = await fetch(url, { 
      method: 'HEAD',
      cache: 'no-cache' // Force fresh request for validation
    });
    
    if (!headResponse.ok) {
      console.error('PDF HEAD request failed:', headResponse.status, headResponse.statusText);
      return false;
    }
    
    const contentType = headResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/pdf')) {
      console.warn('Unexpected content type:', contentType, 'but proceeding...');
      // Don't fail immediately for content type in deployment
    }
    
    // Try to get a small portion of the file to validate PDF signature
    try {
      const response = await fetch(url, {
        headers: { 'Range': 'bytes=0-10' },
        cache: 'no-cache'
      });
      
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const signature = String.fromCharCode(...uint8Array.slice(0, 4));
        
        if (signature === '%PDF') {
          return true;
        }
      }
    } catch (rangeError) {
      console.warn('Range request failed, trying full request:', rangeError);
    }
    
    // If range request fails, try regular request but limit the read
    try {
      const fullResponse = await fetch(url, { cache: 'no-cache' });
      if (!fullResponse.ok) {
        return false;
      }
      
      const blob = await fullResponse.blob();
      const arrayBuffer = await blob.slice(0, 10).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const signature = String.fromCharCode(...uint8Array.slice(0, 4));
      
      return signature === '%PDF';
    } catch (fullError) {
      console.warn('Full request validation failed:', fullError);
      // In deployment, if we can't validate the signature, assume it's valid
      // since the HEAD request succeeded
      return true;
    }
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
    // Get the base URL dynamically, but use absolute path for deployment
    const resumeUrl = `${window.location.origin}/resume.pdf`;
    
    // For development, also try with process.env.PUBLIC_URL
    const altResumeUrl = `${process.env.PUBLIC_URL || ''}/resume.pdf`;
    
    // Try primary URL first
    let success = false;
    try {
      success = await openPDFInNewTab(resumeUrl);
    } catch (error) {
      console.warn('Primary URL failed for preview, trying alternative:', error);
    }
    
    // If primary fails, try alternative URL
    if (!success && altResumeUrl !== '/resume.pdf') {
      try {
        success = await openPDFInNewTab(altResumeUrl);
      } catch (error) {
        console.warn('Alternative URL also failed for preview:', error);
      }
    }
    
    // Final fallback: just open the URL directly
    if (!success) {
      window.open(resumeUrl, '_blank');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to preview resume:', error);
    alert('Unable to preview resume. Please try downloading it instead.');
    return false;
  }
};