import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../services/itemsService";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "./CharacterDetails.css";

function CharacterDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCharacterById(id);
                setCharacter(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <ErrorBox message={error} />;
    if (!character) return <ErrorBox message="Character not found" />;

    return (
        <div className="character-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <div className="character-card-details">
                <img src={character.image} alt={character.name} />
                <div className="character-info">
                    <h2>{character.name}</h2>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Origin:</strong> {character.origin.name}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                    <p><strong>Episodes:</strong> {character.episode.length}</p>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetails;
