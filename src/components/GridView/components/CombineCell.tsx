import React from "react";
interface IProps {
  age?: number;
  imageSrc?: string;
  onSetAge?: any;
}

const CombineCell = (props: IProps) => {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        margin: "1px",
        backgroundColor: "rgba(68, 53, 13, 0.15)",
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
        {props.age && (
          <span
            style={{
              textAlign: "center",
              fontFamily: "Montserrat",
              fontWeight: "700",
              fontSize: "10px",
            }}
          >
            {props.age}
          </span>
        )}
      </div>
    </div>
  );
};

export default CombineCell;
