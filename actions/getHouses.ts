"use server";

export const getHouses = async (offset: number, limit: number) => {
  try {
    const url = `https://wizard-world-api.herokuapp.com/houses`;

    // const url = `http://localhost:4000/houses`;

    // const url = `http://localhost:4000/houses?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = (await response.json()) as House[];
    return data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
