import React from 'react';
import { Jumbotron, Row } from 'reactstrap';

const About = () => (
  <div>
    <Row>
      <Jumbotron className="bg-primary text-white">
        <h1>
          Patile
        </h1>
        <p className="lead">
          Minik Hayvan Dostlarımız için Sen de Patile!
        </p>
        <p>
          Patile uygulamasıyla her an minik dostlarımızın yardımına koşuyoruz. Aynı zamanda
          birbirimizle iletişim halinde olup, etrafımızdaki yardımlaşma durumunu takip edebiliyoruz.
          {' '}
        </p>
      </Jumbotron>
    </Row>
  </div>
);

export default About;
