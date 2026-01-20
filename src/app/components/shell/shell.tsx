"use client";

import * as React from 'react'
import {
    Box,
    IconButton,
    Typography,
    Button,
    Stack,
    Checkbox,
    FormControlLabel,
    InputBase,
    Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ContrastIcon from "@mui/icons-material/Contrast";
import {
    Root,
    Header,
    Sidebar,
    TypeRow,
    TypeDot,
    ContentWrap,
    Rail, SearchBox
} from "./styles";
import {useMediaQuery} from "@mui/system";
import {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useThemeToggle} from "@/app/theme-toggle-context";
import TypesFilter from "@/app/components/filter/type-filter";
import {usePokemonSearch} from "@/app/context/pokemon-search";
import TypeRail from "@/app/components/type-rail/type-rail";



export default function Shell({children}: { children: React.ReactNode }) {
    const isMobile = useMediaQuery("(max-width: 799px)", {noSsr: true});
    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = mobileOpen ? "hidden" : "";
    }, [mobileOpen])

    const toggleSidebar = () => {
        if (isMobile) setMobileOpen((prev) => !prev);
        else setOpen((prev) => !prev);
    }

    const {toggleTheme} = useThemeToggle();
    const {query, setQuery } = usePokemonSearch()

    return (
        <Root>
            <Header>
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <IconButton onClick={toggleSidebar}>
                        {isMobile ? (mobileOpen ? <CloseIcon/> : <MenuIcon/>) : <MenuIcon/>}
                    </IconButton>

                    <Typography sx={{fontWeight: 900, fontStyle: "italic", textTransform: "uppercase"}}>
                        Poke<span style={{color: "#f4e225"}}>Dex</span>
                    </Typography>
                </Box>
                <Box>
                    <SearchBox>
                        <SearchIcon fontSize="small"/>
                        <InputBase
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Pesquisar por nome ou ID..."
                            size="small"
                            sx={{ml: 1, flex: 1, fontSize: 13}}
                        />
                    </SearchBox>
                </Box>
                <IconButton onClick={toggleTheme}>
                    <ContrastIcon/>
                </IconButton>
            </Header>

            <Sidebar $open={open} $mobileOpen={mobileOpen}>
                {!open && <TypeRail />}
                {open && (
                    <Box sx={{mt: 4}}>
                        <Stack spacing={0.5}>
                          <TypesFilter />
                        </Stack>
                    </Box>
                )}
                {isMobile && (
                    <Box p={2}>
                        <Button fullWidth variant="outlined" onClick={() => setMobileOpen(false)}>
                            Fechar
                        </Button>
                    </Box>
                )}
            </Sidebar>

            <ContentWrap $open={open}>{children}</ContentWrap>
        </Root>
    )
        ;
}
