import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TCustomProps = {
  placeholder?: string;
  name: string;
  label?: string;
  type: string;
  id: string;
  defaultValue?: string;
};

const CustomInput = ({ placeholder, name, label, type, id, defaultValue }: TCustomProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} className='w-full'>
          <Input
            {...field}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            id={id}
            className='w-full'
          />
          {error && (
            <p style={{ color: "red", marginTop: "5px" }}>
              <svg
                width='17'
                height='15'
                viewBox='0 0 17 15'
                style={{ marginRight: "5px" }}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.33372 0.294245C8.48952 -0.33415 9.95977 0.0787245 10.6057 1.20174L16.7841 11.7143C16.9201 12.0281 16.9796 12.2833 16.9966 12.5484C17.0306 13.1677 16.8096 13.7696 16.3762 14.2329C15.9428 14.6945 15.3564 14.967 14.719 15H2.27707C2.01361 14.9843 1.75016 14.9257 1.5037 14.8349C0.271406 14.3477 -0.323494 12.9769 0.177922 11.7887L6.39887 1.19431C6.61134 0.821898 6.93428 0.500682 7.33372 0.294245ZM8.49802 10.2272C8.09009 10.2272 7.75015 10.5575 7.75015 10.9547C7.75015 11.3502 8.09009 11.6813 8.49802 11.6813C8.90595 11.6813 9.2374 11.3502 9.2374 10.9456C9.2374 10.55 8.90595 10.2272 8.49802 10.2272ZM8.49802 5.07533C8.09009 5.07533 7.75015 5.39654 7.75015 5.79373V8.12977C7.75015 8.52613 8.09009 8.85726 8.49802 8.85726C8.90595 8.85726 9.2374 8.52613 9.2374 8.12977V5.79373C9.2374 5.39654 8.90595 5.07533 8.49802 5.07533Z'
                  fill='#FF0000'
                />
              </svg>
              {error.message}
            </p>
          )}
        </Form.Item>
      )}
    />
  );
};

export default CustomInput;
