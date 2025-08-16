# API Gateway - Node.js

Este proyecto es un **API Gateway** construido con **Node.js >= v20.11.0**, diseñado como un único punto de entrada para delegar tráfico hacia servicios internos, mejorar la seguridad, facilitar la escalabilidad y el monitoreo del sistema.

## ⚙️ Características

- **Middleware de Seguridad**:
  - CORS configurable.
  - Bloqueo de IPs no autorizadas.
  - Limitación de peticiones para evitar abusos.

- **Delegación de Rutas**:
  - Uso de `http-proxy-middleware` para redirigir peticiones hacia microservicios internos.

- **Punto Único de Entrada**:
  - Todas las peticiones externas pasan por este Gateway.

- **Escalabilidad y Monitoreo**:
  - Uso de middlewares como `morgan` para logging y `compression` para mejorar el rendimiento.

- **Gestión de Errores**:
  - Manejo centralizado de errores mediante la librería `Boom`.

## 🧩 Patrón de Diseño

Este proyecto utiliza el **Patrón Adaptador** para integrar los middlewares al entorno Express, permitiendo una arquitectura desacoplada y flexible.

## 🛠️ Tecnologías y Librerías Utilizadas

- [Express](https://expressjs.com/)
- [Helmet](https://www.npmjs.com/package/helmet) - Seguridad HTTP.
- [Morgan](https://www.npmjs.com/package/morgan) - Logger HTTP.
- [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) - Redirección de tráfico.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - Límite de peticiones.
- [CORS](https://www.npmjs.com/package/cors) - Control de acceso cruzado.
- [Compression](https://www.npmjs.com/package/compression) - Compresión HTTP.
- [Boom](https://www.npmjs.com/package/@hapi/boom) - Manejo de errores HTTP estructurados.

## 🔐 Configuración del Entorno

El proyecto requiere un archivo `.env` para definir la configuración de los servicios internos. Se proporciona un archivo de ejemplo:

```bash
.env.example
```
Para ejecutar correctamente el proyecto:

1. Copia el archivo .env.example y crea uno nuevo llamado .env.
```bash
cp .env.example .env
```
2. Edita las variables de entorno según las rutas de los servicios internos a los que se debe redirigir el tráfico.

## 🚀 Instalación y Ejecución

Clona el repositorio:
```bash
git clone https://github.com/bpabon/api-gateway-micro-services
cd api-gateway-micro-services
cd api-gateway
```
3. Ejecuta el entorno de desarrollo:
```bash
npm run dev
```
## 🧪 Notas Adicionales

- Asegúrate de tener Node.js >= v20.11.0 instalado.

- El API Gateway no contiene lógica de negocio, solo delega y protege las peticiones.

- Este Gateway puede ser fácilmente escalado o integrado a sistemas más grandes de microservicios.