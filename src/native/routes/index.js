import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';

import AccountsContainer from '../../containers/Accounts';
import AccountsComponent from '../components/Accounts';
import AccountViewComponent from '../components/Account';

import LeaderBoardComponent from '../components/LeaderBoard';

import PostsContainer from '../../containers/Posts';
import PostsComponent from '../components/Posts';

import PatiMap from '../components/PatiMap';
import Posts from '../../containers/Posts';

const Index = (
  <Stack hideNavBar>

    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="popo"
          title="Mükemmel Popolar "
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="popo" component={PostsContainer} Layout={PostsComponent}/>
        </Stack>
        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="patiMap"
          title="Pati Haritası"
          icon={() => <Icon name="paw" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="patiMap" component={PatiMap} />
        </Stack>

        {/*        <Stack
          key="recipes"
          title="RECIPES"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="recipes" component={RecipesContainer} Layout={RecipesComponent} />
        </Stack> */}

        <Stack
          key="accounts"
          title="Yardım Kanalları"
          icon={() => <Icon name="globe" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="accounts" component={AccountsContainer} Layout={AccountsComponent} />
        </Stack>

        <Stack
          key="profile"
          title="Profilim"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="Kayıt Ol"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="Giriş Yap"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="Şifremi Unuttum"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="Profilimi Güncelle"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
        <Stack
          key="leaderboard"
          title="PatiPuan Sıralaması"
          icon={() => <Icon name="logo-game-controller-b" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="leaderboard" component={LeaderBoardComponent} />
        </Stack>
      </Tabs>
    </Scene>
    <Scene
      back
      clone
      key="account"
      title="Yardım Kanalı"
      {...DefaultProps.navbarProps}
      component={AccountsContainer}
      Layout={AccountViewComponent}
    />
    {/*    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    /> */}
  </Stack>
);

export default Index;
