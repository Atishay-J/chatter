export const getInitials = (name: string) => {
  if (name.length === 1) {
    return name[0].substring(0, 2);
  } else if (name.length >= 2) {
    return name[0][0] + name[1][0];
  } else {
    return '';
  }
};
