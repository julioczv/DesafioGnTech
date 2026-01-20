'use client'

import {Tone} from "@/app/utils/pokemonFormat";

type FiltersState = Record<Tone, boolean>;

const DEFAULT: FiltersState = {
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
};

type Ctx = {
    typeFilter: FiltersState;
    toggleType: (key: TypeKey) => void;
    setType: (key: TypeKey, value: boolean) => void;
    resetTypes: () => void;
    activeTypes: TypeKey[];
};

const PokemonFiltersContext = createContext<Ctx | null>(null);

export function PokemonFiltersProvider({ children }: {children: React.ReactNode}) {
    const [typeFilter, setTypeFilter] = useState<FiltersState>(DEFAULT);

    const toggleType = useCallback((key))
}