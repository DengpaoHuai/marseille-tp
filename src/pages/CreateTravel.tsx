import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  date: string;
};

const CreateTravel = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
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

  console.log(register("name"));

  return (
    <div>
      <h1>Create Travel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <input type="date" {...register("date")} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTravel;
