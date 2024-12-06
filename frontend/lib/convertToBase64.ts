function convertToBase64(file: File | undefined){
    if(!file) return false
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file); // Convert the file to a Base64 string
        fileReader.onload = () => {
            resolve(fileReader.result as string); // Cast result to string
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

export default convertToBase64;
