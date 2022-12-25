import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SignUp.css';

function SignUp({ courtID, closeSignUp }) {
  const [type, setType] = useState('');
  const [players, setPlayers] = useState(Array(4).fill(''));
  const numPlayers = type === 'singles' ? 2 : 4;

  const handleSubmit = async (e) => {
    console.log(players);
    e.preventDefault();
    let id = courtID;
    let court = { id, type, players };

    await fetch('http://localhost:8000/courts/' + courtID, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(court)
    });

    closeSignUp();
  };

  useEffect(() => {
    if (!courtID) return;
    async function fetchData() {
      const response = await fetch('http://localhost:8000/courts/' + courtID);
      const data = await response.json();
      if (data.type != '') setType(data.type);
      setPlayers(data.players);
    }
    fetchData();
  }, [courtID]);

  useEffect(() => {
    setPlayers(Array(numPlayers).fill(''));
  }, [type]);

  const updatePlayers = (index) => (e) => {
    let newArr = [...players];
    newArr[index] = e.target.value;
    console.log(e.target.value)
    if (e.target.value.length == 10){
      e.target.value = 'jenny'
      newArr[index] = e.target.value;

    }
    setPlayers(newArr);
    console.log(players);
  };

  return courtID ? (
    <div className="Sign-Up">
      <div onClick={() => closeSignUp()} className="overlay"></div>
      <div className="pop-up">
        <h2>{courtID}</h2>
        <form onSubmit={handleSubmit}>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="doubles">Doubles</option>
            <option value="singles">Singles</option>
          </select>
          <div>
            {players.map((value, index) => (
              <React.Fragment key={index}>
                <label>Player {index + 1}:</label>
                <input
                  type="text"
                  value={value}
                  placeholder="Player's Phone Number"
                  onChange={updatePlayers(index)}
                />
              </React.Fragment>
            ))}
          </div>
          <button>Sign Up</button>
        </form>
        <button className="close" onClick={() => closeSignUp()}>
          x
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}

SignUp.propTypes = {
  courtID: PropTypes.string.isRequired,
  closeSignUp: PropTypes.func.isRequired
};

export default SignUp;
