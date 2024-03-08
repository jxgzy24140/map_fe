import React from "react";
import { Button, DatePicker, Form, Input, Row } from "antd";
import withRouter from "@/components/Layout/Router/withRouter";
import { AppLayouts } from "@/components/Layout/Router/router.config";
const addIcon: string = require("@/assets/icons/add-circle.svg").default;
const searchIcon: string = require("@/assets/icons/search-icon.svg").default;

interface IProps {
  navigate: any;
  onSubmit: any;
  form: any;
}

const Filter = (props: IProps) => {
  const onCreateNewMap = () => {
    props.navigate(AppLayouts.createMapPage.path);
  };
  const onFinish = (values: any) => {
    props.onSubmit(values);
  };
  return (
    <Row className="flex justify-between items-center p-5">
      <Form form={props.form} onFinish={onFinish}>
        <div className="flex items-center justify-center gap-3">
          <Row>
            <Form.Item>
              <Button
                htmlType="submit"
                className="flex justify-center align-items-center"
                style={{ border: "none" }}
              >
                <img src={searchIcon} />
              </Button>
            </Form.Item>
            <Form.Item name="query">
              <Input
                type="text"
                className="outline-none border-none"
                placeholder="Client Name"
              />
            </Form.Item>
          </Row>
          <div className="p-1">
            <Form.Item name="from">
              <DatePicker placeholder="Submission Date:" />
            </Form.Item>
          </div>
        </div>
      </Form>

      <div
        className="flex items-center justify-center gap-1 px-2 py-4 rounded-lg bg-white cursor-pointer"
        style={{
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.04)",
          color: "#28cd9e",
        }}
        onClick={onCreateNewMap}
      >
        <img src={addIcon} className="add-icon" style={{ color: "#28cd9e" }} />
        <p>New Map</p>
      </div>
    </Row>
  );
};

export default withRouter(Filter);
