import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Row,
  Col,
} from "antd";
import settingService from "@/services/settings/settingService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Item {
  id: string;
  name: string;
  ageOfMale: number;
  ageOfFemale: number;
  imageSrc: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = () => {
  const [data, setData] = useState<any>();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<any>();
  useEffect(() => {
    initValue();
    return () => setData([]);
  }, []);
  const initValue = async () => {
    const result = await settingService.getAll();
    console.log("result", result);

    setData(result);
  };
  const isEditing = (record: Item) => record.id === editingKey;

  const edit = async (record: any & { key: any }) => {
    const editField = await settingService.get(record.id);
    form.setFieldsValue({
      name: "",
      ageOfMale: editField.ageOfMale,
      ageOfFemale: editField.ageOfFemale,
      imageSrc: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: any) => {
    try {
      const row = (await form.validateFields()) as Item;
      const editRow = data.find((x) => x.id === key);
      try {
        await settingService.update(key, {
          id: key,
          name: editRow.name,
          ageOfMale: row.ageOfMale,
          ageOfFemale: row.ageOfFemale,
          imageSrc: editRow.imageSrc,
        });
        toast("Update successfully!");
      } catch (error) {
        toast("Update failed!");
      }
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "EVENT",
      dataIndex: "event",
      render: (event: any, record: any) => {
        return (
          <Row style={{ gap: "10px" }}>
            <Col
              span="3"
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <img src={require(`../../assets/settings/${record.imageSrc}`)} />
            </Col>
            <Col
              span="15"
              style={{
                color: "#44350",
                fontFamily: "Montserrat",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "600",
                letterSpacing: "0.046px",
              }}
            >
              {record.name}
            </Col>
          </Row>
        );
      },
    },
    {
      title: "AGE OF MALE",
      dataIndex: "ageOfMale",
      editable: true,
    },
    {
      title: "AGE OF FEMALE",
      dataIndex: "ageOfFemale",
      editable: true,
    },
    {
      title: "ACTION",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            {/* <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link> */}
            <Popconfirm title="Sure to save?" onConfirm={() => save(record.id)}>
              <Typography.Link style={{ marginRight: 8 }}>Save</Typography.Link>
            </Popconfirm>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link onClick={() => edit(record)}>Edit</Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  console.log(data);

  return (
    <Col span="12">
      <h1
        style={{
          color: "#44350d",
          fontSize: "23px",
          fontWeight: "700",
          padding: "60px",
        }}
      >
        AGE & EVENT SETTING
      </h1>
      <Row style={{ marginLeft: "60px" }}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data && data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      </Row>
      <ToastContainer position="top-right" />
    </Col>
  );
};
export default App;
