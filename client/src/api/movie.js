const HOST = 'http://127.0.0.1:8080';

export const CODE_ID_MOVIE = {
    ACTION: 28,
    ADVENTURE: 12,
    ANIMATION: 16,
    COMEDY: 35,
    CRIME: 80,
    DOCUMENTARY: 99,
    DRAMA: 18,
    FAMILY: 10751,
    FANTASY: 14,
    HISTORY: 36,
    HORROR: 27,
    MUSIC: 10402,
    MYSTERY: 9648,
    ROMANCE: 10749,
    SCIENCE_FICTION: 878,
    TV_MOVIE: 10770,
    THRILLER: 53,
    WAR: 10752,
    WESTERN: 37
}

export const getGenreMovies = async () => {
    return fetch(`${HOST}/api/movie/genre`)
        .then(res => res.json())
        .then(json => json.genres)
        .catch(err => console.error(err))
}
/**
 * 
 * @param {Number[]} without_genres 
 * @param {Number[]} with_genres 
 * @param {Object} query 
 * @returns URLSearchParams
 */
export const setupParams = (without_genres = [], with_genres = [], query = {}) => {
    return new URLSearchParams({
        sort_by: 'popularity.desc',
        with_genres: with_genres.join(","),
        // filter genres by id
        without_genres: without_genres.join(","),
        ...query,
    })
}
/**
 * 
 * @param {String[]} with_genres 
 * @param {*} query 
 * @returns 
 */
export const apiGetMovie = async (with_genres = [], query = {}) => {
    const without_genres = (await getGenreMovies()).filter((genre) => !with_genres.includes(genre.id)).map(genre => genre.id)

    const params = setupParams(
        without_genres,
        with_genres,
        query
    )

    console.groupCollapsed('apiGetMovie')
    console.log({ with_genres, without_genres, query })
    console.groupEnd()

    return await fetch(`${HOST}/api/movie?${params.toString()}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err))
}

/**
 * Fetch popular movies
 * @param {object} query 
 * @returns Json
 */
export const getPopularMovies = async (query) => {
    const params = new URLSearchParams({
        sort_by: 'popularity.desc',
        ...query,
    })

    return await fetch(`${HOST}/api/movie?${params.toString()}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err))
}
