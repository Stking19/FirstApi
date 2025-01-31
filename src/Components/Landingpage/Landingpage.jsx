import React, { useState, useEffect } from 'react';
import './Landingpage.css';
import axios from 'axios'
import img1 from '../../assets/download (1).jpeg'
import img2 from '../../assets/download.jpeg'
import img3 from '../../assets/download (2).jpeg'
import img4 from '../../assets/download (3).jpeg'

const Landingpage = () => {
  const [votes, setVotes] = useState({
    computer: 0,
    mechanical: 0,
    civil: 0,
    electrical: 0,
  });
  // const [user, setUser] = useState(null);

  // useEffect(() =>{
  //   const storedUser = 
  //   localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  // const [candidates, setCandidates] = useState({
  //   fullName:"",
  //   partyName:"",
  //   partyImage:"",
  //   votes:""
  // })

  const url ="https://student-voting-app.onrender.com/api/candidates"

  async function submitVote(e) {
    

    try {
      const res = await axios.get(url)
      console.log(res)
      alert(res.data.message)


    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem('hasVoted');
    if (voted) {
      setHasVoted(true);
    }
  }, []);


  const handleVote = (course) => {
    if (hasVoted) {
      alert('You have already voted!');
      return;
    }

  
    setVotes((prevVotes) => ({
      ...prevVotes,
      [course]: prevVotes[course] + 1,
    }));

    // setHasVoted(true);
    // localStorage.setItem('hasVoted', 'true', course);
  };

  return (
    <div className='dashboard'>
      <div className='profileCard'>
        <h2>Name: Okoli Stephen</h2>
        <h2>Email: okolistephen43@gmail.com</h2>
        <h2>Status: Voter </h2>
      </div>
      <div className='candidates'>
        <div className='course'>
          <h2>1</h2>
          <p>Computer</p>
          <div className='productImg'><img src={img2} alt="" /></div>
          <button onClick={submitVote}>Vote</button>
          <p>Votes: {votes.computer}</p>
        </div>
        <div className='course'>
          <h2>2</h2>
          <p>Mechanical</p>
          <div className='productImg'><img src={img1} alt="" /></div>
          <button onClick={() => handleVote('mechanical')} disabled={hasVoted}>Vote</button>
          <p>Votes: {votes.mechanical}</p>
        </div>
        <div className='course'>
          <h2>3</h2>
          <p>Civil</p>
          <div className='productImg'><img src={img3} alt="" /></div>
          <button onClick={() => handleVote('civil')} disabled={hasVoted}>Vote</button>
          <p>Votes: {votes.civil}</p>
        </div>
        <div className='course'>
          <h2>4</h2>
          <p>Electrical</p>
          <div className='productImg'><img src={img4} alt="" /></div>
          <button onClick={() => handleVote('electrical')} disabled={hasVoted}>Vote</button>
          <p>Votes: {votes.electrical}</p>
          {/* uivvfinbiofnmfionmonifbv */}
        </div>
      </div>
    </div>
  );
};

export default Landingpage;