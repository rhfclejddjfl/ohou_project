import React from 'react'

/**
 * Card Component
 */
class Card extends React.Component {
  state = {
    isScrap : false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const scrapList = JSON.parse(window.localStorage.getItem('scrap')) || [];

    // scrap한 목록체크
    const result = scrapList.filter(scraps => (scraps.id === this.props.id))
    
    this.setState(() => {
      return {
        isScrap: result.length === 1 || this.props.isScrapList ? true : false
      };
    });
  }


  // 스크랩
  btnScrapClick = (e,card) => {
    const scrapList = JSON.parse(window.localStorage.getItem('scrap')) || [];
    const result = scrapList.filter(scraps => (scraps.id !== this.props.id))

    if(this.state.isScrap){
      window.localStorage.setItem('scrap', JSON.stringify(result))
    }else {
      scrapList.push({id: card.id, image_url: card.cardImg, nickname: card.nick, profile_image_url: card.profileImg})
      window.localStorage.setItem('scrap', JSON.stringify(scrapList))
    }

    this.setState(() => {
      return {
        isScrap: this.state.isScrap ? false : true
      };
    });
  };
  
  render () {
    const { ...card } = this.props;
    return (
      <li>
        <div className='card'>
          <div className='profile_wrapper'>
            <img src={card.profileImg? card.profileImg : process.env.PUBLIC_URL+'/images/ic-avatar-cat@2x.png'} className='profile_img' alt={card.nick+' 프로필 이미지'} />
            <strong>{card.nick}</strong>
          </div>
          <div className='thumbnail_wrapper'>
            <img src={card.cardImg} className='thumbnail_img' alt={card.nick+' 카드 이미지'} />
            <img onClick={(e) => this.btnScrapClick(e,card)} src={this.state.isScrap ? process.env.PUBLIC_URL+'/images/blue@2x.png' : process.env.PUBLIC_URL+'/images/on-img@2x.png'} className='scrap_icon' alt={card.id+' 스크랩 아이콘'} />
          </div>
        </div>
      </li>
    )
  }
}

export default Card
