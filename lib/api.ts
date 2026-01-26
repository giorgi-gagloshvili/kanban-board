export const getData = async (endpoint: string, query?: string | undefined) => {
  const response = await fetch(`http://localhost:3000/api${endpoint}${query}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch - ${response.statusText} ${response.status}`,
    );
  }

  return await response.json();
};

export const updateData = async (
  id: string,
  endpoint: string,
  data: { phase: string },
) => {
  const response = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Something went wrong - ${response.statusText}`);
  }

  await response.json();
};
