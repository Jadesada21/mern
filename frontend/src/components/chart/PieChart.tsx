import { Box, Stack, Typography } from "@mui/material"
import { PieChartProps } from "../../interfaces/home"
import ReactApexChart from "react-apexcharts";
import type { ComponentType } from "react";

const ApexChart = ReactApexChart as unknown as ComponentType<any>;

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
    return (
        <Box
            id="chart"
            flex={1}
            display={'flex'}
            bgcolor={"#fcfcfc"}
            flexDirection={'row'}
            justifyContent={"space-between"}
            alignItems={'center'}
            pl={3.5}
            py={2}
            gap={2}
            borderRadius={"15px"}
            minHeight={"110px"}
            width={'fit-content'}
        >
            <Stack
                direction={'column'}
            >
                <Typography
                    fontSize={20}
                    color={"#808191"}>
                    {title}
                </Typography>
                <Typography
                    fontSize={24}
                    color={"#11142d"}
                    fontWeight={700}
                    mt={1}>
                    {value}
                </Typography>
            </Stack>
            <ApexChart
                options={{
                    chart: { type: "donut" },
                    colors,
                    legend: { show: false },
                    dataLabels: { enabled: false }
                }}
                series={series}
                type="donut"
                width={"120px"}
            />


        </Box >
    )
}

export default PieChart

