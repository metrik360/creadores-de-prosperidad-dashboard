# 🌐 Guía de Configuración de Dominios - MÉTRIK

**Fecha**: 26 de Noviembre, 2025
**Status**: ✅ Sistema Listo para Activar

---

## 📋 Resumen del Sistema

Hemos creado una arquitectura profesional con:

1. **Landing Page**: metrik.com.co
2. **Sistema de Autenticación**: auth.metrik.com.co
3. **Dashboards por Cliente**: creadores.metrik.com.co, cliente2.metrik.com.co, etc.

---

## 🔧 PASO 1: Configurar DNS en mi.com.co

### Registros A (ya configurados en GitHub, solo verificar):

Ve a tu panel de DNS en mi.com.co y verifica que existan:

```
Tipo: A
Host: @
IP: 185.199.108.153

Tipo: A
Host: @
IP: 185.199.109.153

Tipo: A
Host: @
IP: 185.199.110.153

Tipo: A
Host: @
IP: 185.199.111.153
```

### Registros CNAME (DEBES CREAR):

```
Tipo: CNAME
Host: www
Valor: metrik360.github.io

Tipo: CNAME
Host: auth
Valor: metrik360.github.io
```

**Tiempo de propagación**: 15-30 minutos generalmente

---

## 🔐 Credenciales por Cliente

### Cliente: Creadores de Prosperidad

- **URL de Acceso**: auth.metrik.com.co
- **Seleccionar**: "Creadores de Prosperidad"
- **Contraseña**: `CreadoresOps2025!`
- **Dashboard**: https://metrik360.github.io/creadores-de-prosperidad-dashboard/

⚠️ **ACCIÓN REQUERIDA**: Cambiar esta contraseña por una segura en producción

---

## 📱 Flujo de Acceso

### Paso 1: Usuario accede a Landing
```
https://metrik.com.co/
```

### Paso 2: Hace clic en "Acceder a Dashboard"
Se redirige a página de autenticación

### Paso 3: Ingresa credenciales
```
Cliente: Creadores de Prosperidad
Contraseña: CreadoresOps2025!
```

### Paso 4: Accede al Dashboard
Dashboard completamente funcional con todas las hojas y filtros

---

## 🗂️ Estructura de Repositorios

### 1. Landing Page
- **Repositorio**: https://github.com/metrik360/metrik-landing
- **Dominio**: metrik.com.co
- **Contenido**: Página de ventas, descripción de servicios, CTA

### 2. Sistema de Autenticación
- **Repositorio**: https://github.com/metrik360/metrik-auth
- **Dominio**: auth.metrik.com.co
- **Contenido**: Login con cliente + contraseña, redirección a dashboards

### 3. Dashboard Creadores
- **Repositorio**: https://github.com/metrik360/creadores-de-prosperidad-dashboard
- **Dominio**: (Sin subdominio por ahora, acceso vía auth)
- **Contenido**: 3 hojas (General, Estudiante, Marketing) con filtros completos

---

## 🔄 Para Agregar Nuevos Clientes

### 1. En el archivo metrik-auth/index.html:

Agregar nueva entrada en el objeto `CLIENTS`:

```javascript
'cliente_nuevo': {
    name: 'Nombre del Cliente',
    password: 'PasswordSegura123!',
    url: 'https://metrik360.github.io/cliente-nuevo-dashboard/'
}
```

Y en el select HTML:
```html
<option value="cliente_nuevo">Nombre del Cliente</option>
```

### 2. Crear nuevo repositorio de dashboard para el cliente

### 3. Hacer push de cambios a metrik-auth

---

## ✅ Checklist de Configuración

- [x] Landing page creada y desplegada
- [x] Sistema de autenticación creado
- [x] Dashboard Creadores configurado
- [x] Repositorios en GitHub configurados
- [x] CNAME agregados a repositorios
- [ ] **TODO**: Crear registros CNAME en mi.com.co (auth, www)
- [ ] **TODO**: Esperar propagación DNS (15-30 min)
- [ ] **TODO**: Probar acceso a metrik.com.co
- [ ] **TODO**: Cambiar contraseñas por seguras en producción
- [ ] **TODO**: Configurar subdominios para cada cliente (creadores.metrik.com.co, etc.)

---

## 🚀 URLs de Acceso

| Recurso | URL | Status |
|---------|-----|--------|
| Landing Page | https://metrik.com.co | ⏳ Pendiente DNS |
| Autenticación | https://auth.metrik.com.co | ⏳ Pendiente DNS |
| Dashboard Creadores (vía auth) | auth.metrik.com.co → Creadores | ✅ Listo |
| Dashboard Directo | https://metrik360.github.io/creadores-de-prosperidad-dashboard/ | ✅ Listo |

---

## 🔐 IMPORTANTE - Seguridad

⚠️ **Las contraseñas actuales son de prueba**

Para producción, necesitas:

1. Cambiar todas las contraseñas a valores seguros
2. Implementar un sistema de autenticación más robusto (backend)
3. No almacenar contraseñas en el código fuente

Opciones para mejorar seguridad:
- Backend con Node.js + Express
- Autenticación OAuth (Google, Microsoft)
- Servicio de autenticación como Auth0
- Base de datos con contraseñas hasheadas

---

## 📞 Soporte

Si algo no funciona después de configurar DNS:

1. Verifica que los registros DNS se propagaron (usa dig o nslookup)
2. Limpia caché del navegador (Ctrl+Shift+Delete)
3. Prueba en navegador incógnito
4. Verifica que GitHub Pages está configurado correctamente

---

**Próximos Pasos**:
1. Configurar registros CNAME en mi.com.co
2. Esperar propagación DNS
3. Probar acceso a todos los dominios
4. Cambiar contraseñas por seguras
5. Contactar a cliente con credenciales seguras

