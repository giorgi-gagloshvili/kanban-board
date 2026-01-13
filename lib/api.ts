export const getData = async (endpoint: string, query: any) => {
  let queryString = "";

  if (Object.values(query).filter(Boolean)) {
    queryString += "?";
  }

  for (let key in query) {
    if (query[key]) {
      queryString += `${key}=${query[key]}&`;
    }
  }

  queryString = queryString.slice(0, queryString.length - 1);

  console.log("Farewel", queryString);
  const response = await fetch(
    `http://localhost:3000/api${endpoint}${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fetch failed");
  }
  return await response.json();
};

export const updateData = async (id: string, endpoint: string, data: any) => {
  const response = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Soething went wrong");
  }

  await response.json();
};
