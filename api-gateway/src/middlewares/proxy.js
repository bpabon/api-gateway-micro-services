import {createProxyMiddleware} from "http-proxy-middleware";
export default function setupProxies(app, routes){
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}