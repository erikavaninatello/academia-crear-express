import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function verificarSesion(req, res, next) {
  const token = req.signedCookies['token']

  if (!token) {
    const esApi = req.originalUrl.startsWith('/api/')
    if (esApi) return res.status(401).json({ error: 'No autorizado' })
    return res.redirect('/login')
  }

  jwt.verify(token, process.env.JWT_FIRMA, (error, decoded) => {
    if (error) {
      const esApi = req.originalUrl.startsWith('/api/')
      if (esApi) return res.status(401).json({ error: 'Token inválido o expirado' })

      // Si el token expiró, avisamos al login con parámetro
      if (error.name === 'TokenExpiredError') {
        return res.redirect('/login?expired=1')
      }

      return res.redirect('/login')
    }

    req.usuario = decoded
    next()
  })
}