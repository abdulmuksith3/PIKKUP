import * as SecureStore from 'expo-secure-store';

export const setItem = async (key, value)=> {
  await SecureStore.setItemAsync(key, value);
};

export const getItem = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } 
  else {
    return null;
  }
};

export const deleteItem = async (key, options) => {
  await SecureStore.deleteItemAsync(key, options)
};

