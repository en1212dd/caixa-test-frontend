import type { ObjectValues } from "@shared/utils";

export const ENDPOINTS = {
    CHARACTERS: '/character',
    LOCATIONS: '/location',
    EPISODES: '/episode'
};
export type EndpointKey = ObjectValues<typeof ENDPOINTS>;