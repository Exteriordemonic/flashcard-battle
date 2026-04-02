import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuthStore } from './stores/authStore'

 
// Sprawdza, czy użytkownik wszedł na stronę login i posiada token w cookies – przekieruj na dashboard
export function proxy(request: NextRequest) {

  console.log('proxy hit')
  const { pathname } = request.nextUrl
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  // Jeśli próbujemy wejść na /login i mamy token, przekieruj do /dashboard
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  // Możesz dodać inne warunki tutaj, np. blokadę /dashboard bez tokena
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/'],
}