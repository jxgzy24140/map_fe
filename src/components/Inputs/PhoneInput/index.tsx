import { Input, Select, Form } from "antd";

interface Props {
  suffix?: any;
  disabled?: boolean;
  fieldName?: string;
  label?: string;
}

const PhoneInput = (props: Props) => {
  const selectBefore = (
    <Form.Item
      name={props.fieldName ? `prefix${props.fieldName}` : "prefix"}
      noStyle
      className="country-code"
    >
      <Select style={{ width: 100 }} defaultValue="+84">
        <Select.Option value="+84">
          <i className="icon famfamfam-flags vn" />
          +84
        </Select.Option>
        <Select.Option value="+1">
          <i className="icon famfamfam-flags us" />
          +1
        </Select.Option>
        <Select.Option value="+44">
          <i className="icon famfamfam-flags gb" />
          +44
        </Select.Option>
        <Select.Option value="+86">
          <i className="icon famfamfam-flags cn" />
          +86
        </Select.Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <Form.Item
        name={props.fieldName ?? "phoneNumber"}
        rules={[{ required: true }]}
        style={{ margin: "0" }}
      >
        <Input
          disabled={props.disabled}
          addonBefore={selectBefore}
          type="number"
          size="large"
          style={{ backgroundColor: "white" }}
          addonAfter={props.suffix}
        />
      </Form.Item>
      <style>{`
        .ant-input-group-addon:first-child {
          border-radius: 16px 0 0 16px !important
        }
  `}</style>
    </>
  );
};

export default PhoneInput;
