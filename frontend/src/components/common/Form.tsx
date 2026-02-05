import { Box, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography } from "@mui/material"
import { CreateResponse, UpdateResponse } from "@refinedev/core"
import {
    FieldValues,
    UseFormRegister,
    UseFormHandleSubmit,
} from "react-hook-form";
import { ReactNode } from "react";


interface FormProps<T extends FieldValues = FieldValues> {
    type: "create" | "edit";
    register: UseFormRegister<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    onFinish: (values: T) => Promise<void> | void;
    formLoading: boolean;
    handleImageChange: (file: File) => void;
    propertyImages?: { name: string; url: string };
    children?: ReactNode;
}

const Form = <T extends FieldValues>({
    type,
    register,
    handleSubmit,
    onFinish,
    formLoading,
    handleImageChange
}: FormProps<T>) => {
    return (
        <Box>
            <Typography
                fontSize={25} fontWeight={700} color="#11142d"
            >
                {type} a Property
            </Typography>
            <Box
                mt={2.5} borderRadius={"15px"} padding={"20px"} bgcolor={"#fcfcfc"}
            >
                <form style={{
                    marginTop: "20px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                // { onSubmit = { handleSubmit(onFinishHandler) }}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter properties name
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            color="info"
                            variant="outlined"

                            {...register<any>("title", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter properties description
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={3}
                            required
                            color="info"
                            style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: "10px",
                                color: "#919191"
                            }}
                        >
                        </TextareaAutosize>
                    </FormControl>
                    <Stack
                        direction="row"
                        gap={4}
                    >
                        <FormControl sx={{
                            flex: 1
                        }}
                        >
                            <FormHelperText sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                            >
                                select Property type
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue="apartment"
                                sx={{ textTransform: "capitalize" }}
                            >
                                <MenuItem
                                    value="apartment">Apartment</MenuItem>
                                <MenuItem
                                    value="villa">Villa</MenuItem>
                                <MenuItem
                                    value="farmhouse">Farmhouse</MenuItem>
                                <MenuItem
                                    value="condo">Condo</MenuItem>
                                <MenuItem
                                    value="studio">Studio</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                            >
                                Enter Property price
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                color="info"
                                variant="outlined"
                                placeholder="Enter Price"
                            // {...register<any>("title", { required: true })}
                            />
                        </FormControl>
                    </Stack>
                    <FormControl  >
                        <FormHelperText sx={{
                            fontWeight: 500,
                            margin: "10px 0",
                            fontSize: 16,
                            color: "#11142d",
                        }}
                        >
                            Location
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            color="info"
                            variant="outlined"
                            placeholder="Enter Price"
                        // {...register<any>("title", { required: true })}
                        />
                    </FormControl>
                    <Stack
                        direction={'column'}
                        gap={1}
                        justifyContent={"center"}
                        mb={2}
                    >
                        <Stack
                            direction={'row'}
                            gap={2}
                        >
                            <Typography></Typography>

                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Box>

    )

}



export default Form