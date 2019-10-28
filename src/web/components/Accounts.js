import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from './Error';

const AccountListing = ({ error, loading, accounts }) => {
  // Hata
  if (error) return <Error content={error} />;

  // Her bir eleman için bir kart oluştur
  const cards = accounts.map(item => (
    <Card key={`${item.id}`}>
      <Link to={`/account/${item.id}`}>
        <CardImg top src={item.image} alt={item.title} />
      </Link>
      <CardBody>
        <CardTitle>
          {item.title}
        </CardTitle>
        <CardText>
          {item.body}
        </CardText>
        <Link className="btn btn-primary" to={`/account/${item.id}`}>
          Detayları İncele
          {' '}
          <i className="icon-arrow-right" />
        </Link>
      </CardBody>
    </Card>
  ));

  // Kartları göster
  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>
            Yardım Kanalları
          </h1>
          <p>
            Bu sayfada hayvanlara yardım edebileceğiniz iletişim kanallarını bulabilirsiniz.
          </p>
        </Col>
      </Row>
      <Row className={loading ? 'content-loading' : ''}>
        <Col sm="12" className="card-columns">
          {cards}
        </Col>
      </Row>
    </div>
  );
};

AccountListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

AccountListing.defaultProps = {
  error: null,
};

export default AccountListing;
