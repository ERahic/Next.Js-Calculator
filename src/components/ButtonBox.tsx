import { ReactNode } from "react";
import "./ButtonBox.css";

type Props = {
  children: ReactNode;
  className: string;
};

const ButtonBox = (props: Props) => {
  return <div className="buttonBox">{props.children}</div>;
};

export default ButtonBox;
