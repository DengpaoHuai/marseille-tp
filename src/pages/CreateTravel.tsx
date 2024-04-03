import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InferType, date, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Travel, TravelContext } from "../contexts/TravelContextProvider";

const travelSchema = object({
  name: string().min(4).required(),
  date: string().required(),
});

const CreateTravel = () => {
  const { addTravel } = useContext(TravelContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Travel, "_id">>({
    resolver: yupResolver(travelSchema),
  });

  const onSubmit: SubmitHandler<Omit<Travel, "_id">> = async (data) => {
    await addTravel(data);
    navigate("/list_travels");
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
