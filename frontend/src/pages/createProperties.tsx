// import { useGetIdentity } from "@refinedev/core"
// import { Form } from "react-hook-form"




// function CreateProperties() {
//     const { data: user } = useGetIdentity({
//         v3LegacyAuthProviderCompatible: true
//     })

//     return (
//         <Form
//             type="create" />
//     )
// }

// export default CreateProperties


import { useGetIdentity } from "@refinedev/core";
import { Form } from "react-hook-form";

function CreateProperties() {
    const { data: user, isLoading } = useGetIdentity();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Form type="create">
            {/* ตัวอย่างการใช้งาน user */}
            {/* <div>Created by: {user?.name}</div> */}
        </Form>
    );
}

export default CreateProperties;
