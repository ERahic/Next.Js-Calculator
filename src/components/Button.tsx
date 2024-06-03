import "./Button.css";

type Props = {
  value: string;
  onClick?: any;
  className: string;
};

const Button = (prop: Props) => {
  const btnPress = () => {
    prop.onClick(prop.value);
  };

  return (
    <div className={prop.className} onClick={btnPress}>
      {prop.value}
    </div>
  );
};

export default Button;
