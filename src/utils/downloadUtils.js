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
    // Multiple URL strategies for better deployment compatibility
    const urls = [
      `${window.location.origin}/resume.pdf`,
      `${window.location.origin}/build/resume.pdf`,
      `/resume.pdf`,
      `./resume.pdf`,
      `${process.env.PUBLIC_URL || ''}/resume.pdf`
    ].filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
    
    let success = false;
    let lastError = null;
    
    // Try each URL until one works
    for (const url of urls) {
      try {
        console.log(`Attempting to download from: ${url}`);
        
        // Check if PDF is accessible
        const isValid = await validatePDFAccess(url);
        if (isValid) {
          success = await downloadPDF(url, 'Sakthimurugan_Resume.pdf');
          if (success) {
            console.log(`Successfully downloaded from: ${url}`);
            break;
          }
        }
      } catch (error) {
        lastError = error;
        console.warn(`Failed to download from ${url}:`, error);
      }
    }
    
    // If all URLs fail, try simple methods with the primary URL
    if (!success) {
      console.warn('All URL attempts failed, trying simple methods...');
      const primaryUrl = `${window.location.origin}/resume.pdf`;
      
      // Try simple download
      success = simpleDownload(primaryUrl, 'Sakthimurugan_Resume.pdf');
      
      // If simple download fails, try navigation
      if (!success) {
        success = navigateToFile(primaryUrl);
      }
    }
    
    if (!success) {
      throw lastError || new Error('All download attempts failed');
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
    console.log(`Validating PDF access for: ${url}`);
    
    // First, check with HEAD request for basic accessibility
    const headResponse = await fetch(url, { 
      method: 'HEAD',
      cache: 'no-cache', // Force fresh request for validation
      headers: {
        'Accept': 'application/pdf,*/*',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!headResponse.ok) {
      console.error('PDF HEAD request failed:', headResponse.status, headResponse.statusText);
      
      // If HEAD fails, try a GET request (some servers don't support HEAD)
      try {
        const getResponse = await fetch(url, { 
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Accept': 'application/pdf,*/*',
            'Cache-Control': 'no-cache',
            'Range': 'bytes=0-1' // Request just 1 byte
          }
        });
        
        if (!getResponse.ok) {
          console.error('PDF GET request also failed:', getResponse.status, getResponse.statusText);
          return false;
        }
        
        console.log('PDF accessible via GET request');
        return true;
      } catch (getError) {
        console.error('Both HEAD and GET requests failed:', getError);
        return false;
      }
    }
    
    const contentType = headResponse.headers.get('content-type');
    const contentLength = headResponse.headers.get('content-length');
    
    console.log(`PDF Headers - Content-Type: ${contentType}, Content-Length: ${contentLength}`);
    
    if (!contentType || !contentType.includes('application/pdf')) {
      console.warn('Unexpected content type:', contentType, 'but proceeding for deployment compatibility...');
    }
    
    // If we get here, the file is accessible
    console.log('PDF validation successful');
    return true;
    
  } catch (error) {
    console.error('PDF validation failed:', error);
    
    // In deployment environments, network errors might be transient
    // Try one more time with a simpler request
    try {
      console.log('Attempting simple validation...');
      const simpleResponse = await fetch(url, { 
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (simpleResponse.ok) {
        console.log('Simple PDF validation successful');
        return true;
      }
    } catch (simpleError) {
      console.error('Simple validation also failed:', simpleError);
    }
    
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
    // Multiple URL strategies for better deployment compatibility
    const urls = [
      `${window.location.origin}/resume.pdf`,
      `${window.location.origin}/build/resume.pdf`,
      `/resume.pdf`,
      `./resume.pdf`,
      `${process.env.PUBLIC_URL || ''}/resume.pdf`
    ].filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
    
    let success = false;
    let lastError = null;
    
    // Try each URL until one works
    for (const url of urls) {
      try {
        console.log(`Attempting to preview from: ${url}`);
        success = await openPDFInNewTab(url);
        if (success) {
          console.log(`Successfully opened preview from: ${url}`);
          break;
        }
      } catch (error) {
        lastError = error;
        console.warn(`Failed to preview from ${url}:`, error);
      }
    }
    
    // Final fallback: just open the primary URL directly without validation
    if (!success) {
      console.log('All validation attempts failed, trying direct open...');
      try {
        const primaryUrl = `${window.location.origin}/resume.pdf`;
        const newWindow = window.open(primaryUrl, '_blank');
        if (newWindow) {
          success = true;
          console.log('Direct open successful');
        } else {
          console.warn('Direct open failed - popup blocked');
        }
      } catch (directError) {
        console.error('Direct open also failed:', directError);
      }
    }
    
    if (!success) {
      throw lastError || new Error('All preview attempts failed');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to preview resume:', error);
    
    // User-friendly error message
    let errorMessage = 'Unable to preview resume. ';
    if (error.message.includes('Popup blocked')) {
      errorMessage += 'Pop-ups are blocked in your browser. Please allow pop-ups for this site or try downloading the resume instead.';
    } else if (error.message.includes('not accessible')) {
      errorMessage += 'The resume file is currently unavailable. Please try downloading it instead.';
    } else {
      errorMessage += 'Please try downloading the resume instead.';
    }
    
    alert(errorMessage);
    return false;
  }
};

/**
 * Simple fallback download function that uses the most basic approach
 * This is often more reliable in deployment environments
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The desired filename
 */
export const simpleDownload = (url, filename) => {
  try {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Force download behavior
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Simple download failed:', error);
    return false;
  }
};

/**
 * Even simpler approach - just navigate to the file
 * @param {string} url - The URL of the file
 */
export const navigateToFile = (url) => {
  try {
    window.location.href = url;
    return true;
  } catch (error) {
    console.error('Navigation failed:', error);
    return false;
  }
};