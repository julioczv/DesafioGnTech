"use client";

import { Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SIDEBAR_W = 300;
export const SIDEBAR_RAIL = 72;
export const CONTENT_MAX = 1920;


export const ContentWrap = styled(Box, {
    shouldForwardProp: (prop) => prop !== "$open",
})<{ $open: boolean }>(({ theme, $open }) => {
    const side = $open ? SIDEBAR_W : SIDEBAR_RAIL;

    return {
        width: "100%",
        maxWidth: CONTENT_MAX,
        marginLeft: "auto",
        marginRight: "auto",
        paddingInline: 24,
        transition: "padding-left .24s ease",
        paddingLeft: `clamp(24px, calc(${side}px - ((100vw - ${CONTENT_MAX}px) / 2) + 24px), ${side + 24}px)`,

        [theme.breakpoints.down(799)]: {
            paddingLeft: 24,
            maxWidth: "100%",
        },
    };
});

export const Root = styled(Box)(() => ({
    minHeight: "100vh",
}));

export const Header = styled("header")(({ theme }) => ({
    position: "sticky",
    top: 0,
    height: 64,
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
    zIndex: 1200,
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

export const Sidebar = styled(Box, {
    shouldForwardProp: (prop) => prop !== "$open" && prop !== "$mobileOpen",
})<{ $open: boolean; $mobileOpen: boolean }>(({ theme, $open, $mobileOpen }) => ({
    position: "fixed",
    top: 64,
    left: 0,
    bottom: 0,
    padding: "16px",
    width: $open ? SIDEBAR_W : SIDEBAR_RAIL,
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: "0 20px 0 0",
    overflowY: "auto",
    zIndex: 1300,
    transition: "width .24s ease",


    [theme.breakpoints.down(799)]: {
        display: $mobileOpen ? "block" : "none",
        width: "100vw",
        height: "100dvh",
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: 0,
        borderRight: "none",
        zIndex: 1400,
    },
}));

export const Rail = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    alignItems: "center",
    paddingTop: 10,
}));

export const TypeIconBtn = styled(IconButton)(({ theme }) => ({
    width: 44,
    height: 44,
    borderRadius: 14,
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
    boxShadow: theme.palette.mode === "dark"
        ? "0 8px 20px rgba(0,0,0,0.25)"
        : "0 8px 20px rgba(0,0,0,0.06)",
    "&:hover": {
        borderColor: theme.palette.primary.main,
        transform: "translateY(-1px)",
    },
    transition: "transform .15s ease, border-color .15s ease",
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
