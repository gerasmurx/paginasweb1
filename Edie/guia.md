# Instrucciones

En esta ocasión crearemos una home page para una pequeña empresa, Edie.

Nuestro Cliente ya tiene el diseño definido de su página web y nos la ha enviado:

<!-- Enlace -->
- [figma repo](https://www.figma.com/file/ahnGupP4JjTdVJDTRfMRF2/edie-homepage?node-id=1%3A9)

Dentro de el archivo figma, encontrarás todo lo necesario para armar tu página web. Aún así te brindaré algo información aquí.

## Repositorio

Es importante saber que este proyecto debe ser desplegado en un repositorio de Github, con github Pages.

## Display

El tamaño de referencia de los ejemplos son:

- Desktop : 1440px
- Mobile : 375px

## Fuente

- Poppins : 300,400,500,700 (https://fonts.google.com/specimen/Poppins)

Los tamaños de fuente están especificados en el enlace de figma.

## Iconos

Todos los iconos están incluidos en la carpeta. Te recomendamos insertar los SVG de manera directa y no dentro de una etiqueta IMG, con el fin de que puedas manipular el color de relleno cuando lo necesites.

Para cambiar el color de relleno, debes llamar a la propiedad fill del elemento <svg>.

ejemplo:

svg {
  fill: #FAA;
}

