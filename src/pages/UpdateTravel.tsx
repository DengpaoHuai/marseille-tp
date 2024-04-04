import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { InferType, date, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Travel, TravelContext } from "../contexts/TravelContextProvider";

const travelSchema = object({
  name: string().min(4).required(),
  date: string().required(),
});

const UpdateTravel = () => {
  const data = useLoaderData() as Travel;
  const { id } = useParams();
  const { updateTravelById } = useContext(TravelContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Travel, "_id">>({
    defaultValues: {
      name: data.name,
      date: data.date,
    },
    resolver: yupResolver(travelSchema),
  });

  const onSubmit: SubmitHandler<Omit<Travel, "_id">> = async (data) => {
    if (!id) return;
    await updateTravelById(id, data);
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

export default UpdateTravel;
