import { Box, Typography } from "@mui/material";
import { useGetIdentity, useShow } from "@refinedev/core";
import { useNavigate } from "react-router"

function PropertyDetail() {
    const navigate = useNavigate()

    const { data: user } = useGetIdentity<any>();

    const { queryResult } = useShow()

    const { data, isLoading, isError } = queryResult

    if (isLoading) return <Typography>isLoading...</Typography>
    if (isError) return <Typography>isError...</Typography>
    return (
        <Box

        >

        </Box>
    )
}

export default PropertyDetail