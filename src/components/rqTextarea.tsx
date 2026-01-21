import { FormValues } from "@/forms/schema";
import { Control, useController } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  control: Control<FormValues>;
  fieldName: keyof FormValues;
  placeholder: string;
  label: string;
  className?: string;
}

export function RqTextarea({
  control,
  fieldName,
  placeholder,
  label,
  className,
}: Props) {
  const { field, fieldState } = useController({
    name: fieldName,
    control,
  });
  return (
    <div className={cn("mb-2", { className })}>
      <Field>
        <FieldLabel htmlFor='input-field'>{label}</FieldLabel>
        <Textarea
          id='input-field'
          placeholder={placeholder}
          onChange={({ target: { value } }) => {
            field.onChange(value);
          }}
          className={cn("text-sm", fieldState.error && "border-destructive")}
        />
      </Field>
      {fieldState.error && (
        <p className='text-destructive text-sm mt-1'>
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
