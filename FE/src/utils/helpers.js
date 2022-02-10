import fetch from "unfetch";
import { mutate } from "swr";

export const getInitials = value => {
  const values = value
    ?.toUpperCase()
    .split(" ")
    .slice(0, 3);

  return values.map(item => item?.[0]).join("");
};

export const updateAndRevalidate = (path, body, skipLocal) => {
  if (!skipLocal) mutate(path, body);

  return fetch(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });
};
