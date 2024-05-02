import { useEffect, useState } from "react";
import fetchService from "../service/FetchService";

function useFetchData(url, update) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async function () {
      try {
        setErr(false);
        setLoading(true);
        const response = await fetchService.fetchJson(url, "GET");
        if (response.error !== undefined) setErr(true);
        setData(response);
      } catch (err) {
        setErr(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, update]);
  return { loading, err, data };
}
export default useFetchData;
