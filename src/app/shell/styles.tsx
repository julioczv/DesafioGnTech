"use client";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SIDEBAR_W = 256;
const HEADER_H = 64;

export const Root = styled(Box)(() => ({
    minHeight: "100vh",
}));

export const Header = styled("header")(({ theme }) => ({
    position: "sticky",
    top: 0,
    height: HEADER_H,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    background:
        theme.palette.mode === "dark"
            ? "rgba(26,26,26,0.85)"
            : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    zIndex: 10,
}));

export const SearchBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: 360,
    padding: "10px 12px",
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    background:
        theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.04)"
            : theme.palette.background.default,
    color: theme.palette.text.secondary,
    marginLeft: 16,
    marginRight: 16,
    [theme.breakpoints.down("md")]: {
        width: 280,
    },
}));

export const Brand = styled("h1")(({ theme }) => ({
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: "-0.05em",
    span: { color: theme.palette.primary.main },
}));

export const Sidebar = styled("aside")(({ theme }) => ({
    width: SIDEBAR_W,
    position: "fixed",
    left: 0,
    top: HEADER_H,
    bottom: 0,
    overflowY: "auto",
    padding: 24,
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.default,
    display: "none",
    [theme.breakpoints.up("xl")]: { display: "block" },
}));

export const Main = styled("main")(({ theme }) => ({
    maxWidth: 1600,
    margin: "0 auto",
    padding: 24,
    [theme.breakpoints.up("xl")]: {
        paddingLeft: 24 + SIDEBAR_W,
    },
}));

export const GenGrid = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
}));

export const GenBtn = styled(Button)(() => ({
    fontSize: 11,
    fontWeight: 900,
    borderRadius: 12,
    padding: "10px 0",
}));

export const TypeRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "6px 8px",
    borderRadius: 12,
    cursor: "pointer",
    "&:hover": {
        background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
    },
}));

export const TypeDot = styled("span")<{ variant: "fire" | "water" | "grass" | "electric" | "psychic" }>(
    ({ variant }) => {
        const map = {
            fire: "#FF421C",
            water: "#2980EF",
            grass: "#3FA129",
            electric: "#FAC000",
            psychic: "#EF4179",
        } as const;

        return {
            width: 8,
            height: 8,
            borderRadius: 999,
            background: map[variant],
            boxShadow: `0 0 10px ${map[variant]}`,
            display: "inline-block",
        };
    }
);
