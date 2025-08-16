# 📡 WebSocket Service – Node.js

Este es un servicio de comunicación en tiempo real construido con **Node.js** y **WebSocket**, diseñado para gestionar conexiones activas, detectar clientes conectados y escalar horizontalmente. Además, cuenta con migraciones de base de datos para mantener estados persistentes.

---
### 💬 Persistencia de Chats

El proyecto está diseñado y estructurado para **almacenar los mensajes de chat en la base de datos**. Aunque esta funcionalidad aún **no está implementada en esta versión**, la lógica y arquitectura necesarias ya están preparadas para desarrollarla en una versión futura.  
Esto incluye:

- Estructura de entidades en la base de datos para almacenar los mensajes.
- Diseño de servicios que permiten integrar la persistencia sin modificar la lógica actual del WebSocket.
- Adaptadores listos para incluir la capa de persistencia cuando se habilite la funcionalidad.

---

## 🚀 Requisitos

- **Node.js** `>= v20.11.0`
- **Docker** y **Docker Compose** instalados

---

## 🛠️ Tecnologías y Librerías Usadas

- **Core:**
  - Node.js
  - WebSocket (`ws`)
  - Express

- **Dependencias:**
  - `axios`
  - `bcryptjs`
  - `compression`
  - `cors`
  - `dotenv`
  - `express`
  - `helmet`
  - `joi`
  - `jsonwebtoken`
  - `pg`
  - `reflect-metadata`
  - `typeorm`
  - `winston`
  - `winston-daily-rotate-file`
  - `ws`
  - `dotenv-cli`

- **Manejo de errores:**
  - `@hapi/boom`

- **Arquitectura:**
  - Patrón Adaptador para integración de plugins

---

## 📦 Características

- Gestión eficiente de conexiones de usuarios.
- Detección de clientes conectados.
- Preparado para escalar horizontalmente.
- Migraciones de base de datos para control de estados persistentes.

---



## 🧪 Instalación y Ejecución

1. Clonar el repositorio

```bash
git https://github.com/bpabon/api-gateway-micro-services.git
cd api-gateway-micro-services
cd chat-real-time-service
```
2. Instalar dependencias
```bash
npm i
```
3. Configurar variables de entorno

- Copia el archivo de ejemplo .env.example como .env:
```bash
cp .env.example .env
```
- Edita .env con tus credenciales de base de datos y otras variables necesarias.
## 🐳 Iniciar base de datos con Docker

Antes de ejecutar el servicio, inicia los contenedores (ej. base de datos) usando Docker Compose:
```bash
docker-compose up -d
```
## 👨‍💻 Ejecutar en desarrollo
```bash
npm run dev
```
## 🗃️ Migraciones de Base de Datos
Crear una nueva migración
```bash
npm run migration:create src/db/postgresql/migration/name-migration
```
Ejecutar las migraciones
```bash
npm run migration:run
```
Ver el estado de las migraciones
```bash
npm run migration:show
```
## 📋 Notas

- Asegúrate de tener el contenedor de la base de datos corriendo antes de ejecutar cualquier comando de migración.

- Este servicio está listo para ser escalado horizontalmente. Para despliegues en producción, considera usar un gestor de procesos como PM2 y configurar balanceo de carga (ej. NGINX).