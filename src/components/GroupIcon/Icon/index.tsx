import React from "react";
interface IIconProps {
  id: string;
  title: string;
  imageSrc: string;
  onClick?: any;
}

const Icon = (props: IIconProps) => {
  const { title, imageSrc } = props;
  return (
    <div
      className="flex justify-start items-center"
      style={{ flexBasis: "20%", gap: "0 5px" }}
    >
      <span
        className="flex items-center"
        style={{ width: "18px", borderRadius: "9999px" }}
      >
        <img src={require(`../../../assets/categories/${imageSrc}`)} />
      </span>
      <span className="flex items-center" style={{ fontSize: "10px" }}>
        {title}
      </span>
    </div>
  );
};

export default Icon;
