import { nanoid } from 'nanoid';
import { UserData, UserRole } from './global.types';

const createUser = (userName: string, role: UserRole): UserData => {
  const userId = nanoid();
  return { userName, role, userId };
};

export default createUser;
