import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './quiz/question/question.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import {MatButtonModule} from "@angular/material/button";
import { CreateQuizFormComponent } from './create/create-quiz-form/create-quiz-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { SignupFormComponent } from './account/signup-form/signup-form.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CreateQuizPageComponent } from './pages/create-quiz-page/create-quiz-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ProfileComponent } from './account/profile/profile.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth.guard";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { PlayMenuPageComponent } from './pages/play-menu-page/play-menu-page.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { PlayQuizPageComponent } from './pages/play-quiz-page/play-quiz-page.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ReportComponent } from './quiz/report/report.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CreateQuestionFormComponent } from './create/create-question-form/create-question-form.component';
import { CreateQuestionPageComponent } from './pages/create-question-page/create-question-page.component';
import { QuestionBankListComponent } from './question-bank/question-bank-list/question-bank-list.component';
import { QuestionBankPageComponent } from './pages/question-bank-page/question-bank-page.component';
import { QuestionBankDialogComponent } from './question-bank/question-bank-dialog/question-bank-dialog.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportListPageComponent } from './pages/report-list-page/report-list-page.component';
import { PublicQuestionsPageComponent } from './pages/public-questions-page/public-questions-page.component';
import {MatTableModule} from "@angular/material/table";
import { PublishConfirmationDialogComponent } from './dialog/publish-confirmation-dialog/publish-confirmation-dialog.component';
import { PublicQuestionsListComponent } from './public/public-questions-list/public-questions-list.component';
import { QuizBankListComponent } from './quiz-bank/quiz-bank-list/quiz-bank-list.component';
import { QuizBankPageComponent } from './pages/quiz-bank-page/quiz-bank-page.component';
import { PublicQuizListComponent } from './public/public-quiz-list/public-quiz-list.component';
import {PublicQuizPageComponent} from "./pages/public-quiz-page/public-quiz-page.component";


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuizComponent,
    CreateQuizFormComponent,
    LoginPageComponent,
    LoginFormComponent,
    SignupFormComponent,
    DashboardPageComponent,
    DashboardContentComponent,
    HomePageComponent,
    NotFoundPageComponent,
    CreateQuizPageComponent,
    NavbarComponent,
    LogoutDialogComponent,
    ProfileComponent,
    PlayMenuPageComponent,
    QuizListComponent,
    PlayQuizPageComponent,
    ReportPageComponent,
    ReportComponent,
    CreateQuestionFormComponent,
    CreateQuestionPageComponent,
    QuestionBankListComponent,
    QuestionBankPageComponent,
    QuestionBankDialogComponent,
    ReportListComponent,
    ReportListPageComponent,
    PublicQuestionsPageComponent,
    PublishConfirmationDialogComponent,
    PublicQuestionsListComponent,
    QuizBankListComponent,
    QuizBankPageComponent,
    PublicQuizListComponent,
    PublicQuizPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'create/quiz', component: CreateQuizPageComponent},
      {path: 'create/question', component: CreateQuestionPageComponent},
      {path: 'play/:quizId', component: PlayQuizPageComponent},
      {path: 'play', component: PlayMenuPageComponent},
      {path: 'report/:reportId', component: ReportPageComponent},
      {path: 'report', component: ReportListPageComponent},
      {path: 'question-bank', component: QuestionBankPageComponent},
      {path: 'share/questions', component: PublicQuestionsPageComponent},
      {path: 'share/quizzes', component: PublicQuizPageComponent},
      {path: 'quiz-bank', component: QuizBankPageComponent},
      {path: '**', component: NotFoundPageComponent}
    ]),
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
