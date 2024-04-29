/**
 * @author niklas Nguyen
 * @description this service exports a finnish fetch build for json or a server response
 */

import cacheService from "./CacheService";

async function fetchOptions(url, method, data) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (cacheService.isLoggedIn("token"))
    options.headers = {
      authorization: `Bearer ${cacheService.getLocalValue("token")}`,
      "Content-Type": "application/json",
    };

  if (method !== "GET") options.body = JSON.stringify(data);

  return await fetch(url, options);
}

async function fetchJson(url, method, data) {
  return await (await fetchOptions(url, method, data)).json();
}

async function fetchRes(url, method, data) {
  return await fetchOptions(url, method, data);
}

const fetchService = { fetchJson, fetchRes };
export default fetchService;
