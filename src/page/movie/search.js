import React, { useEffect, useState, useRef } from "react";
// import MovieItem from '../movie/movie_item';
import { removeAccents } from "../../utils/removeAccents";
// import { API_KEY } from "../../constants/client"
import { Input } from "antd"
const { Search } = Input;
function SearchMovie({listMovie,setListMovie,setPage,getListMovie,listMovieRef}) {
    const onSearch = (value) => {
        if(value.length === 0) {
            getListMovie()
            return
        }
        let arrListFil = []
        let charArr = removeAccents(value).toLowerCase().split(" ");
        listMovieRef.map((x,index)=>{
            x['arr_title'] = x.title.split(" ") 
               return x  
        })
        let result = listMovieRef.map((y,index)=>{
          let resuftFil =  y?.arr_title.filter((z,index)=>{
              return charArr.includes(removeAccents(z).toLowerCase())
          })
          y['ratio_search'] = resuftFil.length/y?.arr_title.length
          if(resuftFil.length > 0){
            arrListFil.push(y)
          }
          return y
        })
        arrListFil.sort(function (a, b) {
            return a.value - b.value;
        });
        setListMovie(arrListFil)
    };
    return (
        <>
            <Search size="middle" style={{width:'60%'}} placeholder="input search text" onSearch={onSearch} enterButton />
        </>
    );
}

export default SearchMovie;
