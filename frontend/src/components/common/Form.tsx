import { Box, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography } from "@mui/material"
import { CreateResponse, UpdateResponse } from "@refinedev/core"
import { promises } from "dns"
import { FormEventHandler } from "react"
import { FieldValues } from "react-hook-form"

interface FormProps {
    type: string
    register: any
    onFinish: (
        values: FieldValues
    ) => Promise<void | CreateResponse | UpdateResponse>
    formLoading: boolean
    handleSubmit: FormEventHandler<HTMLFormElement | undefined>
    handleImageChange: (file) => void
    onFinishHandler: (
        values: FieldValues
    ) => Promise<void> | void
    propertyImages: { name: string; url: string }
}

const Form = ({
    type,
    register,
    onFinish,
    values,
    formLoading,
    handleSubmit,
    handleImageChange,
    onFinishHandler,
}: FormProps) => {
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
                    width: "100px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                //      {/* onSubmit={handleSubmit(onFinishHandler)} */}
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

                            {...register('title', { require: true })}
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
                            minRows={5}
                            required
                            placeholder="please insert description"
                            color="info"
                            style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
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
                            >
                                <MenuItem value="apartment">
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </form>
            </Box>
        </Box>

    )

}



export default Form