/*
Si quieren utilizar un hash distinto, utilizar este script.
Instalar:
 pn install
Ejecutar:
 npm run generar-hash
*/

import bcrypt from 'bcryptjs'

bcrypt.hash('admin123', 10, (err, hash) => {
    console.log(hash)
})
