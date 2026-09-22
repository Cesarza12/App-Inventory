# Sistema de Inventario — Laravel + React

Sistema web de gestión de inventario desarrollado con **Laravel** como backend y **React + Vite** como frontend para la administración de productos y categorías.

## Descripción

La aplicación permite gestionar información de productos y categorías mediante una interfaz web, utilizando una arquitectura que combina Laravel y React.

Laravel se encarga de la autenticación, autorización, lógica del backend, acceso a la base de datos y API REST. React proporciona la interfaz de gestión del inventario y el consumo de los servicios de la API.

## Tecnologías utilizadas

### Backend

* PHP
* Laravel
* Composer
* Laravel Eloquent ORM
* MySQL
* Laravel Sanctum
* Laravel Gates
* API REST

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript
* npm

### Entorno de desarrollo

* Windows
* Laragon
* MySQL
* PHP
* Composer
* Node.js y npm

**Laragon** fue utilizado como entorno de desarrollo local para ejecutar los servicios necesarios para el proyecto, incluyendo PHP y MySQL.

## Funcionalidades

* Inicio de sesión y autenticación de usuarios.
* Control de acceso mediante permisos.
* Panel administrativo y panel para trabajadores.
* Gestión de categorías.
* Creación, edición y eliminación de categorías.
* Gestión de productos.
* Creación, edición y eliminación de productos.
* Asociación de productos con categorías.
* Validación de información de productos.
* Validación de códigos de producto únicos.
* Control de precio y stock.
* Navegación mediante React Router.
* Rutas protegidas.
* Consumo de API REST desde React.
* Recarga directa de las rutas principales de la SPA.
* Relación entre productos y categorías mediante Eloquent.

## Arquitectura general

El proyecto utiliza una arquitectura híbrida:

* **Laravel:** autenticación, autorización, backend, API REST, modelos, migraciones y acceso a la base de datos.
* **React:** interfaz de usuario de la sección de inventario, navegación, formularios y consumo de la API.
* **MySQL:** almacenamiento de los datos del sistema.

## Estructura del proyecto

```text
app-movil/
├── app/
│   ├── Http/
│   ├── Models/
│   └── ...
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── css/
│   └── views/
├── routes/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
├── .env.example
└── README.md
```

## Requisitos

Para ejecutar el proyecto se requiere tener instalado:

* PHP
* Composer
* Node.js y npm
* MySQL
* Laragon u otro entorno compatible con PHP y MySQL.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Cesarza12/App-Inventory.git
cd App-Inventory
```

### 2. Instalar las dependencias de Laravel

Desde la carpeta principal del proyecto:

```bash
composer install
```

Composer se utiliza para instalar y administrar las dependencias PHP del proyecto.

### 3. Configurar el archivo de entorno

Crear una copia de `.env.example` con el nombre `.env`.

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configurar en `.env` los datos correspondientes a la base de datos MySQL.

Ejemplo:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=app_movil
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Generar la clave de la aplicación

```bash
php artisan key:generate
```

### 5. Crear la base de datos

Crear una base de datos MySQL llamada `app_movil` y configurar sus credenciales en el archivo `.env`.

Durante el desarrollo, la base de datos fue administrada dentro del entorno local proporcionado por Laragon.

### 6. Ejecutar las migraciones y seeders

```bash
php artisan migrate --seed
```

Esto crea la estructura de las tablas y ejecuta los seeders definidos por el proyecto.

### 7. Instalar las dependencias del frontend

Entrar a la carpeta `frontend`:

```bash
cd frontend
npm install
```

### 8. Ejecutar el frontend

```bash
npm run dev
```

El frontend se ejecutará mediante Vite en el puerto configurado para el proyecto.

### 9. Ejecutar Laravel

En otra terminal, desde la carpeta principal del proyecto:

```bash
php artisan serve
```

Laravel estará disponible mediante la dirección local proporcionada por Artisan.

## Desarrollo

Durante el desarrollo se utilizan dos procesos principales:

### Backend Laravel

```bash
php artisan serve
```

### Frontend React

```bash
cd frontend
npm run dev
```

El frontend utiliza el proxy configurado en Vite para comunicarse con la API de Laravel.

## Build de producción

Para generar la versión de producción del frontend:

```bash
cd frontend
npm run build
```

Vite genera los archivos optimizados dentro de:

```text
frontend/dist
```

La carpeta `dist` está incluida en `.gitignore` y no se almacena en el repositorio.

## Base de datos

El sistema utiliza **MySQL** como sistema gestor de base de datos.

Entre las principales entidades utilizadas se encuentran:

* Usuarios
* Categorías
* Productos
* Movimientos de inventario

Los productos mantienen una relación con las categorías y los movimientos de inventario mantienen una relación con los productos.

La estructura de la base de datos se administra mediante las migraciones de Laravel.

## Autenticación y autorización

El proyecto utiliza las herramientas de autenticación y autorización de Laravel.

La autorización de las operaciones de la API se realiza mediante **Gates y permisos**, permitiendo controlar las operaciones disponibles para los diferentes usuarios.

React utiliza el estado de autenticación y los permisos para controlar la interfaz, mientras que Laravel mantiene la autorización en el backend.

## Seguridad y variables de entorno

Las credenciales y variables sensibles del entorno se almacenan en `.env`.

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

El proyecto incluye `.env.example` como referencia para configurar un entorno local.

No se deben almacenar claves, contraseñas u otras credenciales sensibles directamente en el repositorio.

## Incidencia durante la configuración inicial

Durante la instalación inicial de Laravel mediante Composer se presentó un inconveniente relacionado con la validación de certificados SSL/HTTPS utilizados por PHP para establecer conexiones seguras.

El problema estuvo relacionado con la configuración del certificado `cacert.pem` y la interacción con el antivirus Avast, lo que impedía inicialmente que Composer pudiera realizar correctamente algunas conexiones necesarias para descargar las dependencias.

Fue necesario ajustar la configuración del entorno local para permitir el funcionamiento correcto de Composer y completar la instalación.

Esta incidencia correspondió al entorno de desarrollo utilizado durante la configuración inicial y no forma parte de los requisitos normales de instalación del proyecto.

## Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

https://github.com/Cesarza12/App-Inventory

## Autor

**Julio Cesar Zapata Aguilar**

Proyecto académico de desarrollo web.
