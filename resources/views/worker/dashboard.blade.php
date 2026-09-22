<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Panel del Trabajador</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">

    <div class="min-h-screen">

        <!-- Encabezado -->
        <header class="bg-blue-600 text-white shadow">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

                <div>
                    <p class="text-xs opacity-80">
                        Sistema de inventario
                    </p>

                    <!--<h1 class="text-xl font-bold">
                        Panel del Trabajador
                    </h1>-->
                </div>

                <div class="text-right">
                    <p class="text-sm font-semibold">
                        {{ auth()->user()->name }}
                    </p>

                    <p class="text-xs opacity-80">
                        Trabajador
                    </p>
                </div>

            </div>
        </header>


        <!-- Contenido -->
        <main class="mx-auto max-w-6xl px-5 py-6">

            <!-- Bienvenida -->
            <div class="mb-5">
                <h2 class="text-xl font-bold text-gray-800">
                    Bienvenido, {{ auth()->user()->name }}
                </h2>

                <p class="mt-1 text-sm text-gray-600">
                    Selecciona una operación para trabajar con el inventario.
                </p>
            </div>


            <!-- Operaciones principales -->
            <section>

                <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Operaciones de inventario
                </h3>

                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <!-- Productos -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                            📦
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Productos
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Consulta los productos disponibles en el inventario.
                        </p>

                        <a
                            href="http://127.0.0.1:5174/"
                            class="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                            Consultar
                        </a>

                    </div>


                    <!-- Categorías -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                            🏷️
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Categorías
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Consulta las categorías registradas en el sistema.
                        </p>

                        <a
                            href="http://127.0.0.1:5174/categories"
                            class="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                            Consultar
                        </a>

                    </div>


                    <!-- Movimientos -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xl">
                            🔄
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Movimientos
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Consulta las entradas y salidas registradas.
                        </p>

                        <a
                            href="http://127.0.0.1:5174/movements"
                            class="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                            Consultar
                        </a>

                    </div>


                    <!-- Registrar movimiento -->
                    <div class="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">

                        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-xl">
                            ➕
                        </div>

                        <h4 class="text-base font-bold text-gray-800">
                            Registrar movimiento
                        </h4>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Registra una entrada o salida de inventario.
                        </p>

                        <a
                            href="http://127.0.0.1:5174/movements/create"
                            class="mt-3 inline-block rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700">
                            Registrar
                        </a>

                    </div>

                </div>

            </section>


            <!-- Información del rol -->
            <section class="mt-5 rounded-lg bg-white p-4 shadow-sm">

                <div class="flex items-start gap-3">

                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
                        ℹ️
                    </div>

                    <div>
                        <h3 class="text-sm font-bold text-gray-800">
                            Acceso del trabajador
                        </h3>

                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Puedes consultar información del inventario y registrar
                            movimientos. La administración de productos y categorías
                            está restringida al administrador.
                        </p>
                    </div>

                </div>

            </section>


            <!-- Cerrar sesión -->
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