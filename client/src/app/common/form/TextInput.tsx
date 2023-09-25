import { Form, Input, Label } from "semantic-ui-react";
import { ReactElement } from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  step?: string;
  icon?: ReactElement;
  type?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Input
        {...field}
        type={props.type}
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
