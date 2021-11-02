# Iskaypet
Prueba técnica

<br>

## Contacto
Eduardo Sánchez<br>
whipshout@gmail.com<br>
https://www.linkedin.com/in/eduardo-sanchez-sanchez/

<br>

## Endpoints
Swagger - Se pueden ejecutar todos los endpoints desde aquí y modifica las bases de datos:
  - Pets microservice: http://www.whipshout.xyz/api/pets/swagger/
  - Stats microservice: http://www.whipshout.xyz/api/stats/swagger/
  
Pets - Microservicio para añadir mascotas y recuperar la lista de mascotas:
  - Get (Recuperar lista): http://www.whipshout.xyz/api/pets/lismascotas
  - Post (Añadir mascota, necesita un json con name:string, species:string, gender:string, age:number, birthdate:string): http://www.whipshout.xyz/api/pets/creamascota
  
Stats - Microservicio para calcular los KPIs de las mascotas guardadas en el microservicio de Pets
  - Get (Calcular KPIs): http://www.whipshout.xyz/api/stats/kpidemascotas
  
<br>

## Información
App:
  - Cada servicio está dockerizado de manera indendiente y orquestado en un cluster de Kubernetes.
  - La comunicación entre los microservicios se realiza a traves de un event-bus, en este caso Nats-Streaming.
  - Al crear una nueva mascota, el servicio de Pets lanza un mensaje con las propiedades de la mascota que el servicio de Stats está escuchando y automáticamente guarda los datos que necesita para calcular los KPIs en la base de datos.
  - Todo está alojado en Digital-Ocean. Me decanté por este servicio simplemente porque tenía +100€ de crédito por unos cupones de promoción.
  
Pets:
  - Lleva una base de datos MongoDB asociada dentro del propio docker.
  - La fecha de nacimiento es un campo de texto, para simplificar el flujo de trabajo.
  - Los campos para el json de creación de mascota sólo tienen dos comprobaciones: que sean del tipo adecuado y que no estén vacíos.

Stats:
  - Lleva una base de datos Postgres asociada dentro del propio docker.
  - Por motivos de tiempo y simplificación, si existen varias especies con el número máximo de elementos, sólo recupera una de ellas para el cálculo de KPIs.
  - Al estar la base de datos alojada dentro del propio docker, no he realizado ninguna migración de datos. Al comenzar el servicio, crea la tabla con los valores apropiados.
