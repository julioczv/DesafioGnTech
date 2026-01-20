import {Box, Chip} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Root = styled("main")(({ theme }) => ({
    minHeight: "100vh",
}));

export const GridLayout = styled(Box)(({ theme }) => ({

}));

export const CardBorder  = styled(Box)(({ theme }) => ({
    borderRadius: 22,
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "#fff",
    padding: 14,
}));

export const CardInner = styled(Box)(({ theme }) => ({
    borderRadius: 18,
    padding: 18,
    border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.06)",
    background:  theme.palette.mode === "dark" ? "linear-gradient(135deg, rgba(40,40,40,1) 0%, rgba(20,20,20,1) 100%)" : "linear-gradient(135deg, #ffffff 0%, #f2f1ea 100%)",
    boxShadow:  theme.palette.mode === "dark"  ? "0 10px 40px rgba(0,0,0,0.25)" : "0 10px 40px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    minHeight: 520,
}));

export const TopRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
}));

export const NumberTag = styled(Box)(({ theme }) => ({
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: "0.18em",
    color: theme.palette.mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)",
}));

export const ChipRow = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: 8,
}))

export const TypeChip = styled(Chip)<{ tone?: "fire" | "water" | "grass" | "electric" | "psychic" }>(
    ({ theme, tone }) => {
        const map = {
            fire: "#FF421C",
            water: "#2980EF",
            grass: "#3FA129",
            electric: "#FAC000",
            psychic: "#EF4179",
        } as const;

        const bg = tone ? map[tone] : "#9aa0a6";

        return {
            height: 28,
            borderRadius: 10,
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: 12,
            color: "#fff",
            background: bg,
            "& .MuiChip-label": { paddingInline: 12 },
            ...(theme.palette.mode === "dark" && {
                filter: "saturate(1.05)",
            }),
        };
    }
);

export const ArtWrap = styled(Box)(({ theme }) => ({
    marginTop: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    borderRadius: 18,
    background:  theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.55)",
    border: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.04)",
}))

export const PokemonName = styled(Box)(({ theme }) => ({
    marginTop: 26,
    fontSize: 36,
    fontWeight: 900,
    fontStyle: "italic",
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
    color: theme.palette.text.primary,
}));

export const Stats = styled(Box)(({ theme }) => ({
    marginTop: 26,
    display: "grid",
    gap: 16,
}))

