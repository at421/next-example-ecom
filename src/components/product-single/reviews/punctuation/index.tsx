import Rater from "react-rater";

import type { PunctuationType } from "@/types";

const Punctuation = ({
  votes,
  punctuation,
  countOpinions,
}: PunctuationType) => {
  const percentageBar = (count: number) => {
    return (count * 100) / countOpinions;
  };

  return (
    <section className="product-punctuation">
      <div className="product-punctuation__values">
        <h3>{punctuation}</h3>
        {/* Rater is a client component, but it's used here in a Server Component.
            This is fine because Rater doesn't rely on server-side data or context
            passed directly from the parent Server Component in a way that breaks SSR.
            It will render its static HTML on the server and hydrate on the client.
            If Rater needed props that were specific server-fetched objects/functions,
            it might need to be wrapped in a client component boundary.
            In this case, the props (total, interactive, rating) are simple types. */}
        <Rater total={5} interactive={false} rating={punctuation} />
        <p>
          <i className="icon-avatar" />
          {countOpinions} all opinions
        </p>
      </div>

      <div className="product-punctuation__rates">
        <ul className="punctuations-lists">
          {votes.map((vote) => (
            <li key={vote.count} className="punctuation-item">
              <Rater total={1} interactive={false} rating={1} />
              <span>{vote.value}</span>
              <div className="punctuation-item__bar">
                <div
                  style={{ width: `${percentageBar(vote.count)}%` }}
                  className="punctuation-item__bar__current"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="punctuation-btn-wrapper">
        {/* Note: If this button had client-side interaction (e.g., opening a modal with useState),
            this component would need to be marked as 'use client', or the button and its logic
            would need to be extracted into a separate client component. */}
        <button type="button" className="btn btn--rounded btn--yellow">
          Add opinion
        </button>
      </div>
    </section>
  );
};

export default Punctuation;