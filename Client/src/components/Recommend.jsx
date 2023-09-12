import "./Recommend.css"
import { useEffect,useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Card from "./Card";
import MoviePage from "./MoviePage";

function Recommend(props) {

    const { selectedMovie } = props;
    const [data,setData] = useState([]);
    const [receivedData, setReceivedData] = useState(null);

    const handleDataReceived = (data) => {
      setReceivedData(data);
    };

    useEffect(() => {
      axios.get(`https://fml-lip2.onrender.com/search/${selectedMovie}`).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
          console.log(error);
      }
      );

  }, [selectedMovie]);

  return (
    <div className="container">
        <h1>{selectedMovie&&`Movies similar to`} <span>{selectedMovie}</span></h1>
        <div className="movies">
            {(data[0]!="No movie Provided")&&data.map((movie, index) => (
                <Card onDataReceived={handleDataReceived} key={index} data={movie} />
            ))}
        </div>
        <MoviePage data={receivedData}  />
    </div>
  )
}

Recommend.propTypes = {
    selectedMovie: PropTypes.string.isRequired,
};

export default Recommend