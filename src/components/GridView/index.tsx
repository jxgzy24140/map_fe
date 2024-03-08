import { Row, Col, Input, Select, DatePicker, Form } from "antd";
import React, { useState } from "react";
import GroupIconModal from "./components/GroupIconModal";
import GreyCell from "./components/GreyCell";
import WhiteCell from "./components/WhiteCell";
import CombineCell from "./components/CombineCell";
import { inject, observer } from "mobx-react";
import Stores from "@/stores/storeIdentifier";
import MapStore from "@/stores/mapStore";

const keyOfPoint = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
const numOfRows = 3;
const numOfSquare = 65;
const genderOptions = [
  { value: 0, label: "Male" },
  { value: 1, label: "FeMale" },
];
let currentAge = 0;
interface IProps {
  data?: any;
  settings?: any;
  events?: any;
  mapStore?: MapStore;
  clientInfo?: any;
  fieldKey?: any;
  handleSelectDob: (value, userId) => void;
  handleSelectGender: (userId: number, gender: number) => void;
}

const GridView = inject(Stores.MapStore)(
  observer((props: IProps) => {
    const { data, settings, events } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    console.log("data: ", data);

    const calculateAge = (birthDateStr: string): number => {
      const now = new Date();
      const birthDate = new Date(birthDateStr);
      const difference = now.getTime() - birthDate.getTime();
      const ageDate = new Date(difference);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age;
    };

    const showModal = (): void => {
      setIsModalOpen(true);
    };

    const closeModal = (): void => {
      setIsModalOpen(false);
    };

    const handleUserSelect = (age: number, eventId: string) => {
      console.log("currentAge: ", currentAge, age, eventId);

      if (currentAge && currentAge > 0) {
        let events = data.events.find(
          (item) => item.age === age && item.id === eventId
        );
        if (events) {
          data.events = data.events.filter((item) => {
            return item !== events;
          });
          return setIsModalOpen(false);
        }
        events = data.events.find((item) => item.age === age);
        if (!events) {
          data.events.push({
            age: age,
            id: eventId,
          });
          return setIsModalOpen(false);
        }
        if (events) {
          data.events = data.events.map((item) => {
            if (item.age === age) {
              item.id = eventId;
            }
            return item;
          });
          return setIsModalOpen(false);
        }
      }
      return setIsModalOpen(false);
    };

    const isValidAge = (age: any, gender: any) => {
      const retire = settings?.find((c) => c.name === "Retirement");
      if (
        (age <= retire.ageOfMale && gender === 0) ||
        (age <= retire.ageOfFemale && gender === 1)
      ) {
        return true;
      }
      return false;
    };

    const isShowAge = (jIndex: number) => {
      if (keyOfPoint.includes(jIndex)) {
        return true;
      }
      return false;
    };

    const getEvent = (userEvents: any, currentAge: number): any => {
      for (let i = 0; i < events?.length; i++) {
        for (let j = 0; j < userEvents?.length; j++) {
          if (
            userEvents[j].age === currentAge &&
            userEvents[j].id === events[i].id
          ) {
            return events[i];
          }
        }
      }
    };

    const checkSettings = {
      isPri: (age: number, gender: number) => {
        const pri = settings.find((c) => c.name === "Pri 1");
        if (
          (age === pri.ageOfMale && gender === 0) ||
          (age === pri.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      isSec: (age: number, gender: number) => {
        const sec = settings.find((c) => c.name === "Sec");
        if (
          (age === sec.ageOfMale && gender === 0) ||
          (age === sec.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      isCollege: (age: number, gender: number) => {
        const coll = settings.find((c) => c.name === "Junior College");
        if (
          (age === coll.ageOfMale && gender === 0) ||
          (age === coll.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      isNationalService: (age: number, gender: number) => {
        const nal = settings.find((c) => c.name === "National Service");
        if (
          (age === nal.ageOfMale && gender === 0) ||
          (age === nal.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      isUniversity: (age: number, gender: number) => {
        const univ = settings.find((c) => c.name === "University");
        if (
          (age === univ.ageOfMale && gender === 0) ||
          (age === univ.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      isRetire: (age: any, gender: number) => {
        const entity = settings.find((c) => c.name === "Retirement");
        if (
          (age === entity.ageOfMale && gender === 0) ||
          (age === entity.ageOfFemale && gender === 1)
        ) {
          return true;
        }
        return false;
      },
      getIcon: (age: any, gender: number) => {
        console.log("getIcon", age, gender);
        if (checkSettings.isPri(age, gender)) {
          const entity = settings.find((c) => c.name === "Pri 1");
          return entity;
        }
        if (checkSettings.isSec(age, gender)) {
          const entity = settings.find((c) => c.name === "Sec");
          return entity;
        }
        if (checkSettings.isCollege(age, gender)) {
          const entity = settings.find((c) => c.name === "Junior College");
          return entity;
        }
        if (checkSettings.isNationalService(age, gender)) {
          const entity = settings.find((c) => c.name === "National Service");
          return entity;
        }
        if (checkSettings.isUniversity(age, gender)) {
          const entity = settings.find((c) => c.name === "University");
          return entity;
        }
        if (checkSettings.isRetire(age, gender)) {
          const entity = settings.find((c) => c.name === "Retirement");
          return entity;
        }
        return null;
      },
    };

    const UserInputForm = () => {
      return (
        <Col span={4} className="flex flex-col justify-around pr-1">
          <div className="flex justify-start items-center">
            <span style={{ display: "inline-block", width: "25%" }}>
              Client
            </span>
            <div
              style={{
                height: "32px",
              }}
              className="w-3/4"
            >
              <div style={{ marginBottom: "0" }}>
                <Form.Item
                  name={[props.fieldKey, "name"]}
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input key={Math.random()} placeholder="Enter user name..." />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <span style={{ display: "inline-block", width: "25%" }}>DOB</span>
            <div
              style={{
                height: "32px",
              }}
              className="w-3/4"
            >
              <Form.Item
                name={[props.fieldKey, "dob"]}
                rules={[{ required: true, message: "Please input your dob!" }]}
              >
                <DatePicker
                  onChange={(date, dateString) =>
                    props.handleSelectDob(props.data.id, dateString)
                  }
                  className="w-full"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <span style={{ display: "inline-block", width: "25%" }}>
              Gender
            </span>
            <div
              style={{
                height: "32px",
              }}
              className="w-3/4"
            >
              <Form.Item name={[props.fieldKey, "gender"]}>
                <Select
                  key={Math.random()}
                  onChange={(e) => {
                    props.handleSelectGender(data.id, e);
                  }}
                  defaultValue={0}
                  options={genderOptions}
                  style={{ boxShadow: "none!important" }}
                />
              </Form.Item>
            </div>
          </div>
        </Col>
      );
    };

    return (
      <>
        <Row
          className="w-100 grid-table"
          style={{
            backgroundColor: "#FFF",
            padding: "10px 20px",
          }}
        >
          <UserInputForm />
          <Col
            span={20}
            className="overflow-y-auto pl-1"
            style={{ overflowX: "unset" }}
          >
            <Row style={{ width: "200%" }}>
              {[...Array(numOfRows)].map((i: any, iIndex: number) => {
                return (
                  <Row key={Math.random()} style={{ height: "calc(100% / 3)" }}>
                    {[...Array(numOfSquare)].map((j: any, jIndex: number) => {
                      if (!data) {
                        if (iIndex === 0) {
                          return isShowAge(jIndex) ? (
                            <GreyCell key={Math.random()} />
                          ) : (
                            <WhiteCell key={Math.random()} />
                          );
                        }
                        if (iIndex === 1) {
                          return isShowAge(jIndex) ? (
                            <CombineCell key={Math.random()} />
                          ) : (
                            <GreyCell key={Math.random()} />
                          );
                        }
                        if (iIndex === 2) {
                          return isShowAge(jIndex) ? (
                            <div
                              key={Math.random()}
                              onClick={() =>
                                (currentAge = calculateAge(data.dob) + jIndex)
                              }
                            >
                              <GreyCell onOpenModal={showModal} />
                            </div>
                          ) : (
                            <div
                              key={Math.random()}
                              onClick={() =>
                                (currentAge = calculateAge(data.dob) + jIndex)
                              }
                            >
                              <WhiteCell
                                key={Math.random()}
                                onOpenModal={showModal}
                              />
                            </div>
                          );
                        }
                      } else {
                        const age = calculateAge(data.dob) + jIndex;
                        if (iIndex === 0) {
                          return isShowAge(jIndex) ? (
                            <GreyCell key={Math.random()} />
                          ) : (
                            <WhiteCell key={Math.random()} />
                          );
                        }
                        if (iIndex === 1) {
                          if (isValidAge(age, data.gender)) {
                            const retriveConfig = checkSettings.getIcon(
                              age,
                              data.gender
                            );
                            const event = getEvent(data.events, age);
                            if (isShowAge(jIndex) || retriveConfig || event) {
                              console.log(age, data.gender);
                              return (
                                <CombineCell key={Math.random()} age={age} />
                              );
                            } else {
                              return <GreyCell key={Math.random()} />;
                            }
                          } else {
                            return isShowAge(jIndex) ? (
                              <CombineCell key={Math.random()} />
                            ) : (
                              <GreyCell key={Math.random()} isRetire={true} />
                            );
                          }
                        }
                        if (iIndex === 2) {
                          const retriveConfig = checkSettings.getIcon(
                            age,
                            data.gender
                          );
                          const event = getEvent(data.events, age);
                          if (keyOfPoint.includes(jIndex)) {
                            if (isValidAge(age, data.gender)) {
                              return retriveConfig ? (
                                <GreyCell
                                  key={Math.random()}
                                  imageSrc={retriveConfig?.imageSrc}
                                  isConfig
                                />
                              ) : event ? (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <GreyCell
                                    key={Math.random()}
                                    onOpenModal={showModal}
                                    imageSrc={event.imageSrc}
                                    isConfig={false}
                                  />
                                </div>
                              ) : (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <GreyCell
                                    key={Math.random()}
                                    onOpenModal={showModal}
                                  />
                                </div>
                              );
                            } else {
                              return retriveConfig ? (
                                <GreyCell
                                  key={Math.random()}
                                  imageSrc={retriveConfig?.imageSrc}
                                  isConfig
                                />
                              ) : event ? (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <GreyCell
                                    key={Math.random()}
                                    imageSrc={event.imageSrc}
                                    isConfig={false}
                                  />
                                </div>
                              ) : (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <GreyCell key={Math.random()} />
                                </div>
                              );
                            }
                          } else {
                            if (isValidAge(age, data.gender)) {
                              return retriveConfig ? (
                                <WhiteCell
                                  key={Math.random()}
                                  imageSrc={retriveConfig?.imageSrc}
                                  isConfig
                                />
                              ) : event ? (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <WhiteCell
                                    key={Math.random()}
                                    onOpenModal={showModal}
                                    imageSrc={event?.imageSrc}
                                    isConfig={false}
                                  />
                                </div>
                              ) : (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <WhiteCell
                                    key={Math.random()}
                                    onOpenModal={showModal}
                                  />
                                </div>
                              );
                            } else {
                              return retriveConfig ? (
                                <WhiteCell
                                  key={Math.random()}
                                  imageSrc={retriveConfig?.imageSrc}
                                  isConfig
                                />
                              ) : event ? (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <WhiteCell
                                    key={Math.random()}
                                    imageSrc={event?.imageSrc}
                                    isConfig={false}
                                  />
                                </div>
                              ) : (
                                <div
                                  key={Math.random()}
                                  onClick={() =>
                                    (currentAge =
                                      calculateAge(data.dob) + jIndex)
                                  }
                                >
                                  <WhiteCell key={Math.random()} />
                                </div>
                              );
                            }
                          }
                        }
                      }
                      return true;
                    })}
                  </Row>
                );
              })}
            </Row>
          </Col>
          <GroupIconModal
            visible={isModalOpen}
            onClose={closeModal}
            handleUserSelect={handleUserSelect}
            userId={data?.id}
            userAge={currentAge}
            events={props?.events}
            selectedEvents={props?.data?.events}
          />
        </Row>
      </>
    );
  })
);

export default GridView;
