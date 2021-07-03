import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log("Form Submited", data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={logedInUser.name}
        {...register("name", { required: true })}
        placeholder="Enter Name"
      />
      {errors.name && <span className="error">Name is required</span>}
      <input
        defaultValue={logedInUser.email}
        {...register("email", { required: true })}
        placeholder="Enter Email"
      />
      {errors.email && <span className="error">Email is required</span>}
      <input
        {...register("address", { required: true })}
        placeholder="Enter Address"
      />
      {errors.address && <span className="error">Address is required</span>}
      <input
        {...register("phone", { required: true })}
        placeholder="Enter Phone Number"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
