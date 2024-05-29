# Estructura del proyecto
 
 - **config**: Folder donde se almacenara lo relacionado con la conexion a la base de datos, la autorizacion y llaves necesarias.
 - **public**: Todos los archivos que el usuario final pueda ver se guardaran en esta direccion.
 - **src**: Para los archivos de JavaScript y CSS que pueden ser utilizados en el front end.

# Configuracion

Necesario de instalar lo siguiente:
- **NodeJS**
Junto con modulos:
  - express
  - express-session
  - mysql
  - cookie-parser
  - body-parser
- **MySQL** (version 8.0.36)

Instalar modulos usando comando:
> npm i nombreModulo --save

En el editor de MySQL preferido, crear database 'userregistration' y una tabla dentro de la base llamada 'cuentas' con
los parametros:
- ID (int) *PRIMARY KEY*
- username (varchar)
- email (varchar)
- password (varchar)

Dentro de terminal, en la carpeta donde estan los archivos, correr el comando:
> node server.js
