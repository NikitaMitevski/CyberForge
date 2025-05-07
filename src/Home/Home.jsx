import React from 'react';
import './Home.css';
import LinkForm from '../LinkForm/LinkForm';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Секој клик е нова авантура!</h1>
      <div className="home-content">
        <p>Зачекори безбедно во дигиталниот свет.</p>
      </div>
      <LinkForm />
    </div>
  );
};

export default Home; 