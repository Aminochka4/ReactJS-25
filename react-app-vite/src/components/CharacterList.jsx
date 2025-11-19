import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import { fetchCharactersService } from "../services/itemsService";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import { useSearchParams } from "react-router-dom";
import "../components/CharacterList.css";

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const fetchCharacters = async (reset = false) => {
        setLoading(true);
        setError(null);
        try {
            const currentPage = reset ? 1 : page;
            const data = await fetchCharactersService(currentPage, query);

            if (reset) {
                setCharacters(data.results);
                setPage(2);
            } else {
                setCharacters(prev => [...prev, ...data.results]);
                setPage(prev => prev + 1);
            }
            setHasMore(data.info?.next !== null);
        } catch (err) {
            setError("Failed to load characters");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(true); 
    }, [query]);


    const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchParams(value ? { q: value } : {});
    };

    const handleClearSearch = () => setSearchParams({});

    return (
        <div className="character-list">
            <h1 style={{ color: 'rgba(84, 84, 84, 1)' }}>Rick and Morty Characters</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={query}
                    onChange={handleSearchChange}
                    aria-label="Search characters"
                />
                <button
                    onClick={handleClearSearch}
                    className="clear-button"
                    aria-label="Clear search"
                >
                    Clear
                </button>
            </div>

            {error && <ErrorBox message={error} />}
            {loading && <Spinner />}

            <ul>
                {filteredCharacters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </ul>

            {hasMore && !loading && !error && (
                <button
                    onClick={() => fetchCharacters(false)}
                    className="load-button"
                >
                    {loading ? "Loading..." : "Load More Characters"}
                </button>

            )}
        </div>
    );
}

export default CharacterList;
