- Tener redis instalado o dockerizado

`docker run -p 6379:6379 --name some-redis -d redis`

- Instalar paquetes

`npm install`

- Levantar servidor

`npm run dev`

- Para ver los datos en redis ejecutar

`redis-commander`

- El redis commander estara en

`http://127.0.0.1:8081/`

Se pueden realizar las peticiones que se encuentran en characters.http pero deber tenes la extension REST Client para Visual Studio Code

Al hacerlas ver el tiempo tomado sin la respuesta en redis, y en el commander se puede borrar el registro y volver a hacer las peticiones con tiempo original y luego comparar con la respuesta de redis
