import Movie from '../page/movie';
import MovieDetail from  '../page/movie_detail'
export const routes = [
    {
        path: "/",
        exact: true,
         main: < Movie />
    },
    {
        path: "/movie",
        exact: true,
        main: < Movie />
    },
    {
        path: "/movie/:id",
        exact: true,
        main: < MovieDetail />
    },

];