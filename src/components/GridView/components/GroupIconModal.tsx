import GroupIcons from "@/components/GroupIcon";
import { Modal } from "antd";

import React from "react";

interface IProps {
  visible: boolean;
  onClose?: any;
  handleUserSelect?: any;
  userId?: number;
  userAge?: number;
  events?: any;
  selectedEvents?: any;
}
const GroupIconModal = (props: IProps) => {
  return (
    <Modal open={props.visible} onCancel={props.onClose} footer={null}>
      <GroupIcons
        visible={props.visible}
        showRadio={true}
        handleUserSelect={props.handleUserSelect}
        userId={props.userId}
        userAge={props.userAge}
        events={props?.events}
        selectedEvents={props.selectedEvents}
      />
    </Modal>
  );
};

export default GroupIconModal;
