import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useLogout } from "@refinedev/core";

export const LogoutButton = () => {
    const { mutate: logout } = useLogout();

    return (
        <Tooltip title="Logout">
            <IconButton
                color="inherit"
                onClick={() => logout()}
            >
                <LogoutOutlined />
            </IconButton>
        </Tooltip>
    );
};
