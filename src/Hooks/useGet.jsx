import { useState, useEffect } from 'react';
import Api from "../Utils/Api.js";

const useGet = (endpoint, parameters, dependencies = []) => {

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    Api[endpoint].get(parameters).then(async (res) => {
      if (res.ok){
        setResult(await res.json());
      } else {
        setResult(await res.text());
      }
      setLoading(false);
    }).catch((err) => {
      setResult(err);
      setLoading(false);
    })
  }, dependencies);

  return [loading, result];

}

export default useGet;
