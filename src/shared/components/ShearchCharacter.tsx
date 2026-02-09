import { useState } from "react";
import "./ShearchCharacter.css";
import type { CharacterFiltesExt } from "@models/Filters/CharacterFilter";

interface SearchFilterProps {
    onSearch?: (filters: CharacterFiltesExt) => void;
    initialValues: CharacterFiltesExt;
}

export default function SearchFilter({ onSearch = () => { }, initialValues }: SearchFilterProps) {
    const [filters, setFilters] = useState<CharacterFiltesExt>(initialValues);

    const handleChange = (field: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
    };

    const handleReset = () => {
        setFilters({
            name: "",
            species: "",
            location: "",
            page: 1
        });
        onSearch({
            name: "",
            species: "",
            location: "",
            page: 1
        });
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-header">
                    <h2 className="search-title">
                        <i className="fas fa-search"></i> Shearch Characters
                    </h2>
                    <div className="search-subtitle">
                        Find your favorite characters of Rick and Morty
                    </div>
                </div>

                <div className="search-fields">
                    <div className="search-field-group">
                        <div className="field-label">
                            <i className="fas fa-user"></i>
                            <span>Name of the Character</span>
                        </div>
                        <div className="field-input-container">
                            <input
                                type="text"
                                value={filters.name}
                                onChange={handleChange('name')}
                                placeholder="Ej: Rick Sanchez, Morty Smith..."
                                className="search-input"
                                aria-label="Buscar por nombre"
                            />
                            <div className="field-reflection"></div>
                        </div>
                        <div className="field-hint">
                            Shearch for Complete name or partial
                        </div>
                    </div>

                    <div className="search-field-group">
                        <div className="field-label">
                            <i className="fas fa-dna"></i>
                            <span>Especie</span>
                        </div>
                        <div className="field-input-container">
                            <input
                                type="text"
                                value={filters.species}
                                onChange={handleChange('species')}
                                placeholder="Ej: Human, Alien, Robot..."
                                className="search-input"
                                aria-label="Buscar por especie"
                            />
                            <div className="field-reflection"></div>
                        </div>
                        <div className="field-hint">
                            Specie of the Character
                        </div>
                    </div>

                    <div className="search-field-group">
                        <div className="field-label">
                            <i className="fas fa-globe-americas"></i>
                            <span>Ubication</span>
                        </div>
                        <div className="field-input-container">
                            <input
                                type="text"
                                value={filters.location}
                                onChange={handleChange('location')}
                                placeholder="Ej: Earth, Citadel of Ricks..."
                                className="search-input"
                                aria-label="Buscar por ubicación"
                            />
                            <div className="field-reflection"></div>
                        </div>
                        <div className="field-hint">
                            Actual ubication of the Character
                        </div>
                    </div>
                </div>

                <div className="search-actions">
                    <button
                        type="submit"
                        className="search-btn search-btn-primary"
                    >
                        <i className="fas fa-search"></i>
                        <span>Search</span>
                        <div className="btn-shine"></div>
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="search-btn search-btn-secondary"
                    >
                        <i className="fas fa-undo"></i>
                        <span>Reset</span>
                    </button>
                </div>

                <div className="search-tips">
                    <div className="tips-title">
                        <i className="fas fa-lightbulb"></i> Search tips:
                    </div>
                    <ul className="tips-list">
                        <li>Use partial terms for broader searches</li>
                        <li>Leave fields empty to ignore this filter</li>
                        <li>The search is case-insensitive</li>
                    </ul>
                </div>
            </form>
        </div>
    );
}