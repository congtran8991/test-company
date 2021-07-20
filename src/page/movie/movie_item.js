import React, { useContext } from "react";
import { Card } from "antd";
// import { Link } from "react-router-dom"
import 'antd/dist/antd.css';
import { DOMAIN_IMG } from "../../constants/client"
import { useHistory } from "react-router-dom";
import { LoadingContext } from '../../contexts/userContext'
const { Meta } = Card;
const MovieItem = ({ dataMovie, checkView }) => {
    console.log(dataMovie);
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    let history = useHistory();
    const detailViewMovie = () => {
        history.push({
            pathname: `/movie/${dataMovie.id}`,
            // search: '/query=abc',
            state: { detail: dataMovie }
        });
        setIsLoading(1)
    }
    if (checkView) {
        return (<Card
            onClick={() => {
                detailViewMovie()
            }}
            hoverable
            style={{ width: 240, borderRadius: 10, boxShadow: "0 2px 8px rgb(0 0 0 / 10%)" }}
            cover={<img alt="example" height="300" src={DOMAIN_IMG + dataMovie?.poster_path} />}
        >
            <Meta title={dataMovie?.title} description={dataMovie?.release_date} />
        </Card>)
    }
    return (
        <>
            <Card onClick={() => {
                detailViewMovie()
            }} style={{ width: 240, borderRadius: 10, boxShadow: "0 2px 8px rgb(0 0 0 / 10%)", width: '100%', marginBottom: '10px' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <img width="100" alt="example" src={DOMAIN_IMG + dataMovie?.poster_path} />
                    <div style={{ marginLeft: '10px' }}>
                        <div>
                            <h2 style={{ fontWeight: '700', fontSize: '1.3rem' }}>{dataMovie?.title}</h2>
                        </div>
                        <div style={{ fontWeight: '500' }}>{dataMovie?.release_date}</div>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#000' }}>Overview</div>
                            <div style={{ color: '#000', fontFamily: 'Source Sans Pro, Arial, sans-serif', ...numBerOfLine }}>{dataMovie?.overview}</div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default MovieItem;
const numBerOfLine = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    webkitLineClamp: '3',
    webkitBoxOrient: 'vertical',
    maxHeight: '65px',
}
