import {createProxyMiddleware} from "http-proxy-middleware";
export default function setupProxies(app, routes){
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware({
            target: r.proxy.target,
            changeOrigin: r.proxy.changeOrigin,
            pathRewrite: r.proxy.pathRewrite,
            ws: r.proxy.ws // Habilitar WebSocket
        }));
    })
}