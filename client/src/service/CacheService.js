/**
 * @author Niklas Nguyen
 * @description this service exports finnished function that can save,get and remove from sessionStorage with a ref
 */

function saveLocalValue(ref, value) {
  sessionStorage.setItem(ref, JSON.stringify(value));
}

function getLocalValue(ref) {
  const value = sessionStorage.getItem(ref);
  if (value == null) throw new Error(`${ref} not found in local storage`);
  return JSON.parse(value);
}

function removeLocalValue(ref) {
  sessionStorage.removeItem(ref);
}

function isLoggedIn() {
  if (!sessionStorage.getItem("token")) return false;
  return true;
}

export default { saveLocalValue, getLocalValue, removeLocalValue, isLoggedIn, };
