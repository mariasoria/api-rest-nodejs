// definimos el puerto con una variable de entorno, 
// y si no indicamos nada, por defecto cogerá el puerto 3001
// definimos también la dirección de la BD, si no ponemos nada
// se le pasará 'mongodb://urlypuerto/nombrequequeramos'
module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
    SECRET_TOKEN: 'iudsnlkoAISusa',
}