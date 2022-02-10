import useSwr from "swr";
import fetch from "unfetch";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const useSuspense = (path, options) => useSwr(path, fetcher, { ...options, useSuspense: true });

export default useSuspense
