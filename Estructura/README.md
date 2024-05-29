# Estructura del proyecto
 
 - **config**: Folder donde se almacenara lo relacionado con la conexion a la base de datos, la autorizacion y llaves necesarias.
 - **public**: Todos los archivos que afectan archivos estaticos que el usuario final puede ver.
 - **src**: Para los archivos de JavaScript y CSS que pueden ser utilizados en el front end.
 - **routes**: Rutas de conexion para el login y el dashboard que el usuario conectado puede ver.

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

Para la info del dashboard se utilizo una database 'sonorafinance' donde se tiene una tabla 'sectores' donde se muestran los datos economicos de Sonora por los principales sectores econonmicos de los cuales INEGI tiene base de datos por los anios 1998, 2003, 2008, 2018.

Dentro de terminal, en la carpeta donde estan los archivos, correr el comando:
> node server.js
