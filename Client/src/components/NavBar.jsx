import "./NavBar.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function NavBar({ onMovieClick }){

    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsInputFocused(false);
        }, 200);
    };

    const handleMovieItemClick = (index) => {
        onMovieClick(suggestions[index]);
    };

    useEffect(() => {
        axios.get(`https://fml-lip2.onrender.com/top/${inputText}`).then((response) => {
        setSuggestions(response.data);
        }).catch((error) => {
            console.log(error);
        }
        );

    }, [inputText]);

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleLogoClick = () => {
        setInputText('');
        onMovieClick('');
    }

  return (
    <div className="nav">
        <div className="logo" onClick={handleLogoClick}>FML</div>
        <div className="search">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"></path><path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"></path></svg>
            <input type="text" placeholder="Search..." value={inputText} onChange={handleChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            <ul className={`search-suggestions ${inputText&&isInputFocused&&(suggestions.length!=0) ? 'active' : ''}`}>
                {suggestions.map((movie, index) => (
                    <li key={index} onClick={()=>handleMovieItemClick(index)}><p>{movie}</p></li>
                ))}
            </ul>
        </div>
    </div>
  )
}

NavBar.propTypes = {
    onMovieClick: PropTypes.func.isRequired, 
};

export default NavBar