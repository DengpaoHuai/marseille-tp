import { SubmitHandler, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Travel } from "../contexts/TravelContextProvider";

const CreateTravel = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async (data: Omit<Travel, "_id">) => {
      const response = await fetch(
        "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return await response.json();
    },
    onSettled: (newTravel) => {
      queryClient.setQueryData(["travels"], (old: Travel[]) => [
        ...old,
        newTravel,
      ]);
    },
  });

  const travelSchema = object({
    name: string().min(4).required(),
    date: string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof travelSchema>>({
    resolver: yupResolver(travelSchema),
  });

  const onSubmit: SubmitHandler<InferType<typeof travelSchema>> = (data) => {
    mutate.mutate(data);
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
