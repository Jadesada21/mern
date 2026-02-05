export interface PieChartProps {
    title: string
    value: number | string
    series: number[]
    colors: string[]
}

export interface FormProps<T extends FieldValues = FieldValues> {
    type: "create" | "edit";
    register: UseFormRegister<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    onFinish: (values: FieldValues) => void | Promise<void>;
    formLoading: boolean;
    handleImageChange: (file: File) => void;
    propertyImages?: { name: string; url: string };
    children?: ReactNode;
}