import React from 'react'
import axios from 'axios'
import Card from './Card'
import './App.css'

class App extends React.Component {
  state = {
    cards : [],
    page : 1,
    isScrollEvent : true,
    isScrapList : false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getList(this.state.page);
    window.addEventListener("scroll", this.handleScroll, true);
  }

  // 카드 목록 
  getList = async (page) => {
    const { data } = await axios.get('https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_'+page+'.json');
    this.setState(() => {
      return {
        cards: this.state.cards.concat(data),
        page: page+1,
        isScrollEvent: data.length > 0? true : false
      };
    });
  };

  // 스크랩 목록 보기
  onScrapList = () => {
    this.setState(() => {
      return {
        isScrapList: this.state.isScrapList? false : true,
        cards: !this.state.isScrapList && window.localStorage.getItem('scrap') !== null ? JSON.parse(window.localStorage.getItem('scrap')) : []
      };
    });

    if(this.state.isScrapList){
      this.getList(1);
    }
  } 

  // 스크롤 이벤트
  handleScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop  = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight

    if(scrollTop + clientHeight === scrollHeight && this.state.isScrollEvent && !this.state.isScrapList){
      this.getList(this.state.page)
    }
  };

  render () {
    const { cards } =  this.state;

    return (
      <section>
        <header>
          <div onClick={() => this.onScrapList()} className="btn_scrap">
            {
              this.state.isScrapList? <img src={process.env.PUBLIC_URL+'/images/bt-checkbox-checked@2x.png'} className="scrap_icon" alt="체크박스"/> : <i className="scrap_empty_icon"></i>
            }
            <span className="scrap_title">스크랩한 것만 보기</span>
          </div>
        </header>
        <section className="content_wrapper">
          <ul>
            {
              cards.length === 0 ?
              <li>스크랩한 카드가 없습니다.</li> : 
              cards.map((card,index) => (
              <Card 
                key={index}
                id={card.id}
                nick={card.nickname}
                profileImg={card.profile_image_url}
                cardImg={card.image_url}
                isScrapList={this.state.isScrapList}
              />
            ))}
          </ul>
        </section>
      </section>
    )
  }
}

export default App
