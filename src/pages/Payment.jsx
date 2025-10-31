import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const { authUser } = useSelector(state => state.auth)
  const navigateTo = useNavigate();
  const [stripePromise, setStripePromise] = useState(null)

  if (!authUser) return navigateTo("/products")

  return <></>;
};

export default Payment;
