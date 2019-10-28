import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Form, Input, Item, Label, Text, View } from 'native-base';
import { Modal } from 'react-native';
import { addFeed } from '../../actions/feeds';
import { connect } from 'react-redux';

class ShareFoodModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    pushFeed: PropTypes.func,
    pushFeedLocation: PropTypes.func,
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      grams: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val });

  handleSubmit = () => {
    const { onFormSubmit, pushFeed, coords } = this.props;
    const { grams } = this.state;
    let error;
    pushFeed({ ...{ grams }, ...coords }).catch((err) => {
      error = err;
    });
    onFormSubmit(error);
  };

  render() {
    const { onModalClose, visible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onModalClose}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          position: 'absolute',
          top: 500,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Container>
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label style={{ color: 'green' }}>
                    Mamanın Gram Miktarı:
                  </Label>
                  <Input
                    onChangeText={v => this.handleChange('grams', v)}
                    placeholder="Gram"
                    
                  />
                </Item>
                <Button block onPress={this.handleSubmit}>
                  <Text style={{ color: 'yellow' }}>
                    Mama Ver :)
                  </Text>
                </Button>
              </Form>
            </Content>
          </Container>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  pushFeed: addFeed,
};

export default connect(null, mapDispatchToProps)(ShareFoodModal);
