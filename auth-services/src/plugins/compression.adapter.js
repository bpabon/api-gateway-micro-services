import compression from "compression";

export default function compressionAdapter(app) {
    app.use(compression());
}
