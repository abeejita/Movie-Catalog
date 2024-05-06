import React, {useEffect, useState} from 'react';
import {IDetailsResponse} from "../../services/movies/types";
import {getDetails} from "../../services/movies";
import {MovieCard} from "../../components/MovieCard";
import './MyFavorites.css';

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [shows, setShows] = useState<IDetailsResponse[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";
    const [error, setError] = useState<boolean>(false);

    const runGetFavorites = async () => {
        if (favorites.length) {
            // favorites.length > 0
            const favoritesArray = JSON.parse(favorites); // ["213123", "123123"]
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    return getDetails(favoriteId)
                        .then((res) => {
                            if (res && res.data) {
                                // res?.data
                                return res.data;
                            }
                        })
                        .catch((err) => {
                            console.log(err, "err");
                            setError(true);
                        });
                })
            );
            setShows(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, []);

    return (
        <div>
            {loading ? (
                <div>
                    <h2>Loading...</h2>
                </div>
            ) : error ? ( // Check if there's an error
                <div>Error fetching movies</div>
            ) : shows.length > 0 ? (
                <div className="favorites-container">
                    <div className="favorites-title">My Favorites</div>
                    {shows.map((show: IDetailsResponse) => (
                        <MovieCard
                            key={show.id}
                            movieId={show.id}
                            title={show.title}
                            genreId={show.genres[0].id}
                            voteAverage={show.vote_average}
                            posterPath={show.poster_path}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <h3>Oops... it seems this is empty. Explore more movies and add them to your favorites!</h3>
                </div>
            )}
        </div>
    );
};

export default Favorites;
