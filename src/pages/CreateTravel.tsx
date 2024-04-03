import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InferType, date, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { TravelContext } from "../contexts/TravelContextProvider";

const CreateTravel = () => {
  const data = useContext(TravelContext);

  console.log(data);

  const navigate = useNavigate();
  const travelSchema = object({
    name: string().min(4).required(),
    date: date().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof travelSchema>>({
    resolver: yupResolver(travelSchema),
  });

  const onSubmit: SubmitHandler<InferType<typeof travelSchema>> = (data) => {
    fetch("https://crudcrud.com/api/dd4cdbda378341509e40b77fa154939f/travels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("ok");
      navigate("/list_travels");
    });
  };

  console.log(errors);

  return (
    <div>
      <h1>Create Travel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input type="date" {...register("date")} />
        <button type="submit">Create</button>
        {errors.name && <p>{errors.name.message}</p>}
      </form>
    </div>
  );
};

export default CreateTravel;
