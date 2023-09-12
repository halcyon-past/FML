import "./MoviePage.css"
import propTypes from 'prop-types';
import { useEffect, useState,useRef } from "react";

function MoviePage(props) {

  const { data } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);
  const aboutRef = useRef(null);

  const handleClick = () => {
    setIsInputFocused(false);
  };


  useEffect(() => {
      data?setIsInputFocused(true):setIsInputFocused(false);
  }, [data]);

  const handleClickOutside = (event) => {
    if (
      aboutRef.current &&
      aboutRef.current.classList.contains("active") &&
      !aboutRef.current.contains(event.target)
    ) {
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
    // Add a click event listener to handle clicks outside the "about" div
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Remove the click event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className={"about "+(data&&isInputFocused?"active":"")} ref={aboutRef}>
      <div className="fit">
      <svg onClick={handleClick} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg>
        <img src={data&&data.backdrop} alt={data&&data.movie_name} />
        <div className="cover">
          <h1>{data&&data.movie_name}</h1>
          <h2>{data&&data.releasedate}</h2>
          <p>{data&&data.overview}</p>
        </div>
      </div>
    </div>
  )
}

MoviePage.propTypes = {
    data: propTypes.object.isRequired,
};

export default MoviePage