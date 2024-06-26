import httpInstance from "../httpInstance";

export const getRecommendations = async (id: number | undefined) => {
    let res: any;
    const endpoint = `${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    await httpInstance
        .get(endpoint)
        .then((response) => {
            res = response;
        })
        .catch((err) => {
            res = err.message;
        })
    return res;
};