import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
// 서버에서 데이터 읽을때 필요한것
import axios from 'axios'; 

/*
*   Hook
*
*   useState => state
*   useEffect => componentDidMount랑 똑같다
* */

class App extends Component{
  // 생성자, state설정 및 이벤트설정
  /*
  *   state =? 외부에서 데이터를 읽어올때 사용, 변경이 가능한 변수 =>  useState()
  * */
  constructor(props) {
    super(props);
    // state 설정
    this.state = {
      movie:[],
      movie2:[]
    }
  }
  /*
  생성자를 사용안할경우 state 등록은 전역으로 이렇게 사용
  state = {
    
  }
  */
  // onload 같은것 로딩된이후
  componentDidMount() {
    axios.get('http://localhost:3355/movie').then((res) => {
      // setstate 다시 render~
      this.setState({movie:res.data})
    })

    axios.get(`http://localhost:3355/movie_home`,{
      params:{
        no:1
      }
    }).then((res) => {
      this.setState({movie2:res.data})
      console.log(this.state.movie2)
    })

  }
  // 화면출력
  render() {

    const html = this.state.movie.map((m, idx) =>
      <div className={"col-md-4"}>
        <div className={"thumbnail"}>
          <a href={"/w3images/lights.jpg"}>
            <img src={m.poster} alt={"Lights"} style={{"width":"100%"}}/>
            <div className={"caption"}>
              <p>{m.title}</p>
            </div>
          </a>
        </div>
      </div>
    )

    return(
        <Fragment>
          <div className={"row"}>
            <h1 className={"text-center"}>현재 상영 영화</h1>
            {html}
          </div>
        </Fragment>
    )
  }

}

export default App;
