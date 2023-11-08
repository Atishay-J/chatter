import { nanoid } from 'nanoid';
/**
 *
 * @param {string} serverHistory
 * @param {string} name
 * @param {string} role
 * @param {string} roomName
 */

const createUser = (name, role) => {
  const userId = nanoid();
  return { name, role, userId };
};

export default createUser;
