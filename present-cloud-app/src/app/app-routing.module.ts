import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MaxLengthValidator } from '@angular/forms';

const routes: Routes = [
  {
    path: 'curriculumCirclePage',
    loadChildren: () => import('./routes/discover/curriculum-circle/curriculum-circle.module').then( m => m.CurriculumCirclePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./routes/lessons/lesson-detail-tab/member/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./routes/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./routes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'validate',
    loadChildren: () => import('./routes/common/validatecode/validate/validate.module').then( m => m.ValidatePageModule)
  },
  {
    path: 'validateLogin',
    loadChildren: () => import('./routes/login/validate-login/validate-login.module').then( m => m.ValidateLoginPageModule)
  },
  {
    path: 'addLesson',
    loadChildren: () => import('./routes/lessons/add-lesson/add-lesson.module').then( m => m.AddLessonPageModule)
  },
  {
    path: 'joinLesson',
    loadChildren: () => import('./routes/lessons/join-lesson/join-lesson.module').then( m => m.JoinLessonPageModule)
  },
  {
    path: 'lesson-detail-tabs',
    loadChildren: () => import('./routes/lessons/lesson-detail-tab/lesson-detail-tab.module').then( m => m.LessonDetailTabPageModule)
  },
  {
    path: 'addHomework',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/lessons/lesson-detail-tab/homework/add-homework/add-homework.module').then( m => m.AddHomeworkPageModule)
  }
  ,
  {
    path: 'score',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/lessons/lesson-detail-tab/homework/homework-detail/score/score.module').then( m => m.ScorePageModule)
  },
  {
    path: 'mine',
    loadChildren: () => import('./routes/mine/mine.module').then( m => m.MinePageModule)
  },
  {
    path: 'change-mine',
    loadChildren: () => import('./routes/mine/change-mine/change-mine.module').then( m => m.ChangeMinePageModule)
  },
  {
    path: 'about-the-software-mine',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/mine/about-the-software-mine/about-the-software-mine.module').then( m => m.AboutTheSoftwareMinePageModule)
  },
  {
    path: 'setting-mine',
    loadChildren: () => import('./routes/mine/setting-mine/setting-mine.module').then( m => m.SettingMinePageModule)
  },
  {
    path: 'about-us-setting-mine',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/mine/setting-mine/about-us-setting-mine/about-us-setting-mine.module').then( m => m.AboutUsSettingMinePageModule)
  },
  {
    path: 'informatino-feedback-setting-mine',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/mine/setting-mine/informatino-feedback-setting-mine/informatino-feedback-setting-mine.module').then( m => m.InformatinoFeedbackSettingMinePageModule)
  },
  {
    path: 'version-setting-mine',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./routes/mine/setting-mine/version-setting-mine/version-setting-mine.module').then( m => m.VersionSettingMinePageModule)
  },
  {
    path: 'user-agreement-mine',
    loadChildren: () => import('./routes/mine/user-agreement-mine/user-agreement-mine.module').then( m => m.UserAgreementMinePageModule)
  },
  {
    path: 'signupDetail',
    loadChildren: () => import('./routes/lessons/lesson-detail-tab/member/sign-in/sign-in.module').then( m => m.SignInPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
