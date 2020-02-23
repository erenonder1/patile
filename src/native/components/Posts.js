import React from 'react';
import PropTypes from 'prop-types';
import { Firebase } from '../../lib/firebase';

import {
  FlatList,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const PostsList = ({
                     posts,
                     fetchPosts
                   }) => {
  return (
    <Container>
      <Header />
      <Content>
        <FlatList
          data={posts}
          renderItem={
          ({ item }) => (
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'https://lh3.googleusercontent.com/-jglMxPeBaho/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nBVwPY02R-xTSqXyLfQ7ck4N8Ga0Q/s48-c/photo.jpg'}} />
                  <Body>
                    <Text>{Firebase.auth().currentUser && Firebase.auth().currentUser.email}</Text>
                    <Text note>{item.title}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Text>{item.description}</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{item.like} Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchPosts: PropTypes.func,
};
 export default PostsList;
