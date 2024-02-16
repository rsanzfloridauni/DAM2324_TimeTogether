# TimeTogether API

<p align="center">
  <img src="./imagenes/Logo.png" alt="TimeTogether Logo" />
</p>

## Descripción
TimeTogether es una API diseñada para facilitar la gestión de eventos, grupos y la interacción entre usuarios. Permite a los usuarios registrarse, unirse a grupos, crear y participar en eventos, y mantener una lista de amigos.

## Endpoints Principales

### Registrar Usuario
- **POST** `/TimeTogether/newUser`
- Crea un nuevo usuario con los datos proporcionados en formato JSON.

### Iniciar Sesión
- **POST** `/TimeTogether/user`
- Verifica las credenciales del usuario y devuelve su información si son correctas.

### Crear Grupo
- **POST** `/TimeTogether/newGroup`
- Permite a un usuario crear un nuevo grupo proporcionando los detalles necesarios en formato JSON.

### Añadir Amigo
- **POST** `/TimeTogether/addFriend`
- Añade un usuario a la lista de amigos de otro usuario mediante el ID del usuario y el correo electrónico del amigo.

### Crear Evento
- **POST** `/TimeTogether/newEvent`
- Crea un nuevo evento y lo asocia a un grupo existente.

### Obtener Información de Grupo
- **GET** `/TimeTogether/group?id={groupId}`
- Devuelve la información de un grupo específico basado en su ID.

### Obtener Amigos de un Usuario
- **GET** `/TimeTogether/friends?id={userId}`
- Devuelve una lista de amigos del usuario especificado.
