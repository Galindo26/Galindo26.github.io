# Galindo26.github.io

Sitio web y portfolio profesional de **Daniel Galindo Aranda** (Estudiante de Ingeniería Electrónica, Robótica y Mecatrónica en la Universidad de Málaga). 

Alojado de forma nativa mediante **GitHub Pages** en:
👉 **[https://galindo26.github.io](https://galindo26.github.io)**

---

## 🚀 Arquitectura y Tecnologías
- **HTML5 Semántico:** Estructura limpia y accesible.
- **CSS3 Moderno:** Variables nativas (`--custom-properties`), diseño responsive (Mobile / Tablet / Desktop), estética oscura nativa con soporte para cambio de tema claro/oscuro.
- **JavaScript Vanilla:** Animaciones suaves mediante `IntersectionObserver`, control de tema persistente en `localStorage` y cero dependencias externas o frameworks pesados.

---

## 📁 Estructura del Repositorio
```
Galindo26.github.io/
├── index.html       # Estructura principal y contenido
├── style.css        # Sistema de diseño, variables y temas
├── script.js        # Lógica de interacción, tema y animaciones
└── README.md        # Documentación del proyecto (este archivo)
```

---

## 🛠️ Cómo Actualizar y Añadir Nuevos Proyectos

El sitio está diseñado de forma modular. Para añadir un nuevo proyecto cuando esté listo para publicarse:

1. Abre `index.html`.
2. Localiza la sección `<section id="projects">` dentro de `<div class="grid-2">`.
3. Duplica un bloque `<div class="project-card">` y actualiza:
   - **Título y Categoría:** Nombre del proyecto y campo de aplicación.
   - **Badge de Estado:** Por ejemplo `<span class="badge badge-accent">Código Abierto</span>` o `En Desarrollo`.
   - **Descripción y Tecnologías:** Resumen del proyecto y etiquetas.
   - **Enlace:** Puedes convertir el título o añadir un botón `<a href="https://github.com/Galindo26/nombre-repo" class="btn btn-outline-sm">Ver Repositorio</a>`.
4. Haz `git commit` y `git push` a la rama `main`. GitHub Pages desplegará los cambios automáticamente en pocos segundos.

---

## 📬 Contacto
- **Correo Electrónico:** [galindoaranda26@gmail.com](mailto:galindoaranda26@gmail.com)
- **Perfil de GitHub:** [Galindo26](https://github.com/Galindo26)