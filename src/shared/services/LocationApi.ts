import type { ApiResponse } from "@models/ApiResponse";
import type { LocationFilters } from "@models/Filters/LocationFilter";
import type { Location } from "@models/Location";
import { ENDPOINTS } from "@shared/constants";
import { buildQueryString, RickAndMortyClient } from "@shared/utils";


export async function fetchLocations(filters: LocationFilters = {}): Promise<ApiResponse<Location>> {
    const queryString = buildQueryString(filters);
    const query = queryString ? `?${queryString}` : '';
    const response = await RickAndMortyClient.get(`${ENDPOINTS.LOCATIONS}${query}`);
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
        throw new Error(`Error fetching locations: ${response.statusText}`);
    }
    return response.data as ApiResponse<Location>;
}

export async function fetchLocationById(id: number): Promise<Location> {
    const response = await RickAndMortyClient.get(`${ENDPOINTS.LOCATIONS}/${id}`);
    if (response.status !== 200) {
        throw new Error(`Error fetching location with id ${id}: ${response.statusText}`);
    }
    return response.data as Location;
}
