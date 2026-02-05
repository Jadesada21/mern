import { Navigate, useNavigate } from "react-router";
import { CustomButton } from "../components";
import { Add } from "@mui/icons-material"

function AllProperties() {
    const navigate = useNavigate()
    return (
        < CustomButton
            title="Add Property"
            handleClick={() => navigate("/properties/create")}
            backgroundColor="#000"
            color="#fcfcfc"
            icon={<Add />}
            disabled={false}
        />
    )
}

export default AllProperties