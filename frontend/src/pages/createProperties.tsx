import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Form from "../components/common/Form";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

function CreateProperties() {
    const { data: user, isLoading } = useGetIdentity();
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();


    const [properImage, setProperImage] = useState({ name: "", url: "" })

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) => {
            return new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile)
            })
        }
        reader(file).then((result: string) => {
            setProperImage({ name: file?.name, url: result })
        })
    }

    const onFinishHandler = async (data: FieldValues) => {
        if (!properImage.name) return alert("Plase upload an image")
        await onFinish({
            ...data,
            photo: properImage.url,
            email: user.email
        })
    }

    return (
        <Form
            type="create"
            register={register}
            handleSubmit={handleSubmit}
            onFinish={onFinishHandler}
            formLoading={isSubmitting}
            handleImageChange={handleImageChange}
            propertyImages={properImage}
        >
            {/* fields */}
        </Form>
    );
}

export default CreateProperties;
