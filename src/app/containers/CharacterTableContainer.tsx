import CharacterTableP from "@app/presentation/CharacterTablePresentation";
import { type CharacterFiltesExt } from "@models/Filters/CharacterFilter";
import PortalLoader from "@shared/components/PortalLoader";
import { fetchCharacters, fetchCharactersByLocation } from "@shared/services";
import { Suspense, useMemo, useState } from "react";

export default function CharecterTableContainer() {
    const [pageNumber, setPageNumber] = useState(1);
    const [attributes, setAttributes] = useState<CharacterFiltesExt>({})
    const filter = useMemo(() => ({
        name: attributes?.name,
        species: attributes?.species,
        status: attributes?.status,
        gender: attributes?.gender,
        location: attributes?.location,
        page: pageNumber
    }), [pageNumber, attributes]);

    const fetchFunction = useMemo(() => {
        return attributes?.location
            ? fetchCharactersByLocation(filter)
            : fetchCharacters(filter);
    }, [filter, attributes?.location]);
    return (
        <Suspense fallback={<PortalLoader size="large" />}>
            <CharacterTableP
                fetchData={fetchFunction}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                attributes={attributes}
                setAttributes={setAttributes}
            />
        </Suspense>
    );
}