import { FormValues } from "@/forms/schema";
import { Control, useController } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  control: Control<FormValues>;
  fieldName: keyof FormValues;
  placeholder: string;
  label: string;
  className?: string;
}

export function RqInput({
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
    <div className={cn("mb-4", className)}>
      <Field>
        <FieldLabel htmlFor='input-field'>{label}</FieldLabel>
        <Input
          id='input-field'
          type='text'
          placeholder={placeholder}
          value={typeof field.value === "string" ? field.value : ""}
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
