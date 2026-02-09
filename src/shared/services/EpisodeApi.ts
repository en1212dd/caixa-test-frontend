import type { ApiResponse } from "@models/ApiResponse";
import type { Episode } from "@models/Episode";
import type { EpisodeFilters } from "@models/Filters/EpisodeFilter";
import { ENDPOINTS } from "@shared/constants";
import { buildQueryString, RickAndMortyClient } from "@shared/utils";

export async function fetchEpisodes(filters: EpisodeFilters): Promise<ApiResponse<Episode>> {
    const queryString = buildQueryString(filters);
    const query = queryString ? `?${queryString}` : '';
    const response = await RickAndMortyClient.get(`${ENDPOINTS.EPISODES}${query}`);
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
        throw new Error(`Error fetching episodes: ${response.statusText}`);
    }
    return response.data as ApiResponse<Episode>;
}

export async function fetchEpisodeById(id: number): Promise<Episode> {
    const response = await RickAndMortyClient.get(`${ENDPOINTS.EPISODES}/${id}`);
    if (response.status !== 200) {
        throw new Error(`Error fetching episode with id ${id}: ${response.statusText}`);
    }
    return response.data as Episode;
}