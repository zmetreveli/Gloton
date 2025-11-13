
# Glotón

Glotón es una plataforma de entrega a domicilio de origen español que permite a los usuarios comprar, recibir y enviar al momento cualquier producto dentro de una ciudad. Fundada en 2024.

Los usuarios pueden seleccionar los productos que desean de los establecimientos asociados a Glotón en su área. Una vez realizado el pedido, los repartidores independientes, conocidos como "Glotones", recogen y entregan los productos en el destino especificado por el usuario. Esto hace de Glotón una opción conveniente para aquellos que desean ahorrar tiempo, evitar desplazamientos o simplemente disfrutar de la comodidad de recibir lo que necesitan en su puerta.

Glotón se destaca por su interfaz fácil de usar, su rapidez en la entrega y la flexibilidad de poder pedir casi cualquier cosa dentro de su rango de acción en la ciudad. Además, la compañía se esfuerza por mantener un compromiso social y ambiental, adaptando sus operaciones para ser más sostenibles y responsables.


## Tecnologías Utilizadas
###  Frontend

Nuestra aplicación frontend está construida con React, una biblioteca de JavaScript para construir interfaces de usuario. Aquí están las tecnologías y bibliotecas principales que utilizas en el frontend:

- React (react, react-dom): Permite desarrollar la interfaz de usuario de tu aplicación.

- Vite (vite, @vitejs/plugin-react-swc): Herramienta de construcción y desarrollo que ofrece una experiencia de desarrollo rápido para proyectos de React.

- React Router DOM (react-router-dom): Gestiona la navegación entre las distintas secciones de tu aplicación.

- Axios (axios): Se utiliza para realizar solicitudes HTTP a tu backend o a servicios externos.

- Dotenv (dotenv): Para manejar variables de entorno en el desarrollo de tu aplicación.

- Framer Motion (framer-motion): Proporciona animaciones y transiciones avanzadas en tu aplicación React.

- React Hook Form (react-hook-form): Facilita la gestión de formularios, incluyendo la validación y el manejo de errores.

- React Icons (react-icons): Ofrece una amplia gama de iconos accesibles para tu UI.

- React Modal (react-modal): Se utiliza para implementar ventanas modales en tu aplicación.

- React Spinners (react-spinners): Una colección de animaciones de carga spinner, utilizadas para indicar la carga de contenido o procesos en la aplicación. Mejora la experiencia del usuario al proporcionar retroalimentación visual durante las operaciones de carga.





### Backend

El backend está desarrollado con Express, un marco de aplicación web para Node.js. Aquí están las tecnologías y bibliotecas principales para el backend:

- Express (express): Marco de aplicación web para Node.js que facilita la creación de servidores web.

- Mongoose (mongoose): Proporciona una solución basada en esquemas para modelar los datos de tu aplicación con MongoDB.

- Bcryptjs (bcryptjs): Se utiliza para encriptar contraseñas antes de almacenarlas en tu base de datos.

- JWT (jsonwebtoken): Permite la autenticación y transmisión segura de información entre partes como un objeto JSON.

- Axios (axios): También se utiliza en el backend para realizar solicitudes HTTP a servicios externos.

- Cors (cors): Se usa para habilitar CORS (Cross-Origin Resource Sharing) en tu servidor Express.

- Dotenv (dotenv): Maneja las variables de entorno en tu servidor Express.
Nodemon (nodemon): Utilizado en el desarrollo para reiniciar automáticamente el servidor Node.js cuando se detectan cambios en los archivos.

- Handlebars (handlebars): Un motor de plantillas que te permite construir una estructura HTML semántica con datos dinámicos para enviar correos electrónicos o generar otras vistas HTML.

- Mailgun.js (mailgun.js): Proporciona una forma fácil de integrar el envío de correos electrónicos en tu aplicación, utilizando el servicio de Mailgun para gestionar las comunicaciones por correo electrónico.

### Herramientas de Desarrollo y Pruebas

- Jest (jest): Marco de pruebas de JavaScript para asegurar que tu código funciona como se espera.
- Supertest (supertest): Facilita las pruebas HTTP, incluyendo las solicitudes a tu API.
- Cypress (cypress): Herramienta de pruebas de end to end para probar cómo tu aplicación funciona en un navegador.

Dotenv CLI (dotenv-cli), Cross-env (cross-env), y Turbo (turbo): Herramientas que ayudan a gestionar variables de entorno y a mejorar la eficiencia del desarrollo y la construcción de tu proyecto.


## Instalación

Esta guía te ayudará a instalar y ejecutar el proyecto en tu máquina local utilizando npm.

### Prerrequisitos 

Antes de comenzar con la instalación del proyecto, necesitarás asegurarte de tener los siguientes prerrequisitos instalados en tu sistema:

- Node.js
Node.js es un entorno de ejecución para JavaScript construido sobre el motor V8 de Chrome. Es necesario para ejecutar el código JavaScript del lado del servidor, como tu aplicación Express backend, y también se utiliza para construir y manejar el proyecto frontend React.

Cómo instalar: Visita https://nodejs.org/ y descarga la versión LTS (Long Term Support) para tu sistema operativo. La versión LTS es recomendada porque ofrece un equilibrio entre estabilidad y nuevas características. El instalador incluirá npm (Node Package Manager), que es esencial para gestionar las dependencias del proyecto.
- npm
npm es el sistema de gestión de paquetes para Node.js. Permite instalar, compartir y administrar dependencias (bibliotecas y herramientas) en proyectos de Node.js y JavaScript. npm se instala automáticamente con Node.js.

Cómo verificar la instalación: Puedes verificar que npm esté instalado correctamente abriendo una terminal o línea de comandos y ejecutando npm -v. Esto debería mostrarte la versión de npm instalada. Si no es así, asegúrate de que la instalación de Node.js se haya completado correctamente.
- Git
Git es un sistema de control de versiones distribuido que facilita el seguimiento de cambios en los archivos de tu proyecto y la colaboración entre múltiples desarrolladores. Es necesario para clonar el repositorio del proyecto desde su ubicación remota.

Cómo instalar: Visita https://git-scm.com/ y descarga la versión para tu sistema operativo. Durante la instalación, puedes elegir las opciones predeterminadas o personalizarlas según tus preferencias. Git Bash (incluido en la instalación para Windows) es recomendado para usuarios de Windows, ya que proporciona una interfaz de línea de comandos similar a la de los sistemas Unix.

## Instalar MongoDB
MongoDB es la base de datos que utiliza Glotón para almacenar toda la información sobre usuarios, productos, y pedidos. Para ejecutar Glotón localmente, necesitarás tener MongoDB instalado y ejecutándose en tu máquina.

Windows y Mac
Descargar MongoDB: Visita la página de descargas de MongoDB y selecciona la versión que corresponda a tu sistema operativo. Descarga el instalador.

### Instalar MongoDB: 

Ejecuta el instalador y sigue las instrucciones. En Windows, el instalador te guiará a través del proceso de instalación. En Mac, podrías necesitar mover MongoDB a tu carpeta de aplicaciones.

Ejecutar MongoDB: La forma de iniciar MongoDB puede variar dependiendo de tu sistema operativo.

En Windows, MongoDB se instala como un servicio, por lo que debería iniciar automáticamente.
En Mac, puedes necesitar ejecutar mongod en la terminal para iniciar el servidor de MongoDB.
Linux
La instalación en Linux varía según la distribución. Consulta la documentación oficial de MongoDB para instrucciones específicas de tu distribución.

Configurar la Base de Datos
Una vez que MongoDB esté instalado y ejecutándose, necesitarás configurar la base de datos inicial para Glotón.

Abrir una Terminal o Línea de Comandos: Accede a tu interfaz de línea de comandos preferida.

Conectar a MongoDB: Utiliza el comando mongo para conectarte a tu instancia local de MongoDB.

Crear la Base de Datos: Ejecuta el siguiente comando para crear la base de datos:

mongodb
use glotonDB
Esto creará (si no existe) y seleccionará glotonDB como tu base de datos activa.

(Opcional) Configurar Colecciones y Usuarios Iniciales: Dependiendo de tu aplicación, puedes querer configurar algunas colecciones o usuarios iniciales. Consulta la documentación de MongoDB o los scripts específicos de tu proyecto para este paso.

Continuar con la Instalación del Proyecto
Después de configurar MongoDB, puedes continuar con la instalación de las dependencias del proyecto como se describió anteriormente, asegurándote de que tu archivo .env en el backend tenga la URI correcta para conectarse a MongoDB, algo similar a:

bash
Copy code
MONGO_URL=mongodb://localhost:27017/glotonDB

### Clonar Repositorio

Clona el repositorio del proyecto en tu máquina local con el siguiente comando en tu terminal:

git clone https://github.com/nds-fsd/glovo.git

cd glovo

### Instalar Dependencias
Dentro del directorio del proyecto, instala las dependencias para cada parte del proyecto (frontend, backend) ejecutando npm install en cada directorio respectivamente.

#### Para el directorio raíz

npm install

 #### Para el frontend:


cd frontend

npm install

#### Para el backend:


cd backend

npm install

## Configuración de Variables de Entorno

Para garantizar el correcto funcionamiento de tu proyecto en un entorno de desarrollo local, es esencial configurar las variables de entorno. Estas variables facilitan la comunicación segura con bases de datos y servicios externos sin necesidad de incluir información sensible directamente en el código. Deberás crear archivos .env en los directorios adecuados para el frontend y el backend, lo cual permite manejar configuraciones importantes de manera segura y flexible.

El archivo .env para el backend debe incluir:

MONGO_URL=<tu_mongodb_uri>

JWT_SECRET=<tu_jwt_secret>

MAILGUN_API_KEY=<tu_mailgun_api_key>

MAILGUN_DOMAIN=<tu_mailgun_domain>

CLOUD_NAME=<tu_cloud_name>

API_KEY=<tu_api_key>

API_SECRET=<tu_api_secret>

El archivo .env para el frontend debe incluir:

VITE_GOOGLE_API_KEY=<tu_google_api_key>

REACT_APP_BACKEND_URL=<tu_backend_url>

## Ejecutar el Proyecto
Gracias a la configuración como monorepo, puedes iniciar tanto el frontend como el backend con un solo comando ejecutado desde el directorio raíz. Esto simplifica el proceso de arranque y te permite comenzar a trabajar en tu proyecto más rápidamente.

Para iniciar el proyecto, simplemente ejecuta:

npm run dev

Este comando se encargará de iniciar tanto el servidor backend como el servidor de desarrollo frontend simultáneamente, basándose en los scripts definidos en tu archivo package.json raíz.

Frontend: Estará disponible en http://localhost:3000 o el puerto configurado por tu entorno de desarrollo.
Backend: Estará escuchando en http://localhost:5000 o el puerto especificado en tu archivo .env del backend.

## Guía de Uso para el Usuario de Glotón

Glotón es tu compañero definitivo para la entrega de comida a domicilio, permitiéndote tanto comprar y recibir productos de cualquier establecimiento asociado dentro de tu ciudad, como registrar un restaurante y comenzar a vender tus platos dentro de Glotón. Aquí te mostramos cómo empezar a usar Glotón y disfrutar de sus beneficios.

### Registrarse e Iniciar Sesión
#### Crear una Cuenta: 
Al abrir la aplicación por primera vez, serás recibido con la opción de registrarte. Proporciona tu correo electrónico, elige una contraseña y completa cualquier información adicional requerida.


### Iniciar Sesión: 
Si ya tienes una cuenta, simplemente ingresa tus credenciales para acceder a las funciones principales de Glotón.
Navegar y Seleccionar Productos

### Explorar Establecimientos:
Navega por la lista de establecimientos asociados disponibles en tu área.
Seleccionar Productos: Una vez que encuentres el restaurante deseado y los productos que buscas, añádelos a tu carrito. Puedes ajustar cantidades o elegir variantes del producto si están disponibles.

### Realizar un Pedido

#### Revisar el Carrito: 
Antes de finalizar tu pedido, revisa tu carrito para asegurarte de que todo esté correcto. Aquí puedes modificar las cantidades o eliminar productos si lo necesitas.
#### Confirmar Pedido: 
Cuando estés listo, procede a confirmar tu pedido. Selecciona tu dirección de entrega y el método de pago preferido.

### Para Restaurantes
Como restaurante, también puedes crear una cuenta para abrir tu tienda, añadir productos, imágenes a tus productos, precios y personalizar tu tienda de la mejor manera posible para comenzar a vender hoy mismo.

### Soporte y Ayuda
Si tienes alguna pregunta o problema, nuestra sección de ayuda está disponible para ofrecerte asistencia.
Con Glotón, disfrutar de tus productos favoritos en casa nunca ha sido tan fácil. ¡Comienza a explorar y realizar pedidos hoy mismo!

## Ejecución de Pruebas

### Pruebas con Jest
Jest es utilizado para realizar pruebas unitarias y de integración. Para ejecutar estas pruebas y asegurar que tu código cumple con los requisitos y funciona como se espera, sigue estos pasos:

Abrir una Terminal: Navega hasta la raíz de tu proyecto donde está ubicado el archivo package.json que contiene los scripts de Jest.

Ejecutar Pruebas con Jest: Utiliza el siguiente comando para iniciar las pruebas con Jest:

npm run test
Este comando ejecutará todas las pruebas definidas con Jest en tu proyecto y mostrará los resultados en la terminal, incluyendo cualquier prueba fallida y su correspondiente mensaje de error para facilitar la depuración.

### Pruebas con Cypress
Cypress se utiliza para realizar pruebas de extremo a extremo (e2e), simulando interacciones del usuario con la aplicación en un navegador. Para ejecutar estas pruebas, sigue estos pasos:

Navegar hasta el Directorio de Pruebas e2e:
Antes de ejecutar las pruebas de Cypress, necesitas cambiar al directorio dedicado a las pruebas e2e, si tu proyecto está estructurado de esta manera.

cd e2e
Ejecutar Cypress:
Una vez en el directorio correcto, utiliza el siguiente comando para abrir la interfaz de usuario de Cypress, donde podrás ejecutar las pruebas de forma interactiva:

npm run test:open
Al ejecutar este comando, se abrirá la interfaz de Cypress, permitiéndote seleccionar y ejecutar individualmente los archivos de prueba. Cypress proporciona una visualización en tiempo real de las pruebas que se están ejecutando, junto con la capacidad de inspeccionar elementos, realizar depuración y ver los resultados de las pruebas en tiempo real.


## Autores 

### Joel Oliver
- https://www.linkedin.com/in/joel-oliver-millan/
- jolivermillan@gmail.com

### José García
- https://www.linkedin.com/in/jose-garcia-98421814a/
- josegarcia1006@gmail.com

### Vincent Rey

- https://www.linkedin.com/in/vincent-rey-65140b239/
- vincent.rey865@gmail.com


### Zurab Metreveli
- https://www.linkedin.com/in/zurab-metreveli/
- Metreveli.zura.2014@gmail.com
