import Rater from "react-rater";
import Image from 'next/image';

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
            <Image src={review.avatar} alt="avatar" width={40} height={40} />
          </div>

          <div className="review__content">
            <h3>{review.name}</h3>
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