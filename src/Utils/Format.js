const format = {
  displayByteImage: (image) => (
    `data:image/jpeg;base64,${image}`
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
