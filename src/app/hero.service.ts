import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs'; // RXJS가 제공하는 가장 중요한 클래스

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //생성자는 되도록 프로퍼티 등을 주입하는 용도 아래의 경우는 서비스 안의 서비스
  constructor(private messageService: MessageService) { }

  // getHeroes(): Hero[] {
  //   return HEROES; // Hero 목 데이터 목록 고대로 반환
  // }
  getHeroes(): Observable<Hero[]> {
    // TODO:히어로 데이터를 받아온 뒤에 메시지를 띄어야함 (Observable이기에 받아온 뒤 처리)
    this.messageService.add('HeroService : fetched heroes')
    return of(HEROES);
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`); //역따옴표``는 템플릿리터럴을 표현하는 JS문법
    return of(HEROES.find(hero => hero.id === id));
  }

}

/* 4/26 : Service처리 (Spring에서 서비스 생각하면 됨)

  CLI 서비스 생성 ng generate service hero

  Spring을 할 때처럼 로직분할이 이뤄진다고 생각하면 좋음
  컴포넌트의 역할은 오직 데이터를 표시하는데 집중
  데이터 접근 처리를 서비스에서 맡으면 자원이 바뀌어도 컴포넌트에선 신경 쓰지 않고 표시만 하면 됨

  데이터를 직접 가져오거나 저장 처리 등 데이터 처리 로직은 Service에서 처리

  @Injectable() 데코레이터 >> 이 클래스가 의존성 주입 시스템에 포함되는 클래스라고 선언하는 구문
                           >> 서비스를 정의하는 메타데이터 객체를 인자로 받음

  서비스를 컴포넌트에 의존성으로 주입하려면 provider가 의존성 시스템에 등록되어야 함
  provider : 서비스 생성 및 전달방식을 정의한 것(이 경우는 서비스 클래스)
           : injector에 등록이 됨
           : injector : 의존성 주입요청이 있는 객체를 적절히 고르고 생성하는 역할
           : cli로 서비스 생성할 경우 providedIn:'root';로 지정 >> 최상위 인젝터에 등록
             >> 인스턴스가 하나만 생성되며 공유됨


*/

/* 4/26 Observable Data
위의 getHeroes() 컴포넌트에서 주입되어 사용될 때 동기방식으로 적용됨
하지만 일반적으로 데이터는 이런 mock파일에서 받는 것이 아닌 서버에서 받아오기에 비동기처리를 하는것이 일반적이다.

비동기동작 처리방법 > 1.콜백함수 2.Promise 반환 3.Observable반환 (이번에 해볼 것)
Angular가 제공하는 HttpClient.get메서드는 Observable을 반환하기에 가장 자연스럽다



*/

/* 4/26 친구랑 투닥거린 덕분에 헷갈리던거 공부한 것

  this >> JAVA나 JS 어떻게 보면 둘다 객체를 가리키는 거지만 그 특성상
       >> JAVA는 객체 자기 자신을 가리킨다면 정도로 파악하면 된다면

       >> JS는 this 지정 범위에 따라 this가 가리키는 객체를 크게 4가지 범주로 봐야함
       1. 그냥 일반적인 경우 : 브라우저 전역 객체(크롬의 경우 window)
       2. 메서드(JS에서 메서드는 Object타입 내부의 함수임) 내부의 경우 : 메서드를 가진 Object 객체
       3. constructor : constructor로 만들어지는(주로 new사용) Object 객체 (인스턴스 느낌으로 보자)
       4. EventListner : e.currentTarger(이벤트가 동작하는 곳)
*/