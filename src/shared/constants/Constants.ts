import type { ObjectValues } from "@shared/utils";

export const MAX_FRAMES = 271;
export const FRAME_RATE = 80;

export const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/api';

export const CHARACTER_STATUS = {
    ALIVE: 'Alive',
    DEAD: 'Dead',
    UNKNOWN: 'unknown'
};

export type CharacterStatus = ObjectValues<typeof CHARACTER_STATUS>;

export const CHARACTER_GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
    GENDERLESS: 'Genderless',
    UNKNOWN: 'unknown'
};

export type CharacterGender = ObjectValues<typeof CHARACTER_GENDER>;