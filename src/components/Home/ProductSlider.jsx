import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  const dispatch = useDispatch()

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  return <>
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={() => scroll("left")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 glass-card hover:glow-on-hover animate-smooth">
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {
          products.map(product => {
            return (
              <Link key={product.id} to={`/product/${product.id}`} className="flex-shrink-0 w-80 glass-card hover:glow-on-hover animate-smooth group:">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img src={product.image[0].url} alt={product.name} className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300" />

                  {/* badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {
                      new Date() - new Date(product.createdAt) < 30 * 24 * 60 * 60 * 100 && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">NEW</span>
                      )
                    }
                    {
                      product.ratings >= 4.5 && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-rose-500 text-white bg-primary text-primary-foreground text-xs font-semibold rounded">NEW</span>
                      )
                    }
                  </div>

                  {/* quick add to cart */}
                  <button onClick={(e) => handleAddToCart(product, e)} disabled={product.stock === 0} className="absolute bottom-3 right-3 p-2 glass-card hover:glow-on-hover animate-smooth opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </button>

                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  </>;
};

export default ProductSlider;
