const format = {
  displayByteImage: (image) => (
    `data:image/jpeg;base64,${image}`
  ),
  formatDate: (date) => (
    new Date(date).toUTCString()
  ),
  formatToDate: (date) => (
    new Date(date)
  ),
  getBase64: (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.replace('data:', '')
        .replace(/^.+,/, '');
      resolve(base64);
    };
  }),
};

export default format;
