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

  return <>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link to={"/cart"} className="p-2 glass-card hover:glow-on-hover animate-smooth">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </Link>
          </div>

          {/* progress step */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {/* step 01 */}
              <div className={`flex items-center space-x-2 ${orderStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 1 ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}>
                  {orderStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                </div>
                <span className="font-medium">Details</span>
              </div>

              <div className={`w-12 h-0 ${orderStep >= 2 ? "bg-primary" : "bg-border"}`} />

              {/* step 02 */}
              <div className={`flex items-center space-x-2 ${orderStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${orderStep >= 2 ? "gradient-primary text-primary-foreground" : "bg-secondary"}`}>
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* form section */}
            <div className="lg:col-span-2">
              {orderStep === 1 ? (
                // step 01: user details
                <form onSubmit={handlePlaceOrder} className="glass-panel">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Shipping Information
                  </h2>
                  <div className="mb-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input type="text"
                        required
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid">
                    
                  </div>
                </form>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Payment;
