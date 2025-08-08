import {Box, CircularProgress, Typography} from "@mui/material";
import useTheme from "../../hooks/useTheme";

const LoadingPage = () => {
    const {theme} = useTheme();
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                backgroundColor:
                    theme === "dark"
                        ? "var(--color-deep-green)"
                        : "var(--color-white)"
            }}
        >
            <CircularProgress
                size={60}
                sx={{
                    color:
                        theme === "dark"
                            ? "var(--color-menu-button-dark)"
                            : "var(--color-button-light-green)"
                }}
            />

            <Typography
                variant="h5"
                align="center"
                sx={{
                    color:
                        theme === "dark"
                            ? "var(--color-white)"
                            : "var(--color-black)"
                }}
            >
                Loading
            </Typography>
        </Box>
    );
};

export default LoadingPage;
