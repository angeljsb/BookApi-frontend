import { useState, useEffect } from 'react';
import Api from "../Utils/Api.js";

const useGet = (endpoint, parameters = null) => {

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Api[endpoint].get(parameters).then(async (res) => {
      if (res.ok){
        setResult(await res.json());
      } else {
        setError(await res.text());
      }
      setLoading(false);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    })
  }, [endpoint, parameters]);

  return [loading, result, error];

}

export default useGet;
