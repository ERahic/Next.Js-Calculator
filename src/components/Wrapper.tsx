import "./Wrapper.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = (props: Props) => {
  return <div className="wrapper">{props.children}</div>;
};

export default Wrapper;
