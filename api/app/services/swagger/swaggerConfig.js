export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "The Good Choice Market",
            version: "1.0.0",
            description: "API pour get les infos lier a l'apo d'O'clock",
            contact: {
                name: "TheGoodChoiceMarket Teams",
                url: "https://github.com/O-clock-Cassini/projet-07-the-good-choice-market-back/issues",
            },
            license: {
                name: "License MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Server de development",
            },
            {
                url: "https://the-good-choice-market-v1.herokuapp.com/",
                description: "Server de Heroku",
            },
        ],
    },
    apis: ["./api/app/routers/*"],
};
