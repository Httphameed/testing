async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const logicAppUrl = "PASTE_YOUR_LOGIC_APP_URL_HERE";

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