import { Routes } from '@angular/router';
import { App404Component } from './components/app-404/app-404.component';
import { ExamComponent } from './components/exam/exam.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'exam/:num',
        component: ExamComponent,
        title: 'Exam page',
    },
    {
        path: 'exam',
        component: ExamComponent,
        title: 'Exam page',
    },
    {
        path: '',
        redirectTo: '/home', pathMatch: 'full',
    },
    {
        path: '404',
        component: App404Component,
        title: 'Page Not Found',
    },
    {
        path: '**',
        redirectTo: '/404', pathMatch: 'full',
    },
];
