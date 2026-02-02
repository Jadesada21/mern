import { Box, Typography } from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";


const Title = ({ collapsed }: { collapsed: boolean }) => {
    return (
        <Box
            sx={{
                display: "flex"
            }} >
            <AlbumIcon
                sx={{
                    ml: "3px",
                    mr: collapsed ? 0 : 1.5,
                }}
            />
            {!collapsed && (
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        display: collapsed ? "none" : "block",
                        alignContent: "center"
                    }}>
                    Dashboard Mern
                </Typography>
            )}
        </Box>
    );
};

export default Title;




