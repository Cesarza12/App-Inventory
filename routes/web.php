<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Dashboard general
|--------------------------------------------------------------------------
| Redirige al usuario según su rol después de iniciar sesión.
*/

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    if ($user->role === 'worker') {
        return redirect()->route('worker.dashboard');
    }

    abort(403, 'El usuario no tiene un rol válido.');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Perfil
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Panel administrador
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin', 'mode:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/', function () {
            return view('dashboard');
        })->name('admin.dashboard');
    });

/*
|--------------------------------------------------------------------------
| Inventario
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])
    ->group(function () {

        Route::get('/inventory', function () {
            return view('inventory.index');
        })->name('inventory.index');

        Route::get('/products', function () {
            return view('inventory.products');
        })->name('products.page');

        Route::get('/products/create', function () {
            return view('inventory.product-create');
        })->name('products.create');
    });

/*
|--------------------------------------------------------------------------
| Panel trabajador
|--------------------------------------------------------------------------
| Tanto admin como worker pueden acceder al panel del trabajador.
*/

Route::middleware(['auth', 'role:admin,worker', 'mode:worker'])
    ->prefix('worker')
    ->group(function () {

        Route::get('/', function () {
            return view('worker.dashboard');
        })->name('worker.dashboard');
    });

require __DIR__.'/auth.php';