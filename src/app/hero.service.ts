import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs'; // RXJS가 제공하는 가장 중요한 클래스

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators'; //catchError 및 그외 필요 연산자 몇개 챙김

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  // 웹 API형식 URL >> :base(어떤종류의 요청인지(HTTP메서드인지)/:collectionName(InMemoryDataService파일 콜렉션 구분변수)

  //생성자는 되도록 프로퍼티 등을 주입하는 용도 아래의 경우는 서비스 안의 서비스
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  // getHeroes(): Hero[] {
  //   return HEROES; // Hero 목 데이터 목록 고대로 반환
  // }
  getHeroes(): Observable<Hero[]> {
    // TODO:히어로 데이터를 받아온 뒤에 메시지를 띄어야함 (Observable이기에 받아온 뒤 처리)
    //this.messageService.add('HeroService : fetched heroes')

    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      //GET방식으로 서버에서 히어로 목록 가져옴
      .pipe( //메서드 확장
        tap(_ => this.log('fetched heroes')),
        //tap():Observable데이터를 확인하는 데 사용하는 연산자 >log()함수로 화면출력
        catchError(//observable이 실패했을때 실행하는 연산자 >> 에러발생시 실행할 에러핸들러함수를 인자로 전달
          this.handleError<Hero[]>('getHeroes', [])
        ) // catchError가 있어야 에러 발생해도 App실행이 유지되며 필요한 처리를 할 수 있다
      );
  }
  getHero(id: number): Observable<Hero> {
    //this.messageService.add(`HeroService: fetched hero id=${id}`); //역따옴표``는 템플릿리터럴을 표현하는 JS문법
    //return of(HEROES.find(hero => hero.id === id));

    //id에 해당하는 Hero데이터 GET, 존재하지 않음 404반환을 함
    const url = `${this.heroesUrl}/${id}`;
    // id를 기준으로 알아서 hero를 빼오나... url 자원식별에 따라 알아서 데이터를 가져오는지 나중에 확인

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /*로그를 messageSerive로 표시시킴*/
  private log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO : 리모트 서버로 에러메시지 보내기
      console.error(error); // 현재는 리모트서버가 없으므로 console에 로그 출력

      //TODO : 사용자가 이해할 수 있는 형태로 messageService를 통해 출력
      this.log(`${operation} failed: ${error.message}`);

      // App 로직이 끝나지 않도록 기본값으로 받은 객체 반환
      return of(result as T);
    }
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

/* 4/30 : Http메서드 사용

HTTP 프로토콜은 요청과 응답으로 구성됨
HttpClient은 Observable 타입을 한 번만 반환 함

HttpClient.get함수는 HTTP 응답으로 받은 body를 반환 (타입이 지정되지 않은 JSON객체로 처리됨)
>> 응답받은 JSON객체의 타입을 지정하려면 위 <Hero[]>처럼 지네릭을 지정하면 된다
>> 만약 객체 안 데이터를 추출하려면 RxJS의 map연산자를 이용해야함
>> return this.http(HttpClient).get<Hero[]>(this.heroesUrl(api/heroes))
>>> HttpClient의get메서드로heroes자원을가져와<Hero[]>타입으로 지정

리모트 서버에서 데이터를 송수신을 할 때는 에러발생 가능성이 언제든 존재
에러처리로직이 반드시 필요로 함

에러처리는 http.get()으로 받은 observable에 pipe를 사용하여 catchError() 연산자를 연결한다


*/