<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Panel Administrador</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">

    <div class="min-h-screen">

        <!-- ENCABEZADO -->
        <header class="bg-blue-700 text-white shadow">

            <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

                <div>
                    <p class="text-xs opacity-80">
                        Sistema de inventario
                    </p>

                  
                </div>

                <div class="text-right">
                    <p class="text-sm font-semibold">
                        {{ auth()->user()->name }}
                    </p>

                    <p class="text-xs opacity-80">
                        Administrador
                    </p>
                </div>

            </div>

        </header>


        <!-- CONTENIDO -->
        <main class="mx-auto max-w-6xl px-5 py-6">


            <!-- BIENVENIDA -->
            <div class="mb-6">

                <h2 class="text-xl font-bold text-gray-800">
                    Bienvenido, {{ auth()->user()->name }}
                </h2>

                <p class="mt-1 text-sm text-gray-600">
                    Administra y supervisa las diferentes áreas del sistema.
                </p>

            </div>


            <!-- MÓDULOS PRINCIPALES -->
            <section>

                <div class="mb-3 flex items-center justify-between">

                    <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Módulos del sistema
                    </h3>

                </div>


                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


                    <!-- INVENTARIO -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                            📦
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Inventario
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Administra productos, categorías y movimientos del inventario.
                        </p>

                        <a
                            href="http://127.0.0.1:5174"
                            class="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                            Entrar
                        </a>

                    </div>


                    <!-- USUARIOS -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-xl">
                            👥
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Usuarios
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Administra usuarios, roles y permisos del sistema.
                        </p>

                        <button
                            type="button"
                            class="mt-3 rounded-md bg-gray-400 px-3 py-2 text-xs font-semibold text-white">
                            Próximamente
                        </button>

                    </div>


                    <!-- VENTAS -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-xl">
                            💰
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Ventas
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Consulta y controla las operaciones de venta realizadas.
                        </p>

                        <button
                            type="button"
                            class="mt-3 rounded-md bg-gray-400 px-3 py-2 text-xs font-semibold text-white">
                            Próximamente
                        </button>

                    </div>


                    <!-- REPORTES -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-xl">
                            📊
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Reportes
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Consulta estadísticas e información general del sistema.
                        </p>

                        <button
                            type="button"
                            class="mt-3 rounded-md bg-gray-400 px-3 py-2 text-xs font-semibold text-white">
                            Próximamente
                        </button>

                    </div>


                    <!-- CONFIGURACIÓN -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                            ⚙️
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Configuración
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Configura los parámetros generales del sistema.
                        </p>

                        <button
                            type="button"
                            class="mt-3 rounded-md bg-gray-400 px-3 py-2 text-xs font-semibold text-white">
                            Próximamente
                        </button>

                    </div>


                    <!-- PANEL DEL TRABAJADOR -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-xl">
                            👨‍💼
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Panel del trabajador
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Accede al panel operativo para consultar y registrar movimientos.
                        </p>

                        <a
                            href="{{ route('worker.dashboard') }}"
                            class="mt-3 inline-block rounded-md bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700">
                            Entrar
                        </a>

                    </div>

                </div>

            </section>


            <!-- RESUMEN DE ACCESO -->
            <section class="mt-5 rounded-lg bg-white p-4 shadow-sm">

                <div class="flex items-start gap-3">

                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg">
                        🛡️
                    </div>

                    <div>

                        <h3 class="text-sm font-bold text-gray-800">
                            Acceso de administrador
                        </h3>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Como administrador tienes acceso completo a la gestión
                            del sistema, incluyendo inventario, usuarios, roles y
                            las funciones administrativas disponibles.
                        </p>

                    </div>

                </div>

            </section>


            <!-- CERRAR SESIÓN -->
            <div class="mt-6 flex justify-end border-t pt-5">

                <form method="POST" action="{{ route('logout') }}">

                    @csrf

                    <button
                        type="submit"
                        class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                        Cerrar sesión
                    </button>

                </form>

            </div>

        </main>

    </div>

</body>
</html>