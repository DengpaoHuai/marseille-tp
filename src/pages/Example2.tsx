import { useParams } from "react-router-dom";

const Example2 = () => {
  const { id, second } = useParams();

  return (
    <div>
      <h1>
        Example {id} - {second}
      </h1>
    </div>
  );
};

export default Example2;
