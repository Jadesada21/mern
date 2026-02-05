import { useGetIdentity } from "@refinedev/core";
import { useForm } from "react-hook-form";
import Form from "../components/common/Form";

function CreateProperties() {
    const { data: user, isLoading } = useGetIdentity();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    if (isLoading) return <div>Loading...</div>;

    const onFinish = (data: any) => {
        console.log("FORM DATA:", data);
    };

    return (
        <Form
            type="create"
            register={register}
            handleSubmit={handleSubmit}
            onFinish={onFinish}
            formLoading={isSubmitting}
        // handleImageChange={handleImageChange}
        >
            {/* fields */}
        </Form>
    );
}

export default CreateProperties;
