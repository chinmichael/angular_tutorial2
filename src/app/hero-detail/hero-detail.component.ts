import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router'; // 라우팅 url을 통해 가져올 정보 판별
import { Location } from '@angular/common'; // 라우팅 url을 통해 가져올 정보 판별
import { HeroService } from '../hero.service'; //id 기준으로 이제 여기서 정보 가져옴

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero; //당연히 멤버변수에 넣어 보내는거니 export class에

  constructor(
    private route: ActivatedRoute, // HeroDetailComponent인스턴스를 생성하며 적용한 라우팅규칙 정보 담음(변수 id도)
    private heroService: HeroService, // id를 기준으로 서비스를 통해 리모트서버에서 가져옴
    private location: Location, // 브라우저 위치제어를 위함
  ) { }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    /*
    route.snapshot은 컴포넌트 생성 직후 존재하는 라우팅규칙에 대한 정보를 담은 객체
    route.snapshot객체가 제공하는 paramMap을 사용하는 url에 존재하는 변수를 참조 가능
    라우팅변수는 문자열타입이기에 전달된 값이 숫자라면 변수에 JS연산자+ 를 이용해 숫자로 변환 가능(+~한 이유)
    */
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back(); // 브라우저의 히스토리 스택 활용을 위해 Location을 활용 
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack()); // 서버에 데이터 변화 저장을 위해 HeroService에서 http.put()함수 사용해 작업 후 변경 내용을 저장하고 이전화면 이동
  }

  ngOnInit(): void {
    this.getHero();
  }

}
