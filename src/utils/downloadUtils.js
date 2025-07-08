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
    // Create a direct link to trigger native browser download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    // If download fails, try opening in new tab
    window.open(url, '_blank');
    return false;
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
    
    const success = await downloadPDF(resumeUrl, 'Sakthimurugan_Resume.pdf');
    
    if (!success) {
      throw new Error('Download failed');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to download resume:', error);
    alert('Unable to download resume. Please try again or contact me at sakthimurugan102003@gmail.com');
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