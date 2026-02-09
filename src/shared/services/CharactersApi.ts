import type { ApiResponse } from "@models/ApiResponse";
import type { Character } from "@models/Character";
import type { CharacterFilters, CharacterFiltesExt } from "@models/Filters/CharacterFilter";
import type { Location } from "@models/Location";
import { ENDPOINTS } from "@shared/constants";
import { buildQueryString, RickAndMortyClient } from "@shared/utils";

export async function fetchCharacters(filters: CharacterFilters = {}): Promise<ApiResponse<Character>> {
    const queryString = buildQueryString(filters);
    const query = queryString ? `?${queryString}` : '';
    try {
        const response = await RickAndMortyClient.get(`${ENDPOINTS.CHARACTERS}${query}`);
        if (response.status !== 200) {
            if (response.status === 404) {
                return {
                    info: {
                        count: 0,
                        pages: 0,
                        next: null,
                        prev: null
                    },
                    results: []
                };
            }
            throw new Error(`Error fetching characters: ${response.statusText}`);
        }
        return response.data as ApiResponse<Character>;
    } catch (error) {

        return {
            info: {
                count: 0,
                pages: 0,
                next: null,
                prev: null
            },
            results: []
        };
    }
}

export async function fetchCharacterById(id: number): Promise<Character> {
    const response = await RickAndMortyClient.get(`${ENDPOINTS.CHARACTERS}/${id}`);
    if (response.status !== 200) {
        throw new Error(`Error fetching character with id ${id}: ${response.statusText}`);
    }
    return response.data as Character;
}

export async function fetchCharactersByLocation(
    filters: CharacterFiltesExt = {}
): Promise<ApiResponse<Character>> {
    const { location: locationName, ...otherFilters } = filters;
    const page = filters.page || 1;
    const perPage = 20;

    if (!locationName) {
        return fetchCharacters(filters);
    }

    try {
        // 1. Buscar todas las locations que coincidan con el nombre
        let allLocations: Location[] = [];
        let nextPage: string | null = `${ENDPOINTS.LOCATIONS}?name=${encodeURIComponent(locationName)}`;
        let currentPage = 1;

        while (nextPage) {
            const response = await RickAndMortyClient.get(nextPage);
            if (response.status !== 200) break;

            const data = response.data as ApiResponse<Location>;
            allLocations = [...allLocations, ...data.results];
            nextPage = data.info.next;
            currentPage++;

            // Si encontramos más de 100 locations, podemos limitar la búsqueda
            if (allLocations.length > 100) break;
        }

        if (allLocations.length === 0) {
            return {
                info: { count: 0, pages: 0, next: null, prev: null },
                results: []
            };
        }

        // 2. Extraer todos los IDs de personajes de las residents URLs
        const characterIds: Set<number> = new Set();

        allLocations.forEach(location => {
            location.residents.forEach(residentUrl => {
                const match = residentUrl.match(/\/(\d+)$/);
                if (match) {
                    characterIds.add(parseInt(match[1]));
                }
            });
        });

        // 3. Obtener todos los personajes en lotes (la API soporta hasta 20 IDs por petición)
        const allCharacterIds = Array.from(characterIds);
        let allCharacters: Character[] = [];

        // Procesar en lotes de 20 IDs (límite de la API)
        for (let i = 0; i < allCharacterIds.length; i += 20) {
            const batchIds = allCharacterIds.slice(i, i + 20);
            const idsString = batchIds.join(',');

            const response = await RickAndMortyClient.get(
                `${ENDPOINTS.CHARACTERS}/${idsString}`
            );

            if (response.status === 200) {
                // La API devuelve un array cuando hay múltiples IDs
                const characters = Array.isArray(response.data)
                    ? response.data
                    : [response.data];
                allCharacters = [...allCharacters, ...characters];
            }
        }

        // 4. Aplicar otros filtros si existen
        let filteredCharacters = allCharacters;

        if (otherFilters.name) {
            const searchName = otherFilters.name.toLowerCase();
            filteredCharacters = filteredCharacters.filter(char =>
                char.name.toLowerCase().includes(searchName)
            );
        }

        if (otherFilters.species) {
            filteredCharacters = filteredCharacters.filter(char =>
                char.species.toLowerCase() === otherFilters.species?.toLowerCase()
            );
        }

        if (otherFilters.status) {
            filteredCharacters = filteredCharacters.filter(char =>
                char.status.toLowerCase() === otherFilters.status?.toLowerCase()
            );
        }

        if (otherFilters.gender) {
            filteredCharacters = filteredCharacters.filter(char =>
                char.gender.toLowerCase() === otherFilters.gender?.toLowerCase()
            );
        }

        // 5. Ordenar por ID (opcional, para consistencia)
        filteredCharacters.sort((a, b) => a.id - b.id);

        // 6. Paginar resultados
        const totalCount = filteredCharacters.length;
        const totalPages = Math.ceil(totalCount / perPage);
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedResults = filteredCharacters.slice(startIndex, endIndex);

        return {
            info: {
                count: totalCount,
                pages: totalPages,
                next: page < totalPages
                    ? buildQueryString({ ...filters, page: page + 1 })
                    : null,
                prev: page > 1
                    ? buildQueryString({ ...filters, page: page - 1 })
                    : null
            },
            results: paginatedResults
        };

    } catch (error) {
        console.error('Error fetching characters by location:', error);
        return {
            info: { count: 0, pages: 0, next: null, prev: null },
            results: []
        };
    }
}