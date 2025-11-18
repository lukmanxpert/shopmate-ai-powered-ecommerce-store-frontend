import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../store/slices/orderSlice";

const Payment = () => {
  const { authUser } = useSelector(state => state.auth)
  const navigateTo = useNavigate();

  const [stripePromise, setStripePromise] = useState(null)
  useEffect(() => {
    loadStripe(import.meta.env.VITE_STRIPE_FRONTEND_KEY).then((stripe) => setStripePromise(stripe)).catch(err => console.log(err))
  }, [])

  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const { orderStep } = useSelector(state => state.order)
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    state: "Dhaka",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Bangladesh"
  })

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  let totalWithTax = total + total * 0.18

  if (total > 50) {
    totalWithTax += 2;
  }


  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("full_name", shippingDetails.fullName)
    formData.append("state", shippingDetails.state)
    formData.append("city", shippingDetails.city)
    formData.append("country", shippingDetails.country)
    formData.append("address", shippingDetails.address)
    formData.append("pincode", shippingDetails.zipCode)
    formData.append("phone", shippingDetails.phone)
    formData.append("orderedItems", JSON.stringify(cart))

    dispatch(placeOrder(formData))
  }

  if (!authUser) return navigateTo("/products")

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center glass-panel max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-4">No Items in Cart.</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart before processing to checkout.</p>
          <Link to={"/products"} className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-primary-foreground gradient-primary hover:glow-on-hover animate-smooth font-semibold">
            Brows Products
          </Link>
        </div>
      </div>
    )
  }

  return <></>;
};

export default Payment;
