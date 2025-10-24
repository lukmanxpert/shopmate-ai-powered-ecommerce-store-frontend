import { Search, Sparkles, Star, Filter } from "lucide-react";
import { categories } from "../data/products";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/Products/Pagination";
import AISearchModal from "../components/Products/AISearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../store/slices/productSlice";

const Products = () => {
  const { products, totalProducts } = useSelector(state => state.product)
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  const query = useQuery()
  const searchTerm = query.get("search")
  const searchedCategory = query.get("category")

  const [searchQuery, setSearchQuery] = useState(searchTerm || "")
  const [selectedCategory, setSelectedCategory] = useState(
    searchedCategory || ""
  )
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedRating, setSelectedRating] = useState(0)
  const [availability, setAvailability] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts({
      category: selectedCategory,
      price: `${priceRange[0]}-${priceRange[1]}`,
      search: searchQuery,
      ratings: selectedRating,
      availability: availability,
      page: currentPage
    }))
  }, [dispatch, selectedCategory, priceRange, searchQuery, selectedRating, availability, currentPage])

  const totalPages = Math.ceil(totalProducts / 10)

  return <>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* mobile filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden mb-4 p-3 glass-card hover:glow-on-hover animate-smooth flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default Products;
