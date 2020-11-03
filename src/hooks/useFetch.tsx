import useSWR, { responseInterface } from 'swr';
import { api } from '../config/api';

function useFetch<T, E = any>(
  url: string,
  fetcher = api,
  headers: HeadersInit,
): Omit<responseInterface<T, E>, 'revalidate' | 'isValidating'> {
  const { data, error, mutate } = useSWR<T>(url, async URL => {
    let payload;
    if (!fetcher) {
      payload = await fetch(URL, { headers }).then(res => res.json());
    } else {
      payload = await fetcher
        .get(URL, {
          headers,
        })
        .then(res => res.data);
    }
    return payload;
  });
  return { data, error, mutate };
}

export default useFetch;
