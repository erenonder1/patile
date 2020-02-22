import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Body, Card, CardItem, Container, Content, H3, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import OpenURLButton from './OpenURLButton';

const AccountView = ({
                       error,
                       accounts,
                       accountId,
                     }) => {
  // Error
  if (error) return <Error content={error}/>;

  // Get this Recipe from all recipes
  let account = null;
  if (accountId && accounts) {
    account = accounts.find(item => parseInt(item.id, 10) === parseInt(accountId, 10));
  }

  // Recipe not found
  if (!account) return <Error content={ErrorMessages.pageNotFound}/>;

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: account.image }} style={{ height: 100, width: null, flex: 1 }}/>

        <Spacer size={25}/>
        <H3>
          {account.title}
        </H3>

        <Spacer size={15}/>

        <Card>
          <CardItem header bordered>
            <OpenURLButton url={account.url}/>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
            <Text>
              {account.description}
            </Text>
            </Body>
          </CardItem>
        </Card>

        <Spacer size={20}/>
      </Content>
    </Container>
  );
};

AccountView.propTypes = {
  error: PropTypes.string,
  accountId: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

AccountView.defaultProps = {
  error: null,
};

export default AccountView;
