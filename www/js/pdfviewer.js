var PDFViewer = {
    open: function (url, title, callback) {
        cordova.exec(callback, function (err) {
                callback('Error: Preview');
            }, "PDFViewer", "open", [url, title]);
    }
};

module.exports = PDFViewer;