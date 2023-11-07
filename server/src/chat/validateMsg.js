const validateMsg = (msg) => {
  const isNonEmpty = msg.trim().length > 0;
  return isNonEmpty;
};

export default validateMsg;
