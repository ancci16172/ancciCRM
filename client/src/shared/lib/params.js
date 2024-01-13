export function getQuery(URLSearchObj) {
    const query = {};
    for (const [key, value] of URLSearchObj) {
        query[key] = value;
    }
    return query;
}



