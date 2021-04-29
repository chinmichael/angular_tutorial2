import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'; //라우팅 동작을 실행할 수 있도록
import { HeroesComponent } from './heroes/heroes.component'; // 라우팅 규칙에 따라 이동할 컴포넌트
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 4/29 : 기본 라우티 규칙 : App시작시 브라우저 URL주소는 웹 최상위 주소 가리킴(매치 라우팅 규칙 없음) >> 브라우저 url이 빈문자열일때 /dashboard로 이동하게 함
  { path: 'detail/:id', component: HeroDetailComponent },
  // id에 해당하는 라우팅 변수를 :id로 받겠다는 말
  // Restful하게 자원지시자로서 하기 위해 이런 url디자인을 갖도록 하는게 좋겠지...  

];


@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* 4/28 : 네비게이션 추가
   대시보드 추가 후 > 히어로목록, 대시보드, 상세화면 화면 이동 필요 > 라우팅 필요

   Angular는 최상위 모듈과 동일 계층의 별도 모듈로서 최상위 라우팅 모듈을 정의
   AppModule은 여기서 정의한 라우팅 설정을 로드하는 방식을 권장함

   다음과 같은 CLI명령어로 src/app에 AppRoutingModule 클래스 생성
   ng generate module app-routing --flat --module=app

   --flat : 새로운 폴더를 생성하지 않음 --module=app : AppModule import 배열에 자동으로 추가

   라우팅규칙(Route) : 사용자가 링크를 클릭하거나 URL을 직접 입력하였을 때 라우터가 어떤 화면을 표시할지 정의한 것

   로드한(import)한 컴포넌트(여기선 HeroesComponent)를 라우팅규칙으로 등록하려면 routes배열을 작성
   const routes: Routes = [
    { path: 'heroes', component: HeroesComponent }
   ];
   프로퍼티 의미
   path:URL과 매칭될 문자열
   component:라우터가 생성하고 화면의 표시할 (즉 이동할) 컴포넌트

   RouterModule.forRoot() // 이부분은 나중에 재복습하자 피곤해서 그런지 잘 느낌이...
   모듈 생성시 / 라우터 초기화 및 브라우저 주소변화 감지를 하기 위해 / @NgModule 메타데이터를 지정

   >>import 배열에는 AppRoutingModule에서의 라우터 초기화를 위한 RouteModuler 등록
   RouterModule.forRoot()(app 최상위 라우터 설정할 경우)에 routes인자를 넣어 지정
   forRoot() : 라우팅 관련 서비스 프로바이더, 디렉티브를 app에 제공 + 브라우저 URL변경 감지

   >>export 배열에는 앱에서 RouterModule을 감지할 수 있게 등록
*/
