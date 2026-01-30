import { ThemedSider } from "@refinedev/mui";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export const Sider = () => {
    const siderStyle: SxProps<Theme> = {
        "& .MuiListItemButton-root": {
            padding: "10px",
            margin: "10px",
            borderRadius: "12px",
            color: "#1e36e8", // ตัวหนังสือ
        },

        "& .MuiListItemIcon-root": {
            color: "#475be8", // icon
        },

        // hover (ยังไม่ selected)
        "& .MuiListItemButton-root:hover": {
            backgroundColor: "transparent",
        },

        // selected
        "& .MuiListItemButton-root.Mui-selected": {
            backgroundColor: "#475be8",
            color: "#fefefe",
        },

        // icon + text ตอน selected
        "& .MuiListItemButton-root.Mui-selected .MuiListItemIcon-root": {
            color: "white",
        },

        "& .MuiListItemButton-root.Mui-selected .MuiTypography-root": {
            color: "white",
            fontWeight: 600,
        },
    };
    return (
        <Box sx={siderStyle}>
            <ThemedSider />
        </Box>
    );
};
