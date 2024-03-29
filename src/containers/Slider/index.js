import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {

    setIndex((indexPrev) =>
      byDateDesc && indexPrev < byDateDesc.length - 1 ? indexPrev + 1 : 0
    )

  };

  useEffect(() => {
    const Intervalle = setInterval(nextCard, 5000)
    return () => { clearInterval(Intervalle) }
  });

  const changedSlide = (indexRadio) => {
    setIndex(indexRadio);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`event-${_.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => changedSlide(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;