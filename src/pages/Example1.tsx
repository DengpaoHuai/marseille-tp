import { Link, useNavigate } from "react-router-dom";

const Example1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Example1</h1>
      <a href="/example2">vers la seconde page</a>
      <Link to="/example2">vers la seconde page</Link>
      <button onClick={() => navigate("/example2")}>Click me</button>
    </div>
  );
};

export default Example1;
