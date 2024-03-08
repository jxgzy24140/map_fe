import React from "react";
interface IProps {
  onOpenModal?: () => void;
  imageSrc?: string;
  isConfig?: boolean;
  isRetire?: boolean;
  onSetAge?: any;
}
const WhiteCell = (props: IProps) => {
  if (props.isRetire) {
    return (
      <div
        style={{
          width: "28px",
          height: "28px",
          margin: "1px",
          backgroundColor: "#FFF",
          display: "inline-block",
          border: "1px solid",
        }}
      ></div>
    );
  }
  if (props.imageSrc) {
    return props.isConfig ? (
      <div
        style={{
          width: "28px",
          height: "28px",
          margin: "1px",
          backgroundColor: "#fff",
          display: "inline-block",
          border: "1px solid",
          position: "relative",
        }}
      >
        <div
          className="flex justify-center items-center"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "9999px",
            backgroundColor: "#FFF",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={require(`../../../assets/settings/${props.imageSrc}`)} />
        </div>
      </div>
    ) : (
      <div
        onClick={props.onOpenModal}
        style={{
          width: "28px",
          height: "28px",
          margin: "1px",
          backgroundColor: "#fff",
          display: "inline-block",
          border: "1px solid",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          className="flex justify-center items-center"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "9999px",
            backgroundColor: "#FFF",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={require(`../../../assets/categories/${props.imageSrc}`)} />
        </div>
      </div>
    );
  }
  return props.onOpenModal ? (
    <div
      onClick={props.onOpenModal}
      style={{
        width: "28px",
        height: "28px",
        margin: "1px",
        backgroundColor: "#FFF",
        display: "inline-block",
        border: "1px solid",
        cursor: "pointer",
      }}
    ></div>
  ) : (
    <div
      style={{
        width: "28px",
        height: "28px",
        margin: "1px",
        backgroundColor: "#FFF",
        display: "inline-block",
        border: "1px solid",
      }}
    ></div>
  );
};

export default WhiteCell;
