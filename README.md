Guía de Despliegue: Sabores Venearg

Bienvenido al proyecto Sabores Venearg, una aplicación web dinámica construida con React que ofrece un menú digital, carrito de compras, y un robusto panel de administración para gestionar productos.

🚀 Requisitos y Tecnologías Usadas
React: Biblioteca principal para la construcción de la interfaz de usuario.

Styled Components: Para el manejo de estilos a nivel de componente.

React Router Dom: Para una navegación fluida entre las diferentes páginas de la aplicación.

Context API: Se utiliza para la gestión de estados globales, como el carrito de compras y la autenticación del usuario administrador.

React Toastify: Para proporcionar notificaciones de usuario claras y concisas.

MockAPI: Backend simulado utilizado para la persistencia de datos de productos.

⚙️ Instalación y Uso
Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. Clonar el Repositorio
git clone https://github.com/tu-usuario/nombre-de-tu-proyecto.git
cd nombre-de-tu-proyecto

2. Instalar las Dependencias
npm install

3. Iniciar la Aplicación
npm run dev

La aplicación estará disponible en http://localhost:5173.

✅ Pruebas de Compatibilidad y Optimización
Antes de desplegar la aplicación, es vital asegurarse de que todo funciona como se espera en todos los dispositivos y que el código es eficiente.

Pruebas en Móviles y Tablets: Utiliza las herramientas de desarrollo de tu navegador para simular diferentes tamaños de pantalla y orientaciones. También, prueba la aplicación en dispositivos físicos para verificar la experiencia de usuario real.

Tiempos de Carga: Revisa los tiempos de carga de la aplicación en la pestaña de Performance de las herramientas de desarrollo del navegador. Asegúrate de que las imágenes se carguen de manera optimizada y que no haya peticiones de red innecesarias.

Optimización del Código: Elimina cualquier console.log() o código de depuración que no sea necesario. Verifica que los estados globales se gestionen correctamente sin causar re-renderizados excesivos.

🔑 Funcionalidad de Administración
La aplicación incluye un panel de administración para gestionar los productos. Para acceder a él:

Inicia sesión como administrador.

Accede a la sección de Comidas o Postres.

Verás un botón para "Agregar Nuevo Producto".

En las tarjetas de productos existentes, los administradores verán botones para editar y eliminar productos.

🌐 Despliegue
Una vez que hayas realizado las pruebas y la optimización, puedes desplegar tu aplicación en servicios de hosting estático o de servidor. Las opciones más populares para aplicaciones de React incluyen:

Netlify

Vercel

GitHub Pages

Estos servicios se conectan directamente a tu repositorio de Git y despliegan la aplicación automáticamente cada vez que realizas un push a la rama principal.

Erika Oropeza
Talento Tech 2025