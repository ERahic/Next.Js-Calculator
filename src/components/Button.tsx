import "./Button.css";

type Props = {
  value: string;
  onClick?: any;
  className: string;
  isActive: boolean;
};

const Button = (prop: Props) => {
  const btnPress = () => {
    prop.onClick(prop.value);
  };

  return (
    <div
      className={`${prop.className} ${prop.isActive ? "active" : ""}`}
      onClick={btnPress}
    >
      {prop.value}
    </div>
  );
};

export default Button;
