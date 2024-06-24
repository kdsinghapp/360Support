



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
import Step1 from "../screen/commanScreen/GroupDetails";
import Step2 from "../screen/commanScreen/UserDetails";
import SelectRole from "../screen/commanScreen/SelectRole";
import Step4 from "../screen/commanScreen/ContinueUserDeatils";
import SocialLogin from "../screen/commanScreen/SocialLogin";
import CreateConnection from "../screen/bottomTabScreenParent/parentAuth/CreateOrRequestConnection";
import Calendar from "../screen/bottomTabScreenParent/Calendar";
import More from "../screen/bottomTabScreenParent/More";

import Registrations from "../screen/bottomTabScreenParent/Feature/Registration";
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
import VideoScreen from "../screen/bottomTabScreenParent/Feature/VideoScreen";
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
import GroupDetails from "../screen/commanScreen/GroupDetails";
import UserDetails from "../screen/commanScreen/UserDetails";
import ContinueUserDeatils from "../screen/commanScreen/ContinueUserDeatils";
import CreateOrRequestConnection from "../screen/bottomTabScreenParent/parentAuth/CreateOrRequestConnection";
import CocheTeamScreen from "../screen/coach/bottomTab/cocheTeam";
import coachWall from "../screen/coach/features/coachWall";
import cocheEvent from "../screen/coach/features/cocheEvent";
import cocheVideo from "../screen/coach/features/coachVideo";
import coachProfile from "../screen/coach/features/coachProfile";
import PersnalInfo from "../screen/commanScreen/PersnalInfo";
import EventDetilas from "../screen/commanScreen/EventDetilas";
import cocheTraning from "../screen/coach/features/cocheTraning";
import coachMatches from "../screen/coach/features/coachMatches";
import cochRegistration from "../screen/coach/features/cochRegistration";
import TeamListScreen from "../screen/coach/features/TeamMemberList";
import coachAccountSetting from "../screen/coach/features/coachAccountSetting";
import GroupmemberPage from "../screen/chat/GroupMemberScreen";
import VideoPlayer from "../screen/coach/features/VideoPlayer";
import coachNotificationSetting from "../screen/coach/features/coachNotificationSetting";
import Wall from "../screen/bottomTabScreenParent/Feature/Wall";
import Matches from "../screen/bottomTabScreenParent/Feature/Matches";
import Event from "../screen/bottomTabScreenParent/Feature/Event";
import TranningCoachNotificationSetting from "../screen/coach/features/coachNotificationSetting";
import Training from "../screen/bottomTabScreenParent/Feature/Traning";
import ChildrenProfiles from "../screen/bottomTabScreenParent/Feature/ChildrenProfiles";
import EditChildProfile from "../screen/bottomTabScreenParent/Feature/EditChildProfile";
import AccountSettingPlayer from "../screen/player/features/AccountSettingPlayer";


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
      name: ScreenNameEnum.GROUP_DETAILS,
      Component: GroupDetails,
    },
    {
      name: ScreenNameEnum.USER_DETAILS,
      Component: UserDetails,
    },
    {
      name: ScreenNameEnum.SELECT_ROLE,
      Component: SelectRole,
    },
    {
      name: ScreenNameEnum.CONTINUE_USERDETAILS,
      Component: ContinueUserDeatils,
    },
    {
      name: ScreenNameEnum.SOCIAL_LOGIN,
      Component: SocialLogin,
    },

    {
      name: ScreenNameEnum.CREATE_OR_REQUESTCONNECTION,
      Component: CreateOrRequestConnection,
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
    {
      name: ScreenNameEnum.coachWall,
      Component: coachWall,
    },
    {
      name: ScreenNameEnum.cocheEvent,
      Component: cocheEvent,
    },
    {
      name: ScreenNameEnum.cocheVideo,
      Component: cocheVideo,
    },
    {
      name: ScreenNameEnum.coachProfile,
      Component: coachProfile,
    },
    {
      name: ScreenNameEnum.PersnalInfo,
      Component: PersnalInfo,
    },
    {
      name: ScreenNameEnum.EventDetilas,
      Component: EventDetilas,
    },
    {
      name: ScreenNameEnum.cocheTraning,
      Component: cocheTraning,
    },
    {
      name: ScreenNameEnum.coachMatches,
      Component: coachMatches,
    },
    {
      name: ScreenNameEnum.cochRegistration,
      Component: cochRegistration,
    },
    {
      name: ScreenNameEnum.TeamListScreen,
      Component: TeamListScreen,
    },
    {
      name: ScreenNameEnum.coachAccountSetting,
      Component: coachAccountSetting,
    },
    {
      name: ScreenNameEnum.GroupmemberPage,
      Component: GroupmemberPage,
    },
    {
      name: ScreenNameEnum.VideoPlayer,
      Component: VideoPlayer,
    },
    {
      name: ScreenNameEnum.Match,
      Component: Matches,
    },
    {
      name: ScreenNameEnum.Event,
      Component: Event,
    },
    {
      name: ScreenNameEnum.Tranning,
      Component: Training,
    },
    {
      name: ScreenNameEnum.ChildrenProfiles,
      Component: ChildrenProfiles,
    },
    {
      name: ScreenNameEnum.EditChildProfile,
      Component: EditChildProfile,
    },
    {
      name: ScreenNameEnum.coachNotificationSetting,
      Component: coachNotificationSetting,
    },
    {
      name: ScreenNameEnum.AccountSettingPlayer,
      Component: AccountSettingPlayer,
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
      name: ScreenNameEnum.TEAM_SCREEN,
      Component: CocheTeamScreen,
      logo: require('../assets/Cropping/Team2x.png'),
      lable: 'Team'
    },
    {
      name: ScreenNameEnum.CHAT_CONTACT_SCREEN,
      Component: ChatPage,
      logo: require('../assets/Cropping/Chat2x.png'),
      lable: 'Chat'
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
      name: ScreenNameEnum.MORE_SCREEN,
      Component: More,
      logo: require('../assets/Cropping/More-2.png'),
      lable: 'More'
    },
  ]

};

export default _routes;
