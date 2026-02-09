# Rick & Morty - Frontend Test

Este es un proyecto de React desarrollado con la herramienta de desarrollo **Vite**, diseñado para ser rápido, modular y altamente escalable. El objetivo principal es ofrecer una interfaz funcional para la búsqueda de personajes de la API oficial de Rick & Morty.

## Arquitectura y Patrones de Diseño

El proyecto implementa el patrón de diseño **Contenedor/Presentación (Container/Presenter)**, permitiendo una separación clara entre la lógica de negocio y la interfaz de usuario:

* **Containers**: Manejan el estado, la lógica y las llamadas a los servicios.
* **Presentation**: Componentes puramente visuales que reciben datos vía props.
* **Pages**: Se utilizan para separar la información y organizar las rutas principales de la aplicación.
* **Barrel Exports**: Se han implementado archivos `index.ts` en carpetas como `/utils`, `/services`, `/models` y `/components` para simplificar las importaciones y mejorar la limpieza del código.

##  Configuraciones Específicas

* **Control de Dependencias**: Se ha realizado una eliminación manual de las actualizaciones automáticas (carets/tildes) en el `package.json` para garantizar la estabilidad de las versiones y evitar conflictos inesperados.
* **Imports Rápidos**: Se ha configurado el proyecto (vía `vite.config.ts` y `tsconfig.json`) para soportar alias de rutas, facilitando el mantenimiento y la lectura de los archivos al evitar rutas relativas complejas.

##  Funcionalidades y UX

1.  **Pantalla de Inicio**: La primera pantalla muestra un "entrante" interactivo donde el usuario debe realizar scroll para visualizar una animación completa inspirada en el portal y la estética de la serie.
2.  **Buscador de Personajes**: Una vez dentro de la aplicación principal, el usuario puede buscar personajes por:
    * Nombre
    * Especie
    * Localización
3.  **Paginación**: Sistema de navegación fluido para explorar todos los resultados de la API.

##  Escalabilidad

Este proyecto no es solo una solución a corto plazo, sino que ha sido preparado para crecer:
* **Nuevas APIs**: El código ya contempla estructuras para integrar próximamente los endpoints de **Localizaciones** y **Episodios**.
* **Temas**: Se ha dejado preparada la base para implementar un sistema de **Tema Claro y Oscuro**.
* **Tipado**: Uso riguroso de TypeScript para asegurar que las nuevas funcionalidades sean fáciles de implementar sin introducir bugs.

---

Este proyecto ha sido desarrollado como una prueba técnica (Frontend Test) enfocada en la eficiencia, el orden arquitectónico y la fidelidad visual a la temática de Rick & Morty.