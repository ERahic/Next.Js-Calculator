import "./Screen.css";

type Props = {
  value: string;
  className: string;
};

const Screen = (props: Props) => {
  return <div className={props.className}>{props.value}</div>;
};

export default Screen;
