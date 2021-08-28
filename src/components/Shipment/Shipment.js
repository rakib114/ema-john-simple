import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const [shippingData, setShippingData] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setShippingData(data);
  }

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...logedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date()
    };

    fetch('https://enigmatic-garden-61574.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully');
        }
      })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
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
      </div>
      <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
        <ProcessPayment handlePayment={handlePaymentSuccess} ></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;
