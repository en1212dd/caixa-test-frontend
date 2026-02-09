import type { Character } from "@models/Character";
import { type CharacterStatus } from "@shared/constants";
import "./CharacterTablePresentation.css";
import { Activity, use, useState } from "react";
import Pagination from "@shared/components/Paginator";
import type { ApiResponse } from "@models/ApiResponse";
import ShearchCharacter from "@shared/components/ShearchCharacter";
import type { CharacterFiltesExt } from "@models/Filters/CharacterFilter";
import { getGenderIcon, formatDate } from "@shared/utils";
import CharacterDetail from "@app/modals/CharacterDetail";

interface CharacterTableProps {
    fetchData: Promise<ApiResponse<Character>>,
    attributes: CharacterFiltesExt,
    setAttributes: (attributes: CharacterFiltesExt) => void,
    setPageNumber: (pageNumber: number) => void,
    pageNumber: number
}

export default function CharacterTableP({
    fetchData,
    setPageNumber,
    pageNumber,
    attributes,
    setAttributes
}: CharacterTableProps) {
    const [selectedCharac, setSelectedCharac] = useState<Character | null>(null)
    const charactersData = use(fetchData);
    const getStatusClass = (status: CharacterStatus) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'alive') return 'alive';
        if (statusLower === 'dead') return 'dead';
        return 'unknown';
    };
    const templateCads = (character: Character) => {
        const genderIcon = getGenderIcon(character.gender);
        const episodeCount = character.episode.length;
        const statusClass = getStatusClass(character.status);

        return (
            <div className="character-card" key={character.id} data-id={character.id} onClick={() => setSelectedCharac(character)}>
                <div className="card-image-container">
                    <img src={character.image} alt={character.name} className="character-image" />
                    <div className="card-reflection"></div>
                    <div className="card-shine"></div>
                </div>
                <div className="card-content">
                    <div className="card-header">
                        <h2 className="character-name">{character.name}</h2>
                        <span className="character-id">ID: {character.id}</span>
                    </div>
                    <div className="character-info">
                        <span className={`info-badge status-badge ${statusClass}`}>
                            <i className="fas fa-heartbeat"></i> {character.status}
                        </span>
                        <span className="info-badge">
                            {genderIcon} {character.species}
                        </span>
                        {character.type && (
                            <span className="info-badge">
                                <i className="fas fa-tag"></i> {character.type}
                            </span>
                        )}
                    </div>
                    <div className="character-details">
                        <div className="detail-row">
                            <span className="detail-label">
                                <i className="fas fa-globe-americas"></i> Origin
                            </span>
                            <span className="detail-value">{character.origin.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">
                                <i className="fas fa-map-marker-alt"></i> Ubication
                            </span>
                            <span className="detail-value">{character.location.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">
                                <i className="fas fa-film"></i> Episodes
                            </span>
                            <span className="detail-value">
                                Show in <strong>{episodeCount}</strong> episode(s)
                                <div className="episode-badge">with {episodeCount} appearances</div>
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">
                                <i className="fas fa-calendar-plus"></i> Created
                            </span>
                            <span className="detail-value">{formatDate(character.created)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <ShearchCharacter initialValues={attributes} onSearch={setAttributes} />
            <div className="cards-grid">
                {charactersData.results.map(templateCads)}
            </div>
            <Pagination pageInfo={charactersData} currentPage={pageNumber} onPageChange={setPageNumber} />
            <Activity mode={selectedCharac ? 'visible' : 'hidden'}>
                <CharacterDetail character={selectedCharac} onHide={() => setSelectedCharac(null)} visible={selectedCharac ? true : false} />
            </Activity>
        </>
    );
}

