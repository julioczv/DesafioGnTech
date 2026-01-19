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
} from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";
import SearchIcon from "@mui/icons-material/Search";
import {
    Root,
    Header,
    Sidebar,
    Main,
    Brand,
    GenGrid,
    GenBtn,
    TypeRow,
    TypeDot, SearchBox,
} from "./styles";

export default function Shell({ children }: { children: React.ReactNode }) {
    return (
        <Root>
            <Header>
                <Brand>
                    Poke<span>Dex</span>
                    <Box
                        component="span"
                        sx={{
                            fontSize: 10,
                            ml: 1,
                            px: 0.8,
                            py: 0.2,
                            borderRadius: 1,
                            bgcolor: "text.primary",
                            color: "background.default",
                            fontWeight: 900,
                        }}
                    >
                        V2.0
                    </Box>
                </Brand>
                <Box>
                    <SearchBox>
                        <SearchIcon fontSize="small" />
                        <InputBase
                            placeholder="Pesquise aqui seu Pokemon"
                            sx={{ ml: 1, flex: 1, fontSize: 13 }}
                        />
                    </SearchBox>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        onClick={() => (globalThis as any).__toggleTheme?.()}
                        title="Tema"
                    >
                        <ContrastIcon />
                    </IconButton>
                </Stack>
            </Header>
            <Sidebar>
                <Box sx={{ mt: 4 }}>
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
                        <Button size="small" sx={{ fontSize: 10, fontWeight: 900 }}>
                            Reset
                        </Button>
                    </Box>

                    <Stack spacing={0.5}>
                        <TypeRow>
                            <Checkbox defaultChecked size="small" />
                            <TypeDot variant="fire" />
                            <Typography sx={{ fontWeight: 700 }}>Fogo</Typography>
                        </TypeRow>
                        <TypeRow>
                            <Checkbox size="small" />
                            <TypeDot variant="water" />
                            <Typography sx={{ fontWeight: 700 }}>Água</Typography>
                        </TypeRow>
                        <TypeRow>
                            <Checkbox size="small" />
                            <TypeDot variant="grass" />
                            <Typography sx={{ fontWeight: 700 }}>Planta</Typography>
                        </TypeRow>
                        <TypeRow>
                            <Checkbox size="small" />
                            <TypeDot variant="electric" />
                            <Typography sx={{ fontWeight: 700 }}>Elétrico</Typography>
                        </TypeRow>
                        <TypeRow>
                            <Checkbox size="small" />
                            <TypeDot variant="psychic" />
                            <Typography sx={{ fontWeight: 700 }}>Psychic</Typography>
                        </TypeRow>
                    </Stack>
                </Box>

            </Sidebar>

            <Main>{children}</Main>

        </Root>
    );
}
