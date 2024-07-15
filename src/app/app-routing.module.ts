import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layouts/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LayoutPublicComponent } from './shared/layouts/layout-public/layout-public.component';
import { SingleJobInfoComponent } from './jobs/single-job-info/single-job-info.component';
import { SingleApplicationComponent } from './applications/single-application/single-application.component';
import { SingleEmployeeInfoComponent } from './employees/single-employee-info/single-employee-info.component';

const routes: Routes = [{ path: '', redirectTo: '/auth', pathMatch: 'full' },
{ path: 'not-found', component: NotFoundComponent },
{
  path: '',
  canActivateChild: [AuthGuard],
  component: LayoutComponent,
  children: [{
    path: 'applications',
    children: [
      {
        path: '',
        loadChildren: () => import('./applications/applications.module')
          .then(m => m.ApplicationsModule)
      },
      {
        path: ':idApplication',
        component: SingleApplicationComponent
      }
    ]
  }, {
    path: 'jobs',
    children: [{
      path: '',
      loadChildren: () => import('./jobs/jobs.module')
        .then(m => m.JobsModule)
    },
    {
      path: ':idJob',
      component: SingleJobInfoComponent
    }
    ]
  }, {
    path: 'employees',
    children: [{
      path: '',
      loadChildren: () => import('./employees/employees.module')
        .then(m => m.EmployeesModule)
    },
    {
      path: ':idEmployee',
      component: SingleEmployeeInfoComponent
    }
    ]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module')
      .then(m => m.NotificationsModule)

  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module')
      .then(m => m.ReportModule)

  }
  ]
},
{
  path: '',
  component: LayoutPublicComponent,
  children: [{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  }, {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module')
          .then(m => m.HomeModule)
      },
      {
        path: 'job/:idJob',
        component: SingleJobInfoComponent
      }
    ]
  }
  ]
}, {
  path: '**',
  redirectTo: 'not-found',
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
