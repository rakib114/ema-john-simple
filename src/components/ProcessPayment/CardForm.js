import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardForm = ({ handlePayment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
        } else {
            setPaymentError(null);
            console.log('[PaymentMethod]', paymentMethod);
            handlePayment(paymentMethod.id);
        }
    };

    return (
        <div>
            <h2>Please Paye</h2>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                paymentError && <h4 style={{ color: 'red', padding: '10px', margin: '10px' }}> {paymentError} </h4>
            }
        </div>
    );
};

export default CardForm;