import "./index.css";
import React, { useEffect } from "react";
import { Col, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import Filter from "@/components/Filter";
import withRouter from "@/components/Layout/Router/withRouter";
import TableView from "@/components/Table";
import MapStore from "@/stores/mapStore";
import Stores from "@/stores/storeIdentifier";
interface IProps {
  navigate: any;
  mapStore: MapStore;
}

const confirm = Modal.confirm;
const Home = inject(Stores.MapStore)(
  observer((props: IProps) => {
    const { maps } = props.mapStore;
    const [form] = useForm();
    useEffect(() => {
      initData();
    }, []);
    console.log(maps);

    const initData = async () => {
      await props.mapStore.getAllAsync();
    };
    const handleConfirmDeleteMap = (id: string) => {
      confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Delete this map?",
        okText: "OK",
        cancelText: "CANCEL",
        onOk: () => {
          props.mapStore.deleteMap(id);
        },
      });
    };
    const onFinish = async (values: any) => {
      const fromDate = values.from
        ? moment(values.from).format("YYYY-MM-DDTHH:mm:ss")
        : "";
      await props.mapStore.getMaps(values.query, fromDate);
    };

    return (
      <Col className="wrapper h-full">
        <Filter form={form} onSubmit={onFinish} />
        <TableView
          data={maps?.items}
          handleDeleteMap={handleConfirmDeleteMap}
        />
      </Col>
    );
  })
);

export default withRouter(Home);
