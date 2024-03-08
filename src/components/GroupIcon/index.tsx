import { Card, Col, Radio } from "antd";
import Icon from "./Icon";
import React from "react";
interface IProps {
  visible?: boolean;
  showRadio?: boolean;
  handleUserSelect?: any;
  userId?: number;
  userAge?: number;
  events?: any;
  selectedEvents?: any;
}

const GroupIcons = (props: IProps) => {
  const handleSelect = (id: string) => {
    props.handleUserSelect(props.userAge, id);
  };

  const getDefaultSelectedEvent = (icon: any) => {
    for (let i = 0; i < props.selectedEvents.length; i++) {
      if (
        icon.id === props.selectedEvents[i].id &&
        props.userAge == props.selectedEvents[i].age
      )
        return icon.id;
    }
  };

  const SelectForm = () => {
    return (
      <Col style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {props.events?.map((icon, index) => {
          console.log(icon);

          return (
            <div
              key={index}
              style={{
                width: "auto !important",
                padding: "5px",
                display: "flex",
              }}
            >
              <Radio.Group defaultValue={getDefaultSelectedEvent(icon)}>
                <Radio.Button
                  value={icon.id}
                  className="radiobtn"
                  onClick={() => handleSelect(icon.id)}
                >
                  <Icon
                    id={icon.id}
                    title={icon.name}
                    imageSrc={icon.imageSrc}
                  />
                </Radio.Button>
              </Radio.Group>
            </div>
          );
        })}
      </Col>
    );
  };

  return (
    <Card className="flex flex-col h-full shadow-none border-none">
      <Col>
        <h1 className="text-left py-2">LEGEND</h1>
      </Col>
      {props.showRadio ? (
        <Col span={24}>
          <SelectForm />
        </Col>
      ) : (
        <Col className="flex flex-wrap justify-center gap-y-2 py-4 basis-1/5">
          {props.events?.map((icon) => {
            return (
              <Icon
                key={icon.id}
                id={icon.id}
                title={icon.name}
                imageSrc={icon.imageSrc}
              />
            );
          })}
        </Col>
      )}
    </Card>
  );
};

export default GroupIcons;
