import React, { useEffect, useState, useRef,useContext } from "react";
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import { AXIOS } from "../../utils/axios";
import { API_KEY } from "../../constants/client"
import { Row, Card, Image, Col } from "antd"
import { DOMAIN_IMG } from "../../constants/client"
import { LoadingContext } from '../../contexts/userContext'
const MovieDetail = () => {
    const {isLoading,setIsLoading} = useContext(LoadingContext)
    let history = useHistory();
    const { id } = useParams();
    const location = useLocation()
    const [detailMovie, setDetailMovie] = useState({})
    useEffect(() => {
        AXIOS(`/movie/${id}` + `?api_key=${API_KEY}&language=vi`, "get")
            .then((resp) => {
                setDetailMovie(resp)
                setIsLoading(0)
            })
            .catch((e) => {
                console.log("Lỗi", e)
            });
    }, [])
    return (
        <div style={{ backgroundImage: `url(${DOMAIN_IMG + detailMovie?.backdrop_path})`, ...styleDetailMovie,overflowY:'hidden' }}>
            <div style={{ background: 'linear-gradient(to bottom right, rgba(99.61%, 98.82%, 99.22%, 1.00), rgba(59.61%, 58.82%, 59.22%, 0.84))',paddingTop:'10px',paddingBottom:'10px' }}>
                <Row gutter={16} style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '4%', marginRight: '4%' }}>
                    <Col className="gutter-row" xs= {24} sm= {8} md= {8} lg= {8} style={{}}>
                        <div>
                            <Image
                                style={{ borderRadius: '8px' }}
                                src={DOMAIN_IMG + location.state?.detail?.poster_path}
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" xs= {24} sm= {16} md= {16} lg= {16} style={{color: '#fff'}}>
                        <div>
                        <div>
                            <h2 style={{fontWeight:'700',fontSize:'2.2rem'}}>{detailMovie?.title}</h2>
                        </div>
                        <div style={{color:'#000',fontSize:'1rem',fontFamily: 'Source Sans Pro, Arial, sans-serif'}}>{detailMovie?.genres?.map((data, index) => {
                            return (
                                <span key={index}>{data?.name}, </span>
                            )
                        })}</div>
                        <div style={{fontSize:'1.3rem',fontWeight:'600',color:'#000',marginTop:15}}>Overview</div>
                        <div style={{color:'#000',fontFamily: 'Source Sans Pro, Arial, sans-serif'}}>{detailMovie?.overview}</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{position:'relative'}} onClick={()=>{
                  history.push('/')
            }}>
                <div style={{position:'fixed',right:20,bottom:25,cursor:'pointer',fontWeight:'600',fontSize:'1.3rem'}}>{"Quay lại ->"} </div>
            </div>
        </div>
    );
};

export default MovieDetail;
const styleDetailMovie = {
    backgroundPosition: 'right top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height:'100%'
}