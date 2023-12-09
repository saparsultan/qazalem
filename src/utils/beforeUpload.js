const beforeUpload = async (message, file, infoOne, infoSecond) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    await message.error(infoOne);
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    await message.error(infoSecond);
  }
  return isJpgOrPng && isLt2M;
};
export default beforeUpload;
