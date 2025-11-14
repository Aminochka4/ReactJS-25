import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import "../pages/CharacterList.css";

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character?page=${page}`
            );
            const data = await response.json();

            if (data.results) {
                setCharacters((prev) => [...prev, ...data.results]);
                setPage((prev) => prev + 1);
                setHasMore(data.info.next !== null);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    };

    // Assignment 5
    useEffect(() => {
        fetchCharacters();
    }, []);

    const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="character-list">
            <h1 style={{ color: 'rgba(84, 84, 84, 1)' }}>Rick and Morty Characters</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search characters"
                />
                <button onClick={() => setSearchTerm('')} className="clear-button" aria-label="Clear search">
                    Clear
                </button>
            </div>
            <ul>
                {filteredCharacters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </ul>
            {hasMore && (
                <button onClick={fetchCharacters} className="load-button">
                    {loading ? "Loading..." : "Load More Characters"}
                </button>
            )}
        </div>
    );
}

export default CharacterList;
