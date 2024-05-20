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
    <button className={prop.className} onClick={btnPress}>
      {prop.value}
    </button>
  );
};

export default Button;
