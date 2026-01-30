
import LayersIcon from '@mui/icons-material/Layers';
import { Box, Typography } from "@mui/material"

type TitleProps = {
    collapsed: boolean;
};

function Title({ collapsed }: TitleProps) {
    return (
        <Box sx={{
            display: 'flex'
        }}>
            <LayersIcon sx={{
                marginRight: collapsed ? 0 : 2
            }} />
            <Typography sx={{
                fontSize: "14px",
                fontWeight: 700,
                display: collapsed ? "none" : "block",
                alignContent: "center"
            }}>
                Dashboard Mern
            </Typography>
        </Box>
    )
}

export default Title