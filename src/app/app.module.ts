import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* 4/22 : 히어로 에디터 FormsModule

metadata : 구성요소에 대한 정보(어떻게 이뤄져있는가) > angular가 app정보 조합시 필요
컴포넌트 클래스에 지정해야하는 메타데이터 : @Component 데코레이터에 지정
애플리케이션 동작에 필요한 메타데이터 : @NgModule 데코레이터에 지정(app.module에 있음)
(이렇게 객체 결합(객체에 책임 붙이기)를 통해 기능 동적 확장이 가능한 패턴 = 데코레이터)

ngModel을 제공받기 위해서는(템플릿 form의 양방향 바인딩에 필요) FormsModule이 필요
애플리케이션 동작에 필요한 처리이므로 이는 app.modules.ts에 import시키고
@ngModule 메타데이터에 추가함

컴포넌트는 반드시 app.module.ts의 @NgModule중 하나에 등록되어 있어야 함
CLI로 컴포넌트 생성한(ng generate component 컴포넌트명) 이유 중 또 하나가 알아서 다 박아놓음

*/
