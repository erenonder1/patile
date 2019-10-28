import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPoints } from '../../actions/points';
import Leaderboard from 'react-native-leaderboard';

class LeaderBoard extends Component {
  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    fetchPoints: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {fetchPoints} = this.props;
    fetchPoints();
  }

  render() {
    const {points} = this.props;
    console.log(points);
    return (
      <Leaderboard
        data={points}
        sortBy='highScore'
        labelBy='userName'/>);
  }
}

const mapStateToProps = state => ({
  points: state.points.points || [],
});

const mapDispatchToProps = {
  fetchPoints: getPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
