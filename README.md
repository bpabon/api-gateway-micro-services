## 🧠 API Gateway Microservices - Backend

Este repositorio contiene el backend de la aplicación API Microservices, una arquitectura distribuida construida con Node.js, diseñada como una base para el desarrollo de aplicaciones escalables mediante microservicios. El sistema centraliza todas las solicitudes HTTP y WebSocket a través de un API Gateway, el cual actúa como punto de entrada único y distribuye eficientemente las peticiones hacia los servicios correspondientes.

El proyecto ofrece funcionalidades clave como autenticación de usuarios, comunicación en tiempo real y una infraestructura preparada para escalar. Además, cuenta con una interfaz front-end disponible en el siguiente repositorio:

- 🔗 Frontend del proyecto: [front-end-micro-services](https://github.com/bpabon/front-end-micro-services)

- 🧩 Arquitectura de Servicios

## Este backend está compuesto por 3 servicios principales:

### 1. 🌐 API Gateway

- Tecnología: Node.js

- Responsabilidad: Centraliza todas las solicitudes HTTP y WebSocket.

- Características:

    - Middleware de seguridad (CORS, bloqueo de IPs, limitación de peticiones).

    - Delegación de rutas hacia los servicios internos.

    - Punto único de entrada al sistema.

    - Facilita monitoreo, escalabilidad y gestión de errores.

### 2. 🔐 Servicio de Autenticación (HTTP)

- Tecnología: Node.js + Express

- Responsabilidad: Manejo completo del ciclo de vida de autenticación de usuarios.

- Funcionalidades:

    - Registro de usuarios.

    - Inicio de sesión y generación/validación de tokens JWT.

    - Recuperación y restablecimiento de contraseña.

    - Envío de correos electrónicos de confirmación y recuperación.

    - Validaciones de seguridad.

- Infraestructura:

    - Base de datos gestionada por Docker (producción y test).

    - Pruebas unitarias incluidas.

    - Docker Compose para entorno local completo.

### 3. 💬 Servicio de WebSocket

- Tecnología: Node.js + Socket

- Responsabilidad: Comunicación en tiempo real.

- Características:

    - Gestión de conexiones de usuarios.

    - Detección de clientes conectados.

    - Preparado para escalar horizontalmente.

    - Migraciones de base de datos incluidas para control de estados persistentes.

### ⚙️ Instalación y Uso
📦 Requisitos

Node.js >= v20.11.0

Docker + Docker Compose

Yarn o npm

###  🚀 Clonación del proyecto
  ```bash
git clone https://github.com/bpabon/front-end-micro-services.git
cd front-end-micro-services
  ```

### 🗃️ Estructura del proyecto
- cd ./api-gateway  (🌐 API Gateway)
- cd ./auth-services (🔐 Servicio de Autenticación (HTTP))
- cd ./chat-real-time-service (💬 Servicio de WebSocket)
