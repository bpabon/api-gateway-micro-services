import compression from "compression";

export default function compressionPlugin(app) {
    app.use(compression());
}
