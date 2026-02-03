import { ThemedSider } from "@refinedev/mui";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export const Sider = (props: React.ComponentProps<typeof ThemedSider>) => {
    const siderStyle: SxProps<Theme> = {
        "& .MuiListItemButton-root": {
            padding: "10px",
            margin: "10px",
            borderRadius: "12px",
            color: "#1e36e8",
        },
        "& .MuiListItemIcon-root": {
            color: "#475be8",
        },
        "& .MuiListItemButton-root:hover": {
            backgroundColor: "transparent",
        },
        "& .MuiListItemButton-root.Mui-selected": {
            backgroundColor: "#475be8",
            color: "#fff",
        },
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
            <ThemedSider
                {...props}
            // render={({ items }) => {
            //     // 🔥 ลบ dashboard default ทิ้งตรงนี้
            //     const filteredItems = items.filter(
            //         (item) => item.name !== "dashboard"
            //     );

            //     return <>{filteredItems}</>;
            // }}
            />
        </Box>
    );
};

