import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrassIcon from "@mui/icons-material/Grass";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BugReportIcon from "@mui/icons-material/BugReport";
import TerrainIcon from "@mui/icons-material/Terrain";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PublicIcon from "@mui/icons-material/Public";
import ShieldIcon from "@mui/icons-material/Shield";
import ScienceIcon from "@mui/icons-material/Science";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AirIcon from "@mui/icons-material/Air";

export const POKEMON_TYPES = {
    normal: {
        label: "Normal",
        labelPt: "Normal",
        color: "#A8A77A",
        icon: HelpOutlineIcon,
    },
    fire: {
        label: "Fire",
        labelPt: "Fogo",
        color: "#FF421C",
        icon: LocalFireDepartmentIcon,
    },
    water: {
        label: "Water",
        labelPt: "Água",
        color: "#2980EF",
        icon: WaterDropIcon,
    },
    electric: {
        label: "Electric",
        labelPt: "Elétrico",
        color: "#FAC000",
        icon: ElectricBoltIcon,
    },
    grass: {
        label: "Grass",
        labelPt: "Planta",
        color: "#3FA129",
        icon: GrassIcon,
    },
    ice: {
        label: "Ice",
        labelPt: "Gelo",
        color: "#96D9D6",
        icon: AcUnitIcon,
    },
    fighting: {
        label: "Fighting",
        labelPt: "Lutador",
        color: "#C22E28",
        icon: SportsMartialArtsIcon,
    },
    poison: {
        label: "Poison",
        labelPt: "Venenoso",
        color: "#A33EA1",
        icon: ScienceIcon,
    },
    ground: {
        label: "Ground",
        labelPt: "Terra",
        color: "#E2BF65",
        icon: TerrainIcon,
    },
    flying: {
        label: "Flying",
        labelPt: "Voador",
        color: "#A98FF3",
        icon: AirIcon,
    },
    psychic: {
        label: "Psychic",
        labelPt: "Psíquico",
        color: "#F95587",
        icon: PsychologyIcon,
    },
    bug: {
        label: "Bug",
        labelPt: "Inseto",
        color: "#A6B91A",
        icon: BugReportIcon,
    },
    rock: {
        label: "Rock",
        labelPt: "Pedra",
        color: "#B6A136",
        icon: PublicIcon,
    },
    ghost: {
        label: "Ghost",
        labelPt: "Fantasma",
        color: "#735797",
        icon: VisibilityIcon,
    },
    dragon: {
        label: "Dragon",
        labelPt: "Dragão",
        color: "#6F35FC",
        icon: AutoAwesomeIcon,
    },
    dark: {
        label: "Dark",
        labelPt: "Sombrio",
        color: "#705746",
        icon: DarkModeIcon,
    },
    steel: {
        label: "Steel",
        labelPt: "Aço",
        color: "#B7B7CE",
        icon: ShieldIcon,
    },
    fairy: {
        label: "Fairy",
        labelPt: "Fada",
        color: "#D685AD",
        icon: AutoAwesomeIcon,
    },
} as const;




export type PokemonType = keyof typeof POKEMON_TYPES;
