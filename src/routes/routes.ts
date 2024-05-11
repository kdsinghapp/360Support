



import TabNavigator from "../navigators/TabNavigator";
import CretaeNewPass from "../screen/forgotpassword/CretateNewPass";
import GroupCode from "../screen/commanScreen/GroupCode";
import Home from "../screen/bottomTabScreenParent/Home";
import Login from "../screen/loginscreen/Login";
import LoginOption from "../screen/commanScreen/LoginOption";
import OtpScreen from "../screen/forgotpassword/OtpScreen";
import PassResetOption from "../screen/forgotpassword/PassResetOption";

import SignUp from "../screen/commanScreen/SignUp";
import SplashScreen from "../screen/SplashScreen";
import ScreenNameEnum from "./screenName.enum";
import Profile from "../screen/bottomTabScreenParent/More";
import TeamScreen from "../screen/bottomTabScreenParent/TeamScreen";
import EventScreen from "../screen/bottomTabScreenParent/EventScreen";
import ChatPage from "../screen/chat/ChatPage";
import Chat from "../screen/chat/Chat";
import UpCommingEvent from "../screen/UpCommingEvent";

import Home_Stack from "../navigators/Home_Stack";
import NotificationScreen from "../screen/NotificationScreen";
import AddMatch from "../screen/bottomTabScreenParent/AddMatch";
import MyProfile from "../screen/MyProfile";
import NotificationSetting from "../screen/NotificationSetting";

import About_Us from "../screen/About_us";
import Privacy_Policy from "../screen/PrivacyPolicy";
import Change_Password from "../screen/ChangePassword";
import Step1 from "../screen/commanScreen/Step1";
import Step2 from "../screen/commanScreen/Step2";
import SelectRole from "../screen/commanScreen/SelectRole";
import Step4 from "../screen/commanScreen/Step4";
import SocialLogin from "../screen/commanScreen/SocialLogin";
import CreateConnection from "../screen/bottomTabScreenParent/parentAuth/CreateConnection";
import Calendar from "../screen/bottomTabScreenParent/Calendar";
import More from "../screen/bottomTabScreenParent/More";
import Wall from "../screen/Wall";
import Registrations from "../screen/Registration";
import ChildProfile from "../screen/parentTochild/ChildProfile";
import MyChildren from "../screen/parentTochild/MyChildren";
import CalendarScreen from "../screen/bottomTabScreenParent/Calendar";
import Support from "../screen/Support";


import coachHome from "../screen/coach/bottomTab/coachHome";
import coachCalendar from "../screen/coach/bottomTab/coachCalendar";
import coachNotification from "../screen/coach/bottomTab/coachNotification";
import coachMore from "../screen/coach/bottomTab/coachMore";
import PlayerNotificationScreen from "../screen/player/TabScreen/PlayerNotificationScreen";
import PlayerTeamScreen from "../screen/player/TabScreen/PlayerTeamScreen";
import PlayerCalendarScreen from "../screen/player/TabScreen/PlayerCalendarScreen";
import PlayerHome from "../screen/player/TabScreen/PlayerHome";
import PlayerMore from "../screen/player/TabScreen/PlayerMore";
import VideoScreen from "../screen/VideoScreen";
import SignInOption from "../screen/loginscreen/SignInOption";
import ChidDetails from "../screen/parentTochild/ChidDetails";
import sentConnectionReq from "../screen/bottomTabScreenParent/parentAuth/sentConnectionReq";
import AskCreateALogin from "../screen/AskCreateALogin";
import CreateChildAccount from "../screen/parentTochild/CreateChildAccount";
import WelcomeScreen from "../screen/bottomTabScreenParent/parentAuth/WelcomeScreen";
import ChildCreateAccountLogin from "../screen/parentTochild/ChildCreateAccountLogin";
import coachStep1 from "../screen/coach/auth/coachStep1";
import PlayerStep1 from "../screen/player/auth/PlayerStep1";
import NoWithoutLoginScreen from "../screen/bottomTabScreenParent/parentAuth/NoWithoutLoginScreen";
import Step2Requestsent from "../screen/bottomTabScreenParent/parentAuth/Step2Requestsent";
import firstTimechildadded from "../screen/parentTochild/firstTimechildadded";


const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: SplashScreen,
    },

    {
      name: ScreenNameEnum.LOGIN_OPTION,
      Component: LoginOption,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component: Login,
    },
    {
      name: ScreenNameEnum.SIGNUP_SCREEN,
      Component: SignUp,
    },
    {
      name: ScreenNameEnum.GROUP_CODE,
      Component: GroupCode,
    },
    {
      name: ScreenNameEnum.PASSWORDRESET_OPTION,
      Component: PassResetOption,
    },
    {
      name: ScreenNameEnum.CREATE_NEWPASS,
      Component: CretaeNewPass,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component: OtpScreen,
    },
    {
      name: ScreenNameEnum.BOTTOM_TAB,
      Component: TabNavigator,
    },
    {
      name: ScreenNameEnum.CHAT_SCREEN,
      Component: Chat,
    },
    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component: NotificationScreen,
    },
    {
      name: ScreenNameEnum.MY_PROFILE,
      Component: MyProfile,
    },
    {
      name: ScreenNameEnum.NOTIFICAION_SETTING,
      Component: NotificationSetting,
    },
    {
      name: ScreenNameEnum.PRIVACY_POLICY,
      Component: Privacy_Policy,
    },
    {
      name: ScreenNameEnum.CHANGE_PASSWORD,
      Component: Change_Password,
    },
    {
      name: ScreenNameEnum.STEP_ONE,
      Component: Step1,
    },
    {
      name: ScreenNameEnum.STEP_TWO,
      Component: Step2,
    },
    {
      name: ScreenNameEnum.SELECT_ROLE,
      Component: SelectRole,
    },
    {
      name: ScreenNameEnum.STEP_FOUR,
      Component: Step4,
    },
    {
      name: ScreenNameEnum.SOCIAL_LOGIN,
      Component: SocialLogin,
    },

    {
      name: ScreenNameEnum.CREATE_CONNECTION,
      Component: CreateConnection,
    },
    {
      name: ScreenNameEnum.WALL_SCREEN,
      Component: Wall,
    },
    {
      name: ScreenNameEnum.REGISTRATION_SCREEN,
      Component: Registrations,
    },
    {
      name: ScreenNameEnum.CHILD_PROFILE,
      Component: ChildProfile,
    },
    {
      name: ScreenNameEnum.MY_CHILDREN,
      Component: MyChildren,
    },
    {
      name: ScreenNameEnum.SUPPORT_SCREEN,
      Component: Support,
    },
    {
      name: ScreenNameEnum.VIDEO_SCREEN,
      Component: VideoScreen,
    },
    {
      name: ScreenNameEnum.SIGNIN_OPTION,
      Component: SignInOption,
    },
    {
      name: ScreenNameEnum.CHILD_DETAILS,
      Component: ChidDetails,
    },
    {
      name: ScreenNameEnum.SENT_CONNECTIONREQ,
      Component: sentConnectionReq,
    },
    {
      name: ScreenNameEnum.ASKCREATEALOGIN,
      Component: AskCreateALogin,
    },
    {
      name: ScreenNameEnum.CREATECHILDACCOUNT,
      Component: CreateChildAccount,
    },
    {
      name: ScreenNameEnum.WELCOME_SCREEN,
      Component: WelcomeScreen,
    },
    {
      name: ScreenNameEnum.CHILDCREATEACCOUNTLOGIN,
      Component: ChildCreateAccountLogin,
    },
    {
      name: ScreenNameEnum.COACH_STEP1,
      Component: coachStep1,
    },
    {
      name: ScreenNameEnum.PLAYER_STEP1,
      Component: PlayerStep1,
    },
    {
      name: ScreenNameEnum.NOWITHOUTSCREEN,
      Component: NoWithoutLoginScreen,
    },
    {
      name: ScreenNameEnum.REQUESTSENTSETP2,
      Component: Step2Requestsent,
    },
    {
      name: ScreenNameEnum.FIRST_TIMECHILD,
      Component: firstTimechildadded,
    },


  ],

  HOME_ROUTE: [
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component: Home,
    },

  ],


  BOTTOMTAB_PLAYER: [
    {
      name: ScreenNameEnum.HOME_ROUTE,
      Component: PlayerHome,
      logo: require('../assets/Cropping/home2x.png'),
      lable: 'Home'
    },
    {
      name: ScreenNameEnum.CALENDAR_SCREEN,
      Component: PlayerCalendarScreen,
      logo: require('../assets/Cropping/Calendar-2.png'),
      lable: 'Calendar'
    },
    {
      name: ScreenNameEnum.CHAT_CONTACT_SCREEN,
      Component: ChatPage,
      logo: require('../assets/Cropping/Chat2x.png'),
      lable: 'Chat'
    },
    {
      name: ScreenNameEnum.TEAM_SCREEN,
      Component: PlayerTeamScreen,
      logo: require('../assets/Cropping/Team2x.png'),
      lable: 'Team'
    },
    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component: PlayerNotificationScreen,
      logo: require('../assets/Cropping/Notification-1.png'),
      lable: 'Notification'
    },

    {
      name: ScreenNameEnum.MORE_SCREEN,
      Component: PlayerMore,
      logo: require('../assets/Cropping/More-2.png'),
      lable: 'More'
    },
  ],
  BOTTOMTAB_COACH: [
    {
      name: ScreenNameEnum.HOME_ROUTE,
      Component: coachHome,
      logo: require('../assets/Cropping/home2x.png'),
      lable: 'Home'
    },
    {
      name: ScreenNameEnum.CALENDAR_SCREEN,
      Component: coachCalendar,
      logo: require('../assets/Cropping/Calendar-2.png'),
      lable: 'Calendar'
    },

    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component: coachNotification,
      logo: require('../assets/Cropping/Notification-1.png'),
      lable: 'Notification'
    },

    {
      name: ScreenNameEnum.MORE_SCREEN,
      Component: coachMore,
      logo: require('../assets/Cropping/More-2.png'),
      lable: 'More'
    },
  ]
  ,
  BOTTOMTAB_ROUTE: [
    {
      name: ScreenNameEnum.HOME_ROUTE,
      Component: Home_Stack,
      logo: require('../assets/Cropping/home2x.png'),
      lable: 'Home'
    },
    {
      name: ScreenNameEnum.CALENDAR_SCREEN,
      Component: Calendar,
      logo: require('../assets/Cropping/Calendar-2.png'),
      lable: 'Calendar'
    },
    {
      name: ScreenNameEnum.CHAT_CONTACT_SCREEN,
      Component: ChatPage,
      logo: require('../assets/Cropping/Chat2x.png'),
      lable: 'Chat'
    },
    {
      name: ScreenNameEnum.TEAM_SCREEN,
      Component: TeamScreen,
      logo: require('../assets/Cropping/Team2x.png'),
      lable: 'Team'
    },
    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component: NotificationScreen,
      logo: require('../assets/Cropping/Notification-1.png'),
      lable: 'Notification'
    },

    {
      name: ScreenNameEnum.MORE_SCREEN,
      Component: More,
      logo: require('../assets/Cropping/More-2.png'),
      lable: 'More'
    },
  ]

};

export default _routes;
