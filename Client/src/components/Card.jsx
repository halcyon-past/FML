import "./Card.css"
import propTypes from 'prop-types';

function Card(props) {

    const { data, onDataReceived } = props;

    const handleClick = () => {
        onDataReceived(data);
      };

  return (
    <div className="card">
        <img onClick={handleClick} src={data.poster} alt={data.movie_name} />
        <h1 onClick={handleClick} >{data.movie_name}</h1>
    </div>
  )
}

Card.propTypes = {
    data: propTypes.object.isRequired,
    onDataReceived: propTypes.func.isRequired,
};



export default Card