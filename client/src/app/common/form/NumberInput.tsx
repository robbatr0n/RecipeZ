import { Form, Input, Label } from "semantic-ui-react";
import { ReactElement } from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  step?: string;
  icon?: ReactElement;
}

export default function NumberInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Input
        type="number"
        {...field}
        {...props}
        label={props.step}
        icon={props.icon}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
