'use client';

import Rater from "react-rater";
import "react-rater/lib/react-rater.css"; // Assuming the rater library needs its CSS

import type { ReviewType } from "@/types";
import createMarkup from "@/utils/markup";

type ReviewsListType = {
  reviews: ReviewType[];
};

const ReviewsList = ({ reviews }: ReviewsListType) => {
  return (
    <section className="reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review__avatar">
            {/* Assuming review.avatar is a valid image URL or path */}
            <img src={review.avatar} alt={`${review.name}'s avatar`} />
          </div>

          <div className="review__content">
            <h3>{review.name}</h3>
            {/* Rater is a client component, requires 'use client' */}
            <Rater total={5} interactive={false} rating={review.punctuation} />
            <div
              className="review__comment"
              dangerouslySetInnerHTML={createMarkup(review.description)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewsList;