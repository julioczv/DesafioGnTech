"use client";

import {
    Box,
    IconButton,
    Typography,
    Button,
    Stack,
    Checkbox,
    TextField,
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
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GrassIcon from "@mui/icons-material/Grass";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SearchIcon from "@mui/icons-material/Search";
import {useThemeToggle} from "@/app/theme-toggle-context";


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
                            placeholder="Procure aqui seu Pokemon"
                            sx={{ml: 1, flex: 1, fontSize: 13}}
                        />
                    </SearchBox>
                </Box>
                <IconButton onClick={toggleTheme}>
                    <ContrastIcon/>
                </IconButton>
            </Header>

            <Sidebar $open={open} $mobileOpen={mobileOpen}>
                {!open && (
                    <Rail>
                        <Tooltip title="Fire" placement="right">
                            <LocalFireDepartmentIcon sx={{color: 'red'}}/>
                        </Tooltip>

                        <Tooltip title="Water" placement="right">
                            <WaterDropIcon sx={{color: '#037bfc'}}/>
                        </Tooltip>

                        <Tooltip title="Grass" placement="right">
                            <GrassIcon sx={{color: 'green'}}/>
                        </Tooltip>

                        <Tooltip title="Electric" placement="right">
                            <ElectricBoltIcon sx={{color: '#fcbe03'}}/>
                        </Tooltip>

                        <Tooltip title="Psychic" placement="right">
                            <PsychologyIcon sx={{color: 'purple'}}/>
                        </Tooltip>
                    </Rail>
                )}
                {open && (
                    <Box sx={{mt: 4}}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    fontWeight: 900,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "text.secondary",
                                }}
                            >
                                Tipos Primários
                            </Typography>
                        </Box>

                        <Stack spacing={0.5}>
                            <TypeRow>
                                <Checkbox defaultChecked size="small"/>
                                <TypeDot variant="fire"/>
                                <Typography sx={{fontWeight: 700}}>Fogo</Typography>
                            </TypeRow>
                            <TypeRow>
                                <Checkbox size="small"/>
                                <TypeDot variant="water"/>
                                <Typography sx={{fontWeight: 700}}>Água</Typography>
                            </TypeRow>
                            <TypeRow>
                                <Checkbox size="small"/>
                                <TypeDot variant="grass"/>
                                <Typography sx={{fontWeight: 700}}>Planta</Typography>
                            </TypeRow>
                            <TypeRow>
                                <Checkbox size="small"/>
                                <TypeDot variant="electric"/>
                                <Typography sx={{fontWeight: 700}}>Elétrico</Typography>
                            </TypeRow>
                            <TypeRow>
                                <Checkbox size="small"/>
                                <TypeDot variant="psychic"/>
                                <Typography sx={{fontWeight: 700}}>Psychic</Typography>
                            </TypeRow>
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
