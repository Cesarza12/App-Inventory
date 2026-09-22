<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\InventoryMovementController;

Route::middleware('auth:sanctum')->group(function () {

   Route::get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,

        // Rol real del usuario.
        'role' => $user->role,

        // Modo en el que está trabajando actualmente.
        'mode' => session('operating_mode', $user->role),

        // Permisos efectivos según el modo actual.
        'permissions' => $user->effectivePermissions(),
    ]);
});

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    Route::apiResource('products', ProductController::class);

    Route::get('/inventory-movements', [InventoryMovementController::class, 'index']);
    Route::post('/inventory-movements', [InventoryMovementController::class, 'store']);
    Route::get('/inventory-movements/{inventoryMovement}', [InventoryMovementController::class, 'show']);

    Route::get('/categories/{category}', [CategoryController::class, 'show']);
});