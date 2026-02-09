import { Dialog } from 'primereact/dialog';
import type { Character } from "@models/Character";
import type { CharacterStatus } from "@shared/constants";
import { getGenderIcon, formatDate } from "@shared/utils";
import './CharacterDetail.css';

interface CharacterModalProps {
    character: Character | null;
    visible: boolean;
    onHide: () => void;
}

export default function CharacterDetail({ character, visible, onHide }: CharacterModalProps) {
    if (!character) return null;

    const getStatusClass = (status: CharacterStatus) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'alive') return 'alive';
        if (statusLower === 'dead') return 'dead';
        return 'unknown';
    };

    const statusClass = getStatusClass(character.status);
    const genderIcon = getGenderIcon(character.gender);
    const episodeCount = character.episode.length;

    // Contenido del footer del modal
    const footerContent = (
        <div className="modal-footer">
            <button
                className="modal-close-btn"
                onClick={onHide}
            >
                <i className="fas fa-times"></i>
                Cerrar
            </button>
        </div>
    );

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={renderHeader()}
            footer={footerContent}
            className="character-modal"
            draggable={false}
            resizable={false}
            closeOnEscape={true}
            dismissableMask={true}
            blockScroll={true}
            style={{ width: '90vw', maxWidth: '900px' }}
            contentClassName="modal-content-custom"
            headerClassName="modal-header-custom"
        >
            <div className="modal-body">
                <div className="modal-grid">
                    {/* Columna izquierda - Imagen */}
                    <div className="modal-image-container">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="modal-character-image"
                        />
                        <div className="modal-image-shine"></div>

                        <div className="modal-image-badges">
                            <span className={`modal-badge status-badge ${statusClass}`}>
                                <i className="fas fa-heartbeat"></i> {character.status}
                            </span>
                            <span className="modal-badge">
                                {genderIcon} {character.species}
                            </span>
                        </div>
                    </div>

                    {/* Columna derecha - Información */}
                    <div className="modal-info-container">
                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <i className="fas fa-info-circle"></i>
                                Basic information
                            </h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">ID:</span>
                                    <span className="info-value">{character.id}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Type:</span>
                                    <span className="info-value">
                                        {character.type || 'No especificado'}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Gender:</span>
                                    <span className="info-value">
                                        {genderIcon} {character.gender}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Species:</span>
                                    <span className="info-value">{character.species}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <i className="fas fa-map-marked-alt"></i>
                                Ubications
                            </h3>
                            <div className="location-grid">
                                <div className="location-item">
                                    <div className="location-header">
                                        <i className="fas fa-home"></i>
                                        <span>Origin</span>
                                    </div>
                                    <div className="location-name">{character.origin.name}</div>
                                </div>
                                <div className="location-item">
                                    <div className="location-header">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>Actual ubication</span>
                                    </div>
                                    <div className="location-name">{character.location.name}</div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <i className="fas fa-film"></i>
                                Appears
                            </h3>
                            <div className="episode-section">
                                <div className="episode-count">
                                    Appears in <span className="highlight">{episodeCount}</span> episodes
                                </div>
                                <div className="episode-list-container">
                                    <div className="episode-badge-large">
                                        <i className="fas fa-tv"></i>
                                        <span>{episodeCount} appears</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <i className="fas fa-calendar-plus"></i>
                                Creation Date
                            </h3>
                            <div className="creation-date">
                                <i className="fas fa-clock"></i>
                                <span>{formatDate(character.created)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );

    function renderHeader() {
        return (
            <div className="modal-header-content">
                <div className="header-main">
                    <h2 className="modal-character-name">{character?.name}</h2>
                    <div className="header-badges">
                        <span className={`header-badge ${statusClass}`}>
                            {character?.status}
                        </span>
                        <span className="header-badge">
                            {genderIcon} {character?.gender}
                        </span>
                    </div>
                </div>
                <div className="header-subtitle">
                    Character #{character?.id} • {character?.species}
                </div>
            </div>
        );
    }
}