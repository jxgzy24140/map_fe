import {
  Row,
  Col,
  Input,
  DatePicker,
  Divider,
  Button,
  Form,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  DownloadOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import MapStore from "@/stores/mapStore";
import withRouter from "@/components/Layout/Router/withRouter";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useEffect } from "react";
import { AppLayouts } from "@/components/Layout/Router/router.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupIcons from "@/components/GroupIcon";
import GridView from "@/components/GridView";
dayjs.extend(weekday);
dayjs.extend(localeData);
const confirm = Modal.confirm;
interface IProps {
  navigate: any;
  params: any;
  mapStore: MapStore;
}

const Detail = inject(Stores.MapStore)(
  observer((props: IProps) => {
    const { editMap, events } = props.mapStore;
    const { id } = props.params;
    useEffect(() => {
      initValue();
      return () => {
        props.mapStore.cleanUp();
      };
    }, []);

    const [mapForm] = Form.useForm();
    const [userForm] = Form.useForm();

    const initValue = async () => {
      await props.mapStore.get(id);
      await props.mapStore.getSettings();
      await props.mapStore.getEvents();
    };

    const Confirm = {
      handleDeleteConfirm: (value: any) => {
        confirm({
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: "Delete this user?",
          okText: "OK",
          cancelText: "CANCEL",
          onOk: () => {
            value.callBack(value.formListId);
            HandleUserChange.handleDeleteRecord(value.userId);
          },
        });
      },

      handleClearAllConfirm: () => {
        confirm({
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: "Clear all?",
          okText: "OK",
          cancelText: "CANCEL",
          onOk: () => {
            mapForm.resetFields();
            userForm.resetFields();
            initValue();
          },
        });
      },
    };

    const onFinish = async (value: any) => {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Save all changed?",
        okText: "OK",
        cancelText: "CANCEL",
        okButtonProps: {
          style: { background: "#1890ff", borderColor: "#1890ff" },
        },
        onOk: async () => {
          value["user-info"]?.map((user, index) => {
            editMap.records[index].name = user.name;
          });
          editMap.clientName = value.clientName;
          editMap.creatorName = value.creatorName;
          editMap.creationTime = value.creationTime;
          try {
            await props.mapStore.update(id, editMap);
            toast.success("Update success!", {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => props.navigate(AppLayouts.homePage.path), 2000);
          } catch (error) {
            console.log(error);
            toast("Failed update!");
            setTimeout(() => props.navigate(AppLayouts.homePage.path), 2000);
          }
        },
      });
    };

    const HandleUserChange = {
      handleSelectDob: (userId: number, dateString: string) => {
        editMap.records.map((item) => {
          if (item.id == userId) {
            item.dob = dayjs(dateString);
          }
          return item;
        });
      },

      handleSelectGender: (userId: number, gender: number) => {
        editMap.records.map((item) => {
          if (item.id === userId) {
            item.gender = gender;
          }
          return item;
        });
      },

      handleDeleteRecord: (userId: number) => {
        editMap.records = editMap.records.filter((item) => {
          return item.id !== userId;
        });
        editMap.records.map((item) => {
          if (item.id > userId) item.id = item.id - 1;
          return item;
        });
        editMap.numsOfMember = editMap.records.length;
      },
    };

    const onAddRecord = () => {
      const lastedUserId = editMap.records[editMap.records.length - 1].id;
      editMap.records.push({
        id: lastedUserId + 1,
        name: "",
        dob: "",
        gender: 0,
        settings: props.mapStore.settings,
        events: [],
      });
      editMap.numsOfMember = editMap.records.length;
    };

    const SaveAndAdd = () => {
      return (
        <Row style={{ flexWrap: "nowrap", gap: "30px" }}>
          <Col className="flex justify-center items-center">
            <PlusCircleOutlined
              style={{ fontSize: "25px" }}
              onClick={() => {
                document.getElementById("add-btn")?.click();
              }}
            />
          </Col>
          <Col className="flex justify-center items-center">
            <Button
              key={Math.random()}
              style={{ background: "#28CD9E" }}
              type="primary"
              htmlType="submit"
              onClick={() => {
                document.getElementById("finish-form")?.click();
              }}
            >
              Save
            </Button>
          </Col>
        </Row>
      );
    };

    const Footer = () => {
      return (
        <>
          <Row
            gutter={[10, 5]}
            className="w-full"
            style={{ padding: "10px 0" }}
          >
            <Col className="h-full" span={12}>
              <GroupIcons events={props.mapStore?.events} />
            </Col>
            <Col className="h-full p-1 bg-white rounded-md" span={12}>
              {props.mapStore.editMap && (
                <Row className="flex flex-col justify-center items-center h-full">
                  <div>
                    <Col span={24} style={{ padding: 0 }}>
                      <div
                        className="flex items-center"
                        style={{ gap: "10px" }}
                      >
                        <strong
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            width: "5vw",
                          }}
                        >
                          Prepared for
                        </strong>
                        <Form.Item
                          name="clientName"
                          rules={[
                            {
                              required: true,
                              message: "Please input client name!",
                            },
                          ]}
                          className="m-0"
                        >
                          <Input
                            style={{ width: "40vw" }}
                            placeholder="Enter Name"
                          />
                        </Form.Item>
                      </div>
                    </Col>
                  </div>
                  <div style={{ marginBottom: "0" }}>
                    <Col span={24} style={{ padding: "10px 0" }}>
                      <div
                        className="flex items-center"
                        style={{ gap: "10px" }}
                      >
                        <strong
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            width: "5vw",
                          }}
                        >
                          Enter Name
                        </strong>
                        <Form.Item
                          name="creatorName"
                          rules={[
                            {
                              required: true,
                              message: "Please input client name!",
                            },
                          ]}
                          className="m-0"
                        >
                          <Input
                            style={{ width: "40vw" }}
                            placeholder="Enter Name (Auto fill by logged in user"
                          />
                        </Form.Item>
                      </div>
                    </Col>
                  </div>
                  <div style={{ marginBottom: "0" }}>
                    <Col span={24} style={{ padding: 0 }}>
                      <div
                        className="flex items-center"
                        style={{ gap: "10px" }}
                      >
                        <strong
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            width: "5vw",
                          }}
                        >
                          Prepared day
                        </strong>
                        <Form.Item
                          name="creationTime"
                          rules={[
                            {
                              required: true,
                              message: "Please choose prepared day!",
                            },
                          ]}
                          className="m-0"
                        >
                          <DatePicker style={{ width: "40vw" }} />
                        </Form.Item>
                      </div>
                    </Col>
                  </div>
                </Row>
              )}
            </Col>
          </Row>
        </>
      );
    };

    return (
      <>
        <Col
          style={{ padding: "10px", height: "calc(100vh - 88px)" }}
          className="flex flex-col"
        >
          <Row className="w-full" style={{ height: "90px" }}>
            <Col span={22} style={{ paddingRight: "20px" }}>
              <h2>OBJECTIVE</h2>
              <Divider />
              <Divider />
            </Col>
            <Col span={2}>
              <Row
                className="flex items-center justify-center"
                style={{ gap: "10px" }}
              >
                <Col>
                  <Button onClick={Confirm.handleClearAllConfirm}>
                    Clear all Data
                  </Button>
                </Col>
                <Col>
                  <Button>
                    Download
                    <DownloadOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ height: "calc(100% - 90px)" }}>
            {editMap && (
              <Form
                form={userForm}
                autoComplete="off"
                onFinish={onFinish}
                initialValues={{
                  remember: true,
                  "user-info": editMap?.records,
                  clientName: editMap.clientName,
                  creatorName: editMap.creatorName,
                  creationTime: editMap.creationTime,
                }}
                className="h-full w-full flex flex-col justify-between"
              >
                <Row
                  style={{
                    maxHeight: "60%",
                    width: "100%",
                    overflowY: "auto",
                  }}
                >
                  <Form.List name="user-info" key={Math.random()}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => {
                          return (
                            <Form.Item
                              key={key}
                              {...restField}
                              style={{ width: "100%" }}
                            >
                              <Col span={24} style={{ overflow: "hidden" }}>
                                <Row style={{ position: "relative" }}>
                                  <GridView
                                    data={editMap?.records[key]}
                                    events={events?.length && events}
                                    settings={editMap?.records[key]?.settings}
                                    fieldKey={name}
                                    handleSelectDob={
                                      HandleUserChange.handleSelectDob
                                    }
                                    handleSelectGender={
                                      HandleUserChange.handleSelectGender
                                    }
                                  />
                                  {key === 0 ? (
                                    " "
                                  ) : (
                                    <MinusCircleOutlined
                                      onClick={() => {
                                        Confirm.handleDeleteConfirm({
                                          userId: name,
                                          callBack: remove,
                                          formListId: name,
                                        });
                                      }}
                                      style={{
                                        position: "absolute",
                                        right: "2px",
                                        top: "42%",
                                      }}
                                    />
                                  )}
                                </Row>
                              </Col>
                            </Form.Item>
                          );
                        })}
                        <Form.Item
                          style={{
                            visibility: "hidden",
                            maxHeight: "0",
                            margin: "0",
                          }}
                        >
                          <Button
                            style={{ visibility: "hidden", maxHeight: "0" }}
                            id="add-btn"
                            type="dashed"
                            onClick={() => {
                              onAddRecord();
                              add();
                            }}
                            block
                            icon={<PlusCircleOutlined />}
                          ></Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item
                    style={{
                      visibility: "hidden",
                      maxHeight: "0",
                      margin: "0",
                    }}
                  >
                    <Button
                      id="finish-form"
                      style={{ visibility: "hidden", maxHeight: "0" }}
                      htmlType="submit"
                    ></Button>
                  </Form.Item>
                </Row>
                <Row>
                  <Col span={24} className="flex justify-end items-center">
                    <SaveAndAdd />
                  </Col>
                  <Footer />
                </Row>
              </Form>
            )}
          </Row>
        </Col>
        <ToastContainer position="top-right" />
      </>
    );
  })
);

export default withRouter(Detail);
