import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => this.setState({ [name]: val })

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => setTimeout(() => Actions.pop(), 1000))
      .catch(() => {});
  }

  render() {
    const { loading, error, success } = this.props;
    const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content>
          <View padder>
            <Header
              title="Hoşgeldiniz"
              content="Lütfen kullanıcı adı ve şifrenizi kullanarak giriş yapınız:"
            />
            {error && <Messages message={error} />}
            {success && <Messages type="success" message={success} />}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Şifre</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>Giriş Yap</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
