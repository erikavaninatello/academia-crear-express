import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// POST /autenticar — recibe usuario y clave desde el formulario de login
export async function autenticar(req, res) {
  const { usuario, clave } = req.body

  const usuarioCorrecto = process.env.ADMIN_USUARIO
  const claveCorrecto   = process.env.ADMIN_CLAVE

  if (!usuario || !clave) {
    return res.redirect('/login?error=1')
  }

  // Verificamos usuario
  if (usuario !== usuarioCorrecto) {
    return res.redirect('/login?error=1')
  }

  // Verificamos clave con bcrypt
  const verificado = await bcrypt.compare(clave, claveCorrecto)
  if (!verificado) {
    return res.redirect('/login?error=1')
  }

  // Credenciales correctas → creamos el JWT
  jwt.sign(
    { usuario, rol: 'admin' },       // payload — datos que viajan en el token
    process.env.JWT_FIRMA,            // clave secreta para firmar
    { expiresIn: '2h' },             // expira en 2 horas
    (error, token) => {
      if (error) return res.redirect('/login?error=1')

      // Mandamos el token como cookie
      res.cookie('token', token, {
        httpOnly: true,
        signed:   true,
        sameSite: 'lax',
        secure:   process.env.NODE_ENV === 'production',
        maxAge:   1000 * 60 * 60 * 2
      })

      res.redirect('/admin')
    }
  )
}

// GET /cerrar-sesion — borra la cookie y vuelve al login
export function cerrarSesion(req, res) {
  res.clearCookie('token')
  res.redirect('/login')
}