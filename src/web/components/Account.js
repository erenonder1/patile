import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, CardImg, CardText, Col, Row,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CardLink from 'reactstrap/es/CardLink';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';

const AccountView = ({
  error,
  loading,
  accounts,
  accountId,
}) => {
  // Yükleniyor
  if (loading) return <Loading />;

  // Hata
  if (error) return <Error content={error} />;

  // detayına girilen yardım hesabını bul bütün hesaplar içerisinde bul
  let account = null;
  if (accountId && accounts) {
    account = accounts.find(item => parseInt(item.id, 10) === parseInt(accountId, 10));
  }

  // hesap bulunamadı
  if (!account) return <Error content={ErrorMessages.pageNotFound} />;

  return (
    <div>
      <Helmet>
        <title>{account.title}</title>
      </Helmet>

      <Row>
        <Col sm="12">
          <h1>
            {account.title}
          </h1>
        </Col>
      </Row>

      <Row>
        <Col lg="10" className="recipe-view-card">
          <Card>
            <CardImg top height="100%" src={account.image} />

            <CardHeader>
              Hakkında
            </CardHeader>

            <CardBody>
              <CardText>
                {account.description}
              </CardText>
              <CardLink href={account.url}>İletişim</CardLink>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/accounts">
            <i className="icon-arrow-left" />
            {' '}
            Geri
          </Link>
        </Col>
      </Row>
    </div>
  );
};

AccountView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  accountId: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

AccountView.defaultProps = {
  error: null,
};

export default AccountView;
