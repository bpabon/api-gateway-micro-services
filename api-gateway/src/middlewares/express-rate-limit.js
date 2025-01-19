import rateLimit from "express-rate-limit";

export default function setupRateLimitAdapter(app, routes){
    routes.forEach(r => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    })
}