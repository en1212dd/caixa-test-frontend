import type { CharacterGender, CharacterStatus } from "@shared/constants";

export interface CharacterFilters {
    name?: string;
    species?: string;
    status?: CharacterStatus;
    gender?: CharacterGender;
    page?: number;
}

interface AdditionalFiltersCharacter {
    location?: string
}

export type CharacterFiltesExt = CharacterFilters & AdditionalFiltersCharacter;