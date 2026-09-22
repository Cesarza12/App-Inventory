<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Productos</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563eb">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Inventario">

</head>

<body class="min-h-screen bg-gray-100">

    <div class="mx-auto min-h-screen max-w-md bg-white shadow">

        <!-- Encabezado -->
        <header class="bg-blue-600 px-5 py-5 text-white">

            <a href="http://127.0.0.1:8000/inventory" class="text-sm opacity-80">
                ← Volver
            </a>

            <h1 class="mt-2 text-2xl font-bold">
                Productos
            </h1>

        </header>

        <!-- Contenido -->
        <main class="p-5">

            <div class="mb-5 flex items-center justify-between">

                <h2 class="text-lg font-semibold">
                    Inventario
                </h2>

                <a
                  href="/products/create"
                  class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  + Nuevo
              </a>

            </div>

            <!-- Aquí aparecerán los productos -->
            <div id="products-list" class="space-y-4">

                <p class="text-center text-gray-500">
                    Cargando productos...
                </p>

            </div>

        </main>

    </div>

</body>
</html>