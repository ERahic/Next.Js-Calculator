import "./Screen.css";

type Props = {
  value: string;
  className: string;
};

const Screen = (props: Props) => {
  return <div className="screen">{props.value}</div>;
};

export default Screen;
