// Emergency PDF handler - Use this if the main utilities fail
window.emergencyPDFHandler = {
    // Simple download without any validation
    forceDownload: function(filename = 'resume.pdf') {
        const urls = [
            window.location.origin + '/resume.pdf',
            '/resume.pdf',
            './resume.pdf'
        ];
        
        for (const url of urls) {
            try {
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.style.display = 'none';
                
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                console.log('Emergency download initiated from:', url);
                return true;
            } catch (error) {
                console.warn('Emergency download failed for:', url, error);
            }
        }
        
        // Ultimate fallback - navigate to the PDF
        try {
            window.location.href = window.location.origin + '/resume.pdf';
            return true;
        } catch (error) {
            console.error('All emergency download methods failed:', error);
            return false;
        }
    },
    
    // Simple preview without validation
    forcePreview: function() {
        const urls = [
            window.location.origin + '/resume.pdf',
            '/resume.pdf',
            './resume.pdf'
        ];
        
        for (const url of urls) {
            try {
                const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
                if (newWindow) {
                    console.log('Emergency preview opened from:', url);
                    return true;
                }
            } catch (error) {
                console.warn('Emergency preview failed for:', url, error);
            }
        }
        
        console.error('All emergency preview methods failed');
        return false;
    }
};

// Add to global scope for easy access in console
if (typeof window !== 'undefined') {
    window.emergencyPDF = window.emergencyPDFHandler;
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.emergencyPDFHandler;
}
