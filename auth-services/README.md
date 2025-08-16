# 📌 Servicio de Autenticación – Node.js + Express

Este proyecto es un servicio backend de autenticación desarrollado con **Node.js** y **Express**, diseñado para gestionar el ciclo de vida completo de autenticación de usuarios, incluyendo registro, login, recuperación de contraseña y validaciones de seguridad. Utiliza una arquitectura modular basada en el patrón **Adaptador para middlewares**, y está preparado para ambientes de desarrollo y pruebas mediante Docker.

---

## ✅ Requisitos

- Node.js `>= v20.11.0`
- Docker y Docker Compose

---

## 🚀 Características Principales

- 📦 **Tecnología**: Node.js (>= v20.11.0), Express.
- 🔐 **Responsabilidad**: Gestión de autenticación completa.
- 🧩 **Patrón de diseño**: Adaptador aplicado a middlewares.

### 🔧 Funcionalidades Incluidas

- ✅ Registro de usuarios.
- 🔑 Inicio de sesión con generación y validación de tokens JWT.
- 🔁 Recuperación y restablecimiento de contraseñas vía email.
- 📧 Envío de correos de confirmación y recuperación.
- 🛡️ Validaciones y manejo de errores con seguridad reforzada.
- 📄 Middleware adaptado para validaciones y manejo de errores centralizado con **Boom**.

---

## 🏗️ Infraestructura

- 🐳 Base de datos PostgreSQL gestionada con Docker (entornos de desarrollo y pruebas).
- 🧪 Pruebas unitarias implementadas con **Jest** y **Supertest**.
- 🔧 Entorno local completo usando **Docker Compose**.

---

## 📦 Dependencias

### Principales
- `express`, `dotenv`, `compression`, `helmet`, `cors`, `jsonwebtoken`, `bcryptjs`, `joi`, `nodemailer`, `pg`, `typeorm`, `reflect-metadata`

### Seguridad y errores
- `@hapi/boom`

### Logs
- `winston`, `winston-daily-rotate-file`

### Motor de plantillas (email)
- `handlebars`

### Desarrollo y testing
- `jest`, `supertest`, `nodemon`

---

## 📁 Archivos de Entorno

El proyecto requiere dos archivos de entorno:

- `.env`: Para desarrollo.
- `.env.test`: Para pruebas unitarias.

Ambos deben ser creados a partir del archivo `.env.example` incluido en el repositorio.

```bash
cp .env.example .env
cp .env.example .env.test
```
## ⚙️ Scripts y Comandos
📦 Instalación de dependencias
```bash
npm install
```
## 🐳 Iniciar servicios con Docker
```bash
docker-compose up -d
```
Nota: Este paso es obligatorio antes de ejecutar el proyecto o realizar migraciones.
## 🚧 Ejecutar en entorno de desarrollo
```bash
npm run dev
```
## 📚 Migraciones (TypeORM)
- Crear una nueva migración
```bash
npm run migration:create src/db/postgresql/migration/name-migration
```
- Ejecutar migraciones
```bash
npm run migration:run
```
- Ver estado de las migraciones
```bash
npm run migration:show
```
## ✅ Ejecutar pruebas unitarias
```bash
npm run test:watch
```
## 🧠 Arquitectura
- Patrón Adaptador aplicado en middlewares para desacoplar lógica.

- Manejo de errores centralizado con @hapi/boom.

- Proyecto modular, escalable y testeable.