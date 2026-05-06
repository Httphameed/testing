async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const logicAppUrl = "https://prod-28.italynorth.logic.azure.com:443/workflows/aecb1b0cbf744b57a4118bddb4655d74/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=FcTTR_wLtJLhYN0n3hCK904DO7I1KF-7FxV3omK83oo";

    const reader = new FileReader();
    reader.onloadend = async () => {
        const payload = {
            fileName: file.name,
            fileContent: reader.result.split(',')[1],
            uploader: "Abdul-Admin"
        };

        const response = await fetch(logicAppUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) alert("Upload Successful!");
    };
    reader.readAsDataURL(file);
}
