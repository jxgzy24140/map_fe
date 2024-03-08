import React from "react";
import { Col, Row, Table, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import withRouter from "@/components/Layout/Router/withRouter";
import { AppLayouts } from "@/components/Layout/Router/router.config";
import MapStore from "@/stores/mapStore";

interface IProps {
  navigate: any;
  data: any;
  mapStore: MapStore;
  handleDeleteMap: (id: number) => void;
}
const TableView = (props: IProps) => {
  const style = {
    flexFlow: "unset"!,
  };
  const columns = [
    {
      title: () => <p className="text-center">Client name</p>,
      dataIndex: "clientName",
      render: (clientName, item) => {
        return (
          <>
            <Row style={style} className="flex justify-between">
              <Col className="text-left">{clientName}</Col>
              <div
                className="px-2 py-2 rounded"
                style={{ backgroundColor: "#E8E7E7" }}
              >
                <Col>
                  <Dropdown
                    trigger={["click"]}
                    overlay={
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            props.navigate(
                              AppLayouts.detailPage.path.replace(":id", item.id)
                            )
                          }
                        >
                          EDIT
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => props.handleDeleteMap(item.id)}
                        >
                          DELETE
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomLeft"
                  >
                    <EllipsisOutlined />
                  </Dropdown>
                </Col>
              </div>
            </Row>
          </>
        );
      },
    },
    {
      title: () => <p className="text-center">Number Of Family's Member</p>,
      dataIndex: "numsOfMember",
      render: (total) => {
        return <p className="text-center">{total}</p>;
      },
    },
    {
      title: "Object",
      dataIndex: "objectTitle",
    },
    {
      title: "Create By",
      dataIndex: "creatorName",
    },
    {
      title: "Created Date",
      dataIndex: "creationTime",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey={(item) => item.id}
      size="middle"
      className="table-grid-view"
    />
  );
};
export default withRouter(TableView);
