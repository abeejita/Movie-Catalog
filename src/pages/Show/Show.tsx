import React, {useEffect, useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import {getDetails} from "../../services/movies";
import {IDetailsResponse} from "../../services/movies/types";
import MovieCard from "../../components/MovieCard/MovieCard";
import './Show.css';
import Pill from "../../components/Pill/Pill";
import {Button} from "../../components/Button";

const Show: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [errorDetails, setErrorDetails] = useState<boolean>(false);
    const [details, setDetails] = useState<IDetailsResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const goBack = () => {
        navigate(-1);
    };

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : []; // "["3982732"]" -> ["3982732"] || []
        const newFavorites = [...favs, id]; // ["3982732", "9823782"]
        setFavorites(JSON.stringify(newFavorites)); // "["3982732", "9823782"]"
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        console.log("entered")
    };

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const getMovieDetails = async (id: number | undefined) => {
        await getDetails(id)
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setDetails([res.data]);
                }
            })
            .catch((err) => {
                setErrorDetails(true);
            });
        setLoading(false);
    };

    useEffect(() => {
        const favs = localStorage.getItem("favorites") || "";
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        setLoading(true);
        getMovieDetails(Number(id));
    }, [id]);

    // use effects
    return (
        <div>
            {loading && <div> Loading...</div>}
            {errorDetails && <div> Error...</div>}
            <div className="show-details">
                <div className="show-container">
                    <Button onClick={goBack} color="gray" title="Regresar" icon={false}></Button>
                    <div className="show-row">
                        <div className="show-image">
                            <div className="show-image-thumbnail">
                                {details && Object.keys(details).length > 0 && (
                                    <MovieCard
                                        movieId={details[0].id}
                                        posterPath={details[0].poster_path}
                                        title={details[0].title}
                                    />

                                )}
                            </div>
                        </div>
                        <div className="show-info">
                            <div className="show-title">
                                {details && Object.keys(details).length > 0 && (
                                    <div>
                                        <h1>{details[0].title}</h1>
                                    </div>
                                )}
                            </div>
                            <div className="show-stats">
                              <span className="show-stat">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users"
                                       className="show-svg" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path fill="currentColor"
                                            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
                                  </svg>
                                  {details && Object.keys(details).length > 0 && (
                                      <div className="show-little-stat">
                                          {Number(details[0].adult) === 0 ? "18-" : "18+"}
                                      </div>
                                  )}
                              </span>
                                <span className="show-stat">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock"
                                       className="show-svg" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path fill="currentColor"
                                            d="M 256 8 C 119 8 8 119 8 256 S 119 504 256 504 S 504 393 504 256 S 393 8 256 8 Z m 92.49 313 h 0 l -20 25 a 16 16 0 0 1 -22.49 2.5 h 0 l -67 -49.72 a 40 40 0 0 1 -15 -31.23 V 112 a 16 16 0 0 1 16 -16 h 32 a 16 16 0 0 1 16 16 V 256 l 58 42.5 A 16 16 0 0 1 348.49 321 Z"></path>
                                  </svg>
                                    {details && Object.keys(details).length > 0 && (
                                        <div className="show-little-stat">
                                            {details[0].runtime} min
                                        </div>
                                    )}
                              </span>
                                <span className="show-stat">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-day"
                                       className="show-svg" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path fill="currentColor"
                                            d="M 0 464 c 0 26.5 21.5 48 48 48 h 352 c 26.5 0 48 -21.5 48 -48 V 192 H 0 v 272 Z m 64 -192 c 0 -8.8 7.2 -16 16 -16 h 96 c 8.8 0 16 7.2 16 16 v 96 c 0 8.8 -7.2 16 -16 16 H 80 c -8.8 0 -16 -7.2 -16 -16 v -96 Z M 400 64 h -48 V 16 c 0 -8.8 -7.2 -16 -16 -16 h -32 c -8.8 0 -16 7.2 -16 16 v 48 H 160 V 16 c 0 -8.8 -7.2 -16 -16 -16 h -32 c -8.8 0 -16 7.2 -16 16 v 48 H 48 C 21.5 64 0 85.5 0 112 v 48 h 448 v -48 c 0 -26.5 -21.5 -48 -48 -48 Z"></path>
                                  </svg>
                                    {details && Object.keys(details).length > 0 && (
                                        <div className="show-little-stat">
                                            {details[0].release_date && details[0].release_date.split("-")[0]}
                                        </div>
                                    )}
                              </span>
                                <span className="show-stat">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-day"
                                       className="show-svg" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path fill="currentColor"
                                            d="M 259.3 17.8 L 194 150.2 L 47.9 171.5 c -26.2 3.8 -36.7 36.1 -17.7 54.6 l 105.7 103 l -25 145.5 c -4.5 26.3 23.2 46 46.4 33.7 L 288 439.6 l 130.7 68.7 c 23.2 12.2 50.9 -7.4 46.4 -33.7 l -25 -145.5 l 105.7 -103 c 19 -18.5 8.5 -50.8 -17.7 -54.6 L 382 150.2 L 316.7 17.8 c -11.7 -23.6 -45.6 -23.9 -57.4 0 Z"></path>
                                  </svg>
                                    {details && Object.keys(details).length > 0 && (
                                        <div className="show-little-stat">
                                            {details[0].vote_average}
                                        </div>
                                    )}
                              </span>
                                <span className="show-stat">
                                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="poll"
                                       className="show-svg" role="img"
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                      <path fill="currentColor"
                                            d="M 400 32 H 48 C 21.5 32 0 53.5 0 80 v 352 c 0 26.5 21.5 48 48 48 h 352 c 26.5 0 48 -21.5 48 -48 V 80 c 0 -26.5 -21.5 -48 -48 -48 Z M 160 368 c 0 8.84 -7.16 16 -16 16 h -32 c -8.84 0 -16 -7.16 -16 -16 V 240 c 0 -8.84 7.16 -16 16 -16 h 32 c 8.84 0 16 7.16 16 16 v 128 Z m 96 0 c 0 8.84 -7.16 16 -16 16 h -32 c -8.84 0 -16 -7.16 -16 -16 V 144 c 0 -8.84 7.16 -16 16 -16 h 32 c 8.84 0 16 7.16 16 16 v 224 Z m 96 0 c 0 8.84 -7.16 16 -16 16 h -32 c -8.84 0 -16 -7.16 -16 -16 v -64 c 0 -8.84 7.16 -16 16 -16 h 32 c 8.84 0 16 7.16 16 16 v 64 Z"></path>
                                  </svg>
                                    {details && Object.keys(details).length > 0 && (
                                        <div className="show-little-stat">
                                            {details[0].vote_count}
                                        </div>
                                    )}
                              </span>
                            </div>
                            <div className="show-description">
                                {details && Object.keys(details).length > 0 && (
                                    <div className="show-little-stat">
                                        {details[0].overview}
                                    </div>
                                )}
                            </div>
                            <div className="show-more-info">
                                <div className="show-block">
                                    <h5 className="show-block-text">Genres</h5>
                                    {details && details[0]?.genres && details[0]?.genres.map((genre, index) => (
                                        <Pill key={index} title={genre.name} color='green'/>
                                    ))}
                                </div>
                                <div className="show-block">
                                    <h5 className="show-block-text">Favorite</h5>
                                    {isFavorite ? (
                                            <Button onClick={removeFavorite} color="red" title="Remove from favorites"
                                                    icon={true} svg="brokenHeart"/>
                                        ) :
                                        (
                                            <Button onClick={addFavorite} color="blue" title="Add to favorites"
                                                    icon={true} svg="heart"/>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;