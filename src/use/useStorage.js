export function useStorage() {
  const setStorage = (key, value) => {
    localStorage.setItem(`cardapio.${key}`, JSON.stringify(value));
  };

  const getStorage = (key) => {
    const json = localStorage.getItem(`cardapio.${key}`);
    return JSON.parse(json);
  };

  const removeStorage = (key) => {
    localStorage.removeItem(key);
  };

  return {
    setStorage,
    getStorage,
    removeStorage
  };
}