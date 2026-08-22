import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { User } from './Pages/User/user/user';
import {Login} from './Pages/Login/login/login';
import {Sigup} from './Pages/Sigup/sigup/sigup';
import {Chatbot} from './Pages/Chatbot/chatbot/chatbot';
import { authGuard } from './Guard/Authentication/auth-guard';
import { userGuard } from './Guard/User/user-guard';
import { adminGuard } from './Guard/Admin/admin-guard';
import { Admin } from './Pages/Admin/admin/admin';
import { Sucess } from './Pagess/Sucess/sucess/sucess';
import { AdminControl } from './AdminPages/AdminControl/admin-control/admin-control';
import { AdminEarning } from './AdminPages/AdminEarning/admin-earning/admin-earning';
import { AdminUser } from './AdminPages/AdminUser/admin-user/admin-user';
import { AdminReward } from './AdminPages/AdminReward/admin-reward/admin-reward';
import { Chating } from './Pages/Message/chating/chating';
import { Rewarddelivery } from './Rider/RewardDelivery/rewarddelivery/rewarddelivery';
import { Deliverycompleted } from './Pages/DeliveryCompleted/deliverycompleted/deliverycompleted';
import { Rewardgiven } from './Admin/RewardGiven/rewardgiven/rewardgiven';
import { Profile } from './Pages/Rider/profile/profile';
import { riderGuard } from './Guard/Delivery/rider-guard';
import { NotFound } from './Pages/NotFound/not-found/not-found';
import { superGuardGuard } from './Guard/SuperGuard/super-guard-guard';
import { Resetpassword } from './Pages/ForgetPassword/resetpassword/resetpassword';



export const routes: Routes = [
 {path: '', component: User, canActivate: [superGuardGuard] },
 {path: 'login', component: Login,canActivate: [authGuard]},
 {path: 'signup', component: Sigup , canActivate: [authGuard]},
 {path: 'resetpassword', component: Resetpassword , canActivate: [authGuard]},
 {path: 'chatbot', component: Chatbot , canActivate: [superGuardGuard]},
 {path: 'admin', component: Admin, canActivate: [adminGuard,userGuard]},
 {path: 'admincontrol', component: AdminControl, canActivate: [adminGuard]},
 {path: 'admin-earning', component: AdminEarning, canActivate: [adminGuard]},
 {path: 'adminuser', component: AdminUser, canActivate: [adminGuard]},
 {path: 'admin-reward', component: AdminReward, canActivate: [adminGuard]},
 {path: 'success', component: Sucess,}       ,
 {path:'chating', component: Chating, canActivate: [userGuard]},
 {path:'reward-delivery', component:Rewarddelivery , canActivate: [riderGuard]},
 {path:'Delivery' , component:Deliverycompleted , canActivate:[userGuard]},
 {path:'reward-given', component:Rewardgiven , canActivate:[adminGuard]},
 {path:'Rider-Profile' , component:Profile , canActivate:[riderGuard]},
 {path:'**', component:NotFound}
];
