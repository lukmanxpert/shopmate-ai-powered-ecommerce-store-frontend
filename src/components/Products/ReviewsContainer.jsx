import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/slices/productSlice";

const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector(state => state.auth)
  const { isReviewDeleting, isPostingReview } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("rating", rating)
    data.append("comment", comment)
    dispatch(postReview({ productId: product.id, review: data }))
  }
  return <></>;
};

export default ReviewsContainer;
