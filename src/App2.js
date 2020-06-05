import React, {Component, Fragment} from 'react';
import axios from 'axios';

class App2 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            movie:[],
            detail:{},
            isShow:false
        }
    }

    componentDidMount() {
        // http://localhost:3355/movie_home?no=1
        axios.get(`http://localhost:3355/movie_home`, {
            params:{
                no:1
            }
        }).then((res) => {
            this.setState({movie:res.data})
        })
    }

    onMovie(no){
        axios.get(`http://localhost:3355/movie_home`, {
            params:{
                no:no
            }
        }).then((res) => {
            this.setState({movie:res.data})
        })
    }

    onMovieDetail(m){
        this.setState({detail:m, isShow:true})
    }

    // 리액트 이벤트 변수 넘길때 this.event.bind(this, 변수)
    render() {

        const html = this.state.movie.map((m, idx) =>
            <tr data-num={m.movieCd} onMouseOver={this.onMovieDetail.bind(this, m)}>
                <td><img src={`http://www.kobis.or.kr${m.thumbUrl}`} alt={m.movieNm} width={"50"} height={"50"}/></td>
                <td>{m.movieNm}</td>
                <td>{m.director}</td>
                <td>{m.genre}</td>
            </tr>
        )

        return(
            <Fragment>
                <div className="row text-center" style={{"margin":"0 auto",}}>
                    <button className="btn btn-small btn-primary" onClick={this.onMovie.bind(this, 1)}>박스오피스</button>
                    <button className="btn btn-small btn-danger" onClick={this.onMovie.bind(this, 2)}>실시간 예매율</button>
                    <button className="btn btn-small btn-success" onClick={this.onMovie.bind(this, 3)}>좌석 점유율</button>
                    <button className="btn btn-small btn-info" onClick={this.onMovie.bind(this, 4)}>온라인 이용순위</button>
                </div>
                <div className="row" style={{"margin":"0 auto"}}>
                    <div className="col-sm-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-center"></th>
                                    <th className="text-center">영화명</th>
                                    <th className="text-center">감독</th>
                                    <th className="text-center">장르</th>
                                </tr>
                            </thead>
                            <tbody>
                                {html}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-6">
                        {this.state.isShow === true ? <MovieDetail movie={this.state.detail}/> : null}
                    </div>
                </div>
            </Fragment>
        )
    }

}

// 상세보기
class MovieDetail extends Component{

    /*
        <App2 name="" />
        class
        constructor(props){} => this.props.name

        function
        function App2(props){} => props.name

    * */

    // detail

    render() {
        return(
            <Fragment>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="text-center" width={"30%"} rowSpan={"5"}>
                                <img src={`http://www.kobis.or.kr${this.props.movie.thumbUrl}`} width={"300"} height={"350"} alt=""/>
                            </td>
                            <td width={"70%"} colSpan={"2"}>
                                <h2>{this.props.movie.movieNm}</h2>
                                <sub style={{"color":"gray"}}>{this.props.movie.movieNmEn}</sub>
                            </td>
                        </tr>
                        <tr>
                            <td width={"20%"}>감독</td>
                            <td width={"50%"}>{this.props.movie.director}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>장르</td>
                            <td width={"50%"}>{this.props.movie.genre}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>등급</td>
                            <td width={"50%"}>{this.props.movie.watchGradeNm}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>개봉일</td>
                            <td width={"50%"}>{this.props.movie.startDate}</td>
                        </tr>
                        <tr>
                            <td colSpan={"3"}>{this.props.movie.synop}</td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }

}

export default App2;
