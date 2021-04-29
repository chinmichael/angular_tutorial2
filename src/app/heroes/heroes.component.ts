import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // hero.ts에 지정한 Hero 인터페이스를 가져와 이 기준으로 데이터 객체 세팅 
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service'; // 데이터를 서비스를 거쳐 가져옴
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //hero = 'Windstorm'; // 일종의 멤버변수처럼 생각
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // } // import한 인터페이스를 기준으로 객체 세팅

  heroes: Hero[];
  // selectedHero: Hero; 이제 아예 id기준으로 라우팅됨

  constructor(private heroService: HeroService,
    //private messageService: MessageService
  ) { //의존성 주입 시스템에서 알아서 알맞음 인스턴스를 박아줌
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    //위의 경우 히어로 데이터를 배열(Hero[])로 가져와 heroes프로퍼티에 직접 할당(동기방식)
    //서비스가 즉시 데이터 반환 or 서버의 응답이 동기방식 전달이 될 때만 가능
    //서비스가 리모트서버에 요청을 보내는 방식에서는 동작이 원활하지가 않다

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    //이 경우는 반환시점이 서버 응답 타이밍이 언제인지와 상관없이 (바로 받지 않아도 됨)
    //subscribe가 서버에서 받은 응답을 콜백함수로 전달하고 컴포넌트가 할당함

  }

  onSelect(hero: Hero): void {
    //this.selectedHero = hero;
    //this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    // 주의 ${}을 하기 위해 ''가 아닌 ``로 묶어야한다...덕분에 헤맨... 하나 배웠네 또
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

/* 4/26 Service처리(여기서는 주입받아 데이터를 받아옴)

위의 경우 현재 컴포넌트의 getHeroes() 함수는
생성자에 주입받은 서비스 객체의 getHeroes를 heroes 멤버에 넣는다

머가 되었든 컴포넌트 생성시 이 컴포넌트의 getHeroes()를 실행해서 데이터를 받아야하는데
이때 생성자는 생성자로 받은 인자를 프로퍼티로 연결하는 정도로 유지하는 편이 좋다고 함

이럴 때 쓰는게 라이프사이클 후킹 함수 ngOnInit > 컴포넌트 인스턴스를 생성한 직후에 실행되는 함수

*/
