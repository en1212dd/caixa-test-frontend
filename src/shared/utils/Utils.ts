import type { CharacterFilters } from "@models/Filters/CharacterFilter";
import { CHARACTER_GENDER, type CharacterGender } from "@shared/constants";
import React from "react";


/**
 * Recoge los valores de un objeto como un tipo de unión
 * Ejemplo:
 * const COLORS = {
 *   RED: 'red',
 *  GREEN: 'green',
 *  BLUE: 'blue'
 * }
 * type Color = ObjectValues<typeof COLORS>; // 'red' | 'green' | 'blue'    
 */
export type ObjectValues<T> = T[keyof T];

/**
 * Construye los query params a partir de los filtros
 */
export function buildQueryString(filters: CharacterFilters): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            params.append(key, String(value));
        }
    });

    return params.toString();
}

export function getGenderIcon(gender: CharacterGender): React.ReactElement {
    switch (gender) {
        case CHARACTER_GENDER.MALE:
            return React.createElement('i', { className: 'fas fa-mars' });
        case CHARACTER_GENDER.FEMALE:
            return React.createElement('i', { className: 'fas fa-venus' });
        case CHARACTER_GENDER.GENDERLESS:
            return React.createElement('i', { className: 'fas fa-genderless' });
        default:
            return React.createElement('i', { className: 'fas fa-question-circle' });
    }
}

export function formatDate(dateString: string) {
    const options = {
        year: 'numeric' as const,
        month: 'short' as const,
        day: 'numeric' as const
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}