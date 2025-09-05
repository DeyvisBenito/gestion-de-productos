## Estructura del proyecto

```text
.
├── package-lock.json
├── README.md
├── package.json
├── src
│   ├── Data
│   │   └── database.ts
│   ├── app.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   └── product.controller.ts
│   ├── middlewares
│   │   └── authenticateToken.ts
│   ├── models
│   │   ├── interfaces
│   │   │   ├── optionsPagination.interface.ts
│   │   │   ├── product.interface.ts
│   │   │   ├── productPaginated.interface.ts
│   │   │   └── user.interface.ts
│   │   └── modelsSequalize
│   │       ├── product.model.ts
│   │       └── user.model.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   └── product.route.ts
│   ├── server.ts
│   └── services
│       ├── auth.service.ts
│       └── password.service.ts
└── tsconfig.json
```


# Pasos para ejecutar el proyecto

## <u>Dependencias del entorno de desarrollo </u>

Para una mejor ejecución del proyecto es recomendable contar con el siguiente versionamiento:

**node**: v22.16.0

**npm**: 11.4.2

**tsc**: Version 5.8.3

### <u>Backend</u>

En el Backend siempre se debe utilizar **npm**

1. Para ejecutar el Backend, después de clonar el proyecto, es necesario ejecutar en la terminal del proyecto:

```terminal 
npm install
```

Luego de realizar eso se descargarán todas las dependencias necesarias para el correcto funcionamiento del proyecto.

2. Posteriormente a esto, es necesario crear un archivo en el root del proyecto que se llame: 

```text
.env
```

Al crear este archivo en el root del proyecto, diríjase a un archivo existente llamado **.env.template**, ahí encontrará una estructura con los datos que debe colocar en su archivo **.env**, copie los datos de **.env.template** y peguelos en **.env**, posteriormente modifique esos datos del **.env** para que correspondan a los datos de su servidor.

***Nota:*** El campo **JWT_SECRET="llave secreta que se usa para crear tokens"** debe de colocar su llave secreta dentro de las comillas **""** para la generación del token seguro.

3. Finalmente ejecute la aplicación con el siguiente comando:
```terminal
npm run dev
```
Y su BackEnd debería funcionar correctamente.
