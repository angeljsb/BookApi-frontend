import { useState, useEffect, useRef } from "react";
import Api from "../Utils/Api.js";

const getParams = (parameters = null) => {
  if (!parameters) return "";
  const searchParams = new URLSearchParams();
  for (let key in parameters) {
    if (parameters[key] instanceof Array) {
      parameters[key].forEach((val) => searchParams.append(key, val));
    } else {
      searchParams.append(key, parameters[key]);
    }
  }
  return searchParams.toString();
};

const useGet = (endpoint, parameters = null) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const abortRef = useRef(new AbortController());

  const params = getParams(parameters);

  useEffect(() => {
    setLoading(true);
    abortRef.current.abort();
    abortRef.current = new AbortController();
    Api[endpoint]
      .signal(abortRef.current.signal)
      .get(params)
      .then(async (res) => {
        if (res.ok) {
          setResult(await res.json());
        } else {
          setError(await res.json());
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [endpoint, params]);

  return { loading, result, error };
};

export default useGet;
