import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../store/slices/cartSlice";
import { toggleCart } from "../../store/slices/popupSlice";

const CartSidebar = () => {
  const dispatch = useDispatch()
  const { isCartOpen } = useSelector(state => state.popup)
  const { cart } = useSelector(state => state.cart)

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateCartQuantity({ id, quantity }))
    }
  }

  let total = 0;
  if (cart) {
    total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }
  if (!isCartOpen) return null
  return <>
    {/* overlay */}
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => dispatch(toggleCart())} />
    {/* cart side bar */}
    <div className="fixed right-0 top-0 h-full w-96 z-50 glass-panel animate-slide-in-right overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-[hsla(var(--glass-border))]">
        <h2 className="text-xl font-semibold text-primary">Shopping Cart</h2>
        <button onClick={() => dispatch(toggleCart())} className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth">
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>
      <div className="p-6">
        {
          cart && cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link to={"/products"} onClick={() => dispatch(toggleCart())} className="inline-block mt-4 px-6 py-2 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth">Browse Products</Link>
            </div>
          ) : (
            <>
              {/* cart items */}
              <div className="space-y-4 mb-6">
                {
                  cart && cart.map(item => {
                    return (
                      <div key={item.product.id} className="glass-card p-4">
                        {/* update item layout to start */}
                        <div className="flex items-start space-x-4">
                          <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{item.product.name}</h3>
                            <p className="text-primary font-semibold">${item.product.price}</p>
                            {/* quantity controls */}
                            <div className="flex items-center space-x-2 mt-2">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity === 1} className="p-1 rounded glass-card hover:glow-on-hover animate-smooth">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded glass-card hover:glow-on-hover animate-smooth">
                                <Plus className="w-4 h-4" />
                              </button>
                              <button onClick={() => dispatch(removeFromCart(item.product.id))} className="p-1 rounded glass-card hover:glow-on-hover animate-smooth ml-2 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {/* total */}
              <div className="border-t border-[hsla(var(--glass-border))] pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
                <Link to={"/cart"} onClick={() => dispatch(toggleCart())} className="w-full py-3 block text-center gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold">View Cart & Checkout</Link>
              </div>
            </>
          )
        }
      </div>
    </div>
  </>;
};

export default CartSidebar;
