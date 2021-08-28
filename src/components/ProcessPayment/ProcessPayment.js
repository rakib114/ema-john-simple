import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('sk_test_51JOmLiLLRerSYOophdkh38lS1pslCDWs26xRUOHPlSxmJWDWD4xQEYp3IVE5NaIpZ0NSfdKQpi8DDTVp0l7i70Tl00o0071YjB');

const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <CardForm handlePayment={handlePayment} ></CardForm>
        </Elements>
    );
};

export default ProcessPayment;