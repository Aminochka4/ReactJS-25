export async function fetchCharactersService(page = 1) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();

    return {
      results: data.results || [],
      next: data.info?.next || null,
    };

  } catch (error) {
    console.error("Error in fetchCharactersService:", error);
    throw error;
  }
}

export async function getCharacterById(id) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) throw new Error("Character not found");
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

