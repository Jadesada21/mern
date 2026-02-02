import { useList } from "@refinedev/core"


import { PieChart, PropertyReferral, TotalRevernue } from "../components"
import { Box } from "@mui/material"

const Home = () => {
    return (
        <Box sx={{
            mt: "20px",
            display: "flex",
            flexwrap: "wrap",
            gap: "4px"
        }}>
            <PieChart
                title="Properties for sale"
                value={30}
                series={[75, 25]}
                colors={['#275be8', '#c4e8ef']} />
            <PieChart
                title="Properties for rent"
                value={400}
                series={[60, 40]}
                colors={['#275be8', '#c4e8ef']} />
            <PieChart
                title="Total customers"
                value={720}
                series={[10, 90]}
                colors={['#275be8', '#c4e8ef']} />
            <PieChart
                title="Properties for cities"
                value={550}
                series={[50, 50]}
                colors={['#275be8', '#c4e8ef']} />

        </Box>
    )
}

export default Home