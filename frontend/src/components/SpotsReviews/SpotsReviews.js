import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews, deleteReview } from '../../store/reviews'
import ReviewForm from "../ReviewForm";
import './SpotsReviews.css'

const SpotsReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const {id} = useParams();
  const spot = useSelector((state) => state.spots[id])
  console.log(spot, 'spot')
  // const reviews = useSelector((state) => {

  //   if (!spot.reviews) return null;
  //   // console.log(spot.reviews)
  //   return state.reviews.map(reviewId => state.reviews[reviewId]);
  // });
  const reviews = useSelector((state) => state.reviews )

  // console.log(reviews)

  

  // const filteredReviews = Object.values(reviews).filter(review => review !== null)

  // console.log(filteredReviews)

  const user = useSelector(state => {
    if (state.session.user) {
      return state.session.user
    }
  })

  // const reviewss = useSelector(state => {

  //   }
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews(spot.id));
  }, [dispatch, spot.id]);
  let userName;

  return (
    <>
      <button className="chatIcon" onClick={() => setShowReviewForm(true)}>
        <p>Write a review...</p>
      </button>
      {showReviewForm ? (
        <ReviewForm spot={spot} setShowReviewForm={setShowReviewForm} />
      ) : ''}
      <h5>Reviews</h5>

      {Object.values(reviews).map(review => (
        <>
          {review ? (
            <>
              <div className="comment-header">
                
                {review.userId === user.id ? userName = user.username : ''}
                
              </div>
              <div className="comment-content">{review.comment}
                {user.id === review.userId ? (
                  <>

                    <button className="delete-btn" onClick={async () => {
                      await dispatch(deleteReview(review.id, spot.id))
                    }}>
                      <img src="https://img.icons8.com/material-outlined/24/undefined/trash--v1.png" alt="delete" />
                    </button>
                  </>
                ) : ''}
              </div>
            </>
          ) : ''}

        </>
      ))
      }
    </>
  )
}

export default SpotsReviews;