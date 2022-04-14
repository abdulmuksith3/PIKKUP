import { getItem, deleteItem  } from './SecureStore';
import { showErrorMessage } from './FlashMessage';
import { USER } from '../constants/Authentication';
import { logMessage } from './Log';

export const getUser = async () => {
  const res = await getItem(USER);
  if (res) {
    
    return true;
  } else {
    return false;
  }
};

export const deleteUserData = async () => {
  try {
    await deleteItem(USER)
  } catch (err) {
    logMessage({
      title: "deleteUserData Error",
      body: err.message,
      userId: "NULL"
    })
  }
};