import React from 'react';
import {
  Container, Content, Text, H1,
} from 'native-base';
import Spacer from './Spacer';

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>
        Minik Hayvan Dostlarımız için Sen de Patile!
      </H1>
      <Spacer size={10} />
      <Text>
        Patile uygulamasıyla her an minik dostlarımızın yardımına koşuyoruz. Aynı zamanda
        birbirimizle iletişim halinde olup, etrafımızdaki yardımlaşma durumunu takip edebiliyoruz.
        {' '}
      </Text>
      <Spacer size={30} />
    </Content>
  </Container>
);

export default About;
