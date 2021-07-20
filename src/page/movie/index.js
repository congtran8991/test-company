import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import MovieItem from '../movie/movie_item';
import SearchMovie from '../movie/search';
import { AXIOS } from "../../utils/axios";
import { API_KEY, CATEGORY_TAB } from "../../constants/client";
import { Button, Row, Space, Tabs, Pagination, Col } from "antd"
import { LoadingContext } from '../../contexts/userContext'
const { TabPane } = Tabs;
function AllMovie() {
    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const listMovieRef = useRef([])
    const [listMovie, setListMovie] = useState([])
    const [page, setPage] = useState(1)
    const [checkView, setCheckView] = useState(1)
    const [categoryMovie, setCategoryMovie] = useState(CATEGORY_TAB.popular)
    const [totalResult, setTotalResult] = useState(0)
    useEffect(() => {
        listMovieRef.current = []
        getListMovie()
    }, [page, categoryMovie])
    const getListMovie = () => {
        AXIOS(`/movie/${categoryMovie}` + `?api_key=${API_KEY}&language=vi&page=${page}`, "get")
            .then((resp) => {
                listMovieRef.current = resp?.results
                setTotalResult(resp?.total_results)
                setListMovie(resp?.results)
                setIsLoading(0)
            })
            .catch((e) => {
                console.log("Lỗi", e)
                setListMovie([])
                setIsLoading(0)
            });
    }
    const getCategory = useCallback(
        (key) => {
            setCategoryMovie(key);
            setPage(1)
        },
        [categoryMovie],
    );

    const listViewMovie = () => {
        return (
            <div direction="vertical">
                <Row style={{ marginBottom: '10px', marginLeft: '10px', marginRight: '10px', justifyContent: 'center' }}>
                    <SearchMovie listMovie={listMovie} setListMovie={setListMovie} setPage={setPage} getListMovie={getListMovie} listMovieRef={listMovieRef.current} />
                    {" "}
                    <Button size="middle" onClick={() => {
                        setCheckView(!checkView)
                    }}>{checkView ? "List view" : "Gird view"}</Button>
                </Row>
                {checkView ? <div>
                    <Row gutter={[20, 20]} style={{ margin: 'auto', overflowY: 'scroll', height: '73vh',justifyContent:'center' }}>
                        {listMovie.map((dataMovie, index) => {
                            return (
                                <Col key={index} style={{ marginRight: '5px' }}>
                                    <MovieItem dataMovie={dataMovie} checkView={checkView} />
                                </Col>
                            )
                        })}
                    </Row>
                </div> : <div>
                    {listMovie.map((dataMovie, index) => {
                        return (
                            <Row key={index} style={{ marginRight: '5px', width: '100%', alignContent: 'center' }}>
                                <Col xs={24} sm={3} md={3} lg={3}></Col>
                                <Col xs={24} sm={18} md={18} lg={18}>
                                    <MovieItem dataMovie={dataMovie} checkView={checkView} />
                                </Col>
                                <Col xs={24} sm={3} md={3} lg={3}></Col>
                            </Row>
                        )
                    })}
                </div>}
            </div>
        )
    }
    const paginationPage = () => {
        return (
            <div style={{ marginTop: '1rem',marginLeft: '10px', marginRight: '10px' }}>
                <Pagination responsive={true} size="small" total={totalResult} onChange={(value) => {
                    setIsLoading(1)
                    setPage(value)
                }} pageSize={20} showSizeChanger={false} />
            </div>
        )
    }
    return (
        <>
            <Tabs type="card" onChange={(key) => {
                getCategory(key);
                setIsLoading(1)
            }
            }>
                <TabPane tab="List Movie" key={CATEGORY_TAB.popular}>
                    {listViewMovie()}
                    {paginationPage()}
                    {/* <div>
                        <Pagination total={totalResult} onChange={(value) => {
                            setIsLoading(1)
                            setPage(value)
                        }} pageSize={20} showSizeChanger={false} />
                    </div> */}
                </TabPane>
                <TabPane tab="Top rating" key={CATEGORY_TAB.top_rated}>
                    {/* <Row style={{ marginTop: '10px', justifyContent: 'center' }}><SearchMovie listMovie={listMovie} setListMovie={setListMovie} setPage={setPage} getListMovie={getListMovie} listMovieRef = {listMovieRef.current} /></Row> */}
                    {listViewMovie()}
                    {paginationPage()}
                    {/* <div>
                        <Pagination total={totalResult} onChange={(value) => {
                            setIsLoading(1)
                            setPage(value)
                        }} pageSize={20} showSizeChanger={false} />
                    </div> */}
                </TabPane>
                <TabPane tab="Now playing" key={CATEGORY_TAB.now_playing}>
                    {listViewMovie()}
                    {paginationPage()}
                    {/* <div>
                        <Pagination style={{ justifyContent: 'center' }} total={totalResult} onChange={(value) => {
                            setIsLoading(1)
                            setPage(value)
                        }} pageSize={20} showSizeChanger={false} />
                    </div> */}
                </TabPane>
            </Tabs>
        </>
    );
}

export default AllMovie;