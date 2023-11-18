const beforeUpload = async (message, file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    await message.error("Вы можете загрузить только файл JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    await message.error("Изображение должно быть меньше 2 МБ!");
  }
  return isJpgOrPng && isLt2M;
};
export default beforeUpload;
