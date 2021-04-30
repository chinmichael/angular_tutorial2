import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }

  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  /*
  히어로 객체가 항상 id프로퍼티를 가질 수 있도록 getId메서드 오버라이드
  >> 히어로 목록이 비어있다면 초기값 11을 반환 vs 히어로 목록이 비어있지 않다면 id최대값에 1을 더해 반환 (새 id)
  */

  constructor() { }
}

/*
  HttpClient : 리모트서버와 HTTP통신을 하기 위한 Angular서비스 (AngularModule에 추가)

  현재 서버구성이 되지 않았으므로 HTTP통신을 가로채어 리모트 서버 응답을 흉내내어주는
  In Memory Web API를 구성함

  Web API package 설치 : npm install angular-in-memory-web-api --save
  데이터베이스 실행환경 구성을 위한 서비스 구성 : ng generate service InMemoryData

  이후 Angular모듈에 InMemoryWebAPI 실행환경 구성을 위한 import처리를 함

*/