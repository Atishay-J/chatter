import Profanity from 'profanity-js';
let config = {
  language: 'en-us'
};

const validateMsg = (msg: string) => {
  const filter = new Profanity(msg, config);
  const isNonEmpty = msg.trim().length > 0;
  const isProfane = filter.isProfane(msg);

  if (isNonEmpty) {
    if (isProfane) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export default validateMsg;
