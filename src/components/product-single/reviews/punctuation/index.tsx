import Rater from "react-rater";

import type { PunctuationType } from "@/types";

const Punctuation = ({
  votes,
  punctuation,
  countOpinions,
}: PunctuationType) => {
  const percentageBar = (count: number) => {
    if (countOpinions === 0) return 0; // Avoid division by zero
    return (count * 100) / countOpinions;
  };

  return (
    <section className="product-punctuation">
      <div className="product-punctuation__values">
        <h3>{punctuation}</h3>
        <Rater total={5} interactive={false} rating={punctuation} />
        <p>
          <i className="icon-avatar" />
          {countOpinions} all opinions
        </p>
      </div>

      <div className="product-punctuation__rates">
        <ul className="punctuations-lists">
          {votes.map((vote) => (
            <li key={vote.value} className="punctuation-item"> {/* Use vote.value as key if count can be zero */}
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
        {/* This button currently has no onClick handler, leaving as is. If it needs client interaction,
            this part might need to be a client component passed as a prop, or the whole component
            could become client, but it's not necessary based on the current code. */}
        <button type="button" className="btn btn--rounded btn--yellow">
          Add opinion
        </button>
      </div>
    </section>
  );
};

export default Punctuation;