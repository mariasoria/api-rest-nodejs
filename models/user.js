'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// esto se enviará en el body de la request
const UserSchema = new Schema ({
    email: {type: String, unique: true, lowercase: true}, 
    displayName: String, 
    avatar: String,
    password: {type: String, select:false}, 
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date,
});

// 'pre' indica que lo siguiente se ejecute antes de que se guarde.
// next es para que vaya pasando al siguiente middleware, que no se quede parada la función
// le decimos que antes de 'save', se ejecute lo que hay detras de =>
UserSchema.pre('save', function(next) {
    let user = this; // user será todo el modelo que se le haya pasado
    // Comprobamos si el usuario no ha modificado su contraseña y pasamos al siguiente
    if (!user.isModified('password')) return next();
    
    // generamos un salt de 10 (bits aleatorios que se añaden a la contraseña para hashearla)
    // Devuelve err si hay error en el salt, y el propio salt
    bcrypt.genSalt('10', (err, salt) => {
        if (err)
            return next(err);
        
        // Hasheamos la contraseña (user.password) con el salt que hemos generado
        // recibe err y hash
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err)
                return next(err);
            
                //asignamos el hash generado como contraseña.
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.gravatar = function () {
    // si el usuario no tiene un email registrado en su avatar, devolverá un avatar por defecto
    if (!this.email)
        return `https://gravatar.com/avatar/?s=200&d=retro`;
    
    // En caso de haber email, entonces habrá un avatar subido. Lo recuperamos con lo siguiente.
    // Funcion que crea un hash en md5 (a partir del email del user) que por defecto 
    // se añadirá en la url del avatar en cuestión.
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

module.exports = mongoose.model('User', UserSchema);