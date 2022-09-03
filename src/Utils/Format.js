const format = {
  displayByteImage: (image) => (
    `data:image/jpeg;base64,${image}`
  ),
  formatDate: (date) => (
    new Date(date).toLocaleString()
  ),
  priceFormatter: (number) => {
    const formatter = new Intl.NumberFormat('ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return formatter.format(number).replace('Rp', 'IDR');
  },
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
