import { Navigate, useNavigate } from "react-router";
import { CustomButton, PropertyCard } from "../components";
import { Add } from "@mui/icons-material"
import { useTable } from "@refinedev/core"
import { Box, Typography } from "@mui/material";

const AllProperties = () => {
    const navigate = useNavigate()

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters
    } = useTable()

    const currentPrice = sorter.find((item) => item.field === "price")?.order

    const allProperties = data?.data ?? []
    if (isLoading) return <Typography>isLoading...</Typography>
    if (isError) return <Typography>isError...</Typography>

    return (
        <Box>
            <Box
                mt={"20px"}
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3
                }}>
                {AllProperties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        id={property._id}
                        title={property._title}
                        location={property.location}
                        price={property.price}
                        photo={property.photo} />
                ))}
            </Box>
        </Box>


        //     < CustomButton
        //     title="Add Property"
        //     handleClick={() => navigate("/properties/create")}
        //     backgroundColor="#000"
        //     color="#fcfcfc"
        //     icon={<Add />}
        //     disabled={false}
        // />
    )
}

export default AllProperties