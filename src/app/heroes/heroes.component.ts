import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // hero.ts에 지정한 Hero 인터페이스를 가져와 이 기준으로 데이터 객체 세팅 
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //hero = 'Windstorm'; // 일종의 멤버변수처럼 생각
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  } // import한 인터페이스를 기준으로 객체 세팅

  heroes = HEROES;
  selectedHero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

/* 4/22 : 히어로 에디터

angular 컴포넌트를 선언하려면 (ng generate component하면 알아서 세팅은 되지만)
반드시 위처럼 angular/core 라이브러리에서 component import(심볼을 로드)하고
컴포넌트 클래스에 @Component 지정 (스프링에서 @Controller나 @Service하는 느낌)

@Compenent는 클래스 metadata를 지정해서 Angular컴포넌트로 선언하는 decorater
기본 meatadata(CLI가 세팅해줌)
selector : css 엘리먼트 셀렉터 > 부모 컴포넌트 템플릿에 사용하는 DOM트리에서의 컴포넌트 이름
                               >> 간단하게 상위 컴포넌트에서 호출할때 쓰는 아이디로 생각
templateUrl : html template url
styleUrls : css스타일 파일 위치

DOM 트리 : 브라우저가 HTML을 로드 후 파싱해 생성한 모델 (객체가 트리구조로 되어있음)
         : DOM의 모든 요소, 속성, 텍스트 등은 객체로 트리구조로 구성된 Document객체 자식

ngOnInit(라이프사이클 후킹 함수) : 딱봐도 초기화(Init) 관련 메서드
Angular에서 컴포넌트 초기화 직후 호출하는 메서드 >> 초기화 관련 로직을 여기에 담는다

import export : 오늘 vue에서도 했지만 외부js로 데이터, 함수 등을 주고 받을 땐 반드시
                보내는 쪽에서 export하고 받는쪽에서 import(이건 머 자바도) 해야함
                class가 export되있는건 그런 이유

metadata : 구성요소에 대한 정보(어떻게 이뤄져있는가) > angular가 app정보 조합시 필요
컴포넌트 클래스에 지정해야하는 메타데이터 : @Component 데코레이터에 지정
애플리케이션 동작에 필요한 메타데이터 : @NgModule 데코레이터에 지정(app.module에 있음)
(이렇게 객체 결합(객체에 책임 붙이기)를 통해 기능 동적 확장이 가능한 패턴 = 데코레이터)

ngModel을 제공받기 위해서는 FormsModule이 필요
애플리케이션 동작에 필요한 처리이므로 이는 app.modules.ts에 import시키고
@ngModule 메타데이터에 추가함

*/
