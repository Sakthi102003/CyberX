// Debug script to help diagnose PDF download issues
// Add this to your browser console on the deployed site

(function() {
    console.log('🔍 PDF Download Debug Tool');
    console.log('========================');
    
    // Environment info
    console.log('Current URL:', window.location.href);
    console.log('Origin:', window.location.origin);
    console.log('User Agent:', navigator.userAgent);
    
    // Test PDF URL
    const pdfUrl = window.location.origin + '/resume.pdf';
    console.log('PDF URL:', pdfUrl);
    
    // Test 1: Basic fetch
    console.log('\n🧪 Test 1: Basic PDF fetch');
    fetch(pdfUrl)
        .then(response => {
            console.log('✅ Fetch successful:', response.status, response.statusText);
            console.log('Content-Type:', response.headers.get('content-type'));
            console.log('Content-Length:', response.headers.get('content-length'));
            return response.blob();
        })
        .then(blob => {
            console.log('📦 Blob created:', blob.size, 'bytes, type:', blob.type);
        })
        .catch(error => {
            console.error('❌ Fetch failed:', error);
        });
    
    // Test 2: HEAD request
    console.log('\n🧪 Test 2: HEAD request');
    fetch(pdfUrl, { method: 'HEAD' })
        .then(response => {
            console.log('✅ HEAD request successful:', response.status);
            console.log('Headers:');
            for (const [key, value] of response.headers.entries()) {
                console.log(`  ${key}: ${value}`);
            }
        })
        .catch(error => {
            console.error('❌ HEAD request failed:', error);
        });
    
    // Test 3: Manual download function
    window.testDownload = function() {
        console.log('\n🧪 Test 3: Manual download');
        
        fetch(pdfUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'debug-resume.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                console.log('✅ Download initiated');
            })
            .catch(error => {
                console.error('❌ Download failed:', error);
            });
    };
    
    // Test 4: Preview function
    window.testPreview = function() {
        console.log('\n🧪 Test 4: Preview in new tab');
        const newWindow = window.open(pdfUrl, '_blank');
        if (newWindow) {
            console.log('✅ Preview window opened');
        } else {
            console.log('❌ Preview blocked by popup blocker');
        }
    };
    
    console.log('\n🛠️  Available test functions:');
    console.log('- testDownload() - Test manual download');
    console.log('- testPreview() - Test preview in new tab');
    console.log('\nTo use: Just type the function name in console, e.g., testDownload()');
})();
