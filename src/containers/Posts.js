import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import getPosts from '../actions/posts';
class Posts extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  componentDidMount = () => this.fetchData();


  fetchData = () => {
    const {fetchPosts} = this.props;
    fetchPosts();
  };

  render = () => {
    const {Layout, posts, points} = this.props;
    return (
    <Layout
      fetchPost={() => this.fetchData()}
      posts= {posts}
      points={ points }
    />
    );
  };
}
const mapStateToProps = state => ({
  posts: state.posts.posts || {},
});

  const mapDispatchToProps = {
    fetchPosts: getPosts,
  };
 export default connect(mapStateToProps, mapDispatchToProps) (Posts);

