<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Crear roles
        $admin = Role::create([
            'nombre' => 'admin',
            'descripcion' => 'Administrador del sistema',
        ]);

        $worker = Role::create([
            'nombre' => 'worker',
            'descripcion' => 'Trabajador del sistema',
        ]);

        // Crear permisos
        $permissions = [
            'productos.ver',
            'productos.crear',
            'productos.editar',
            'productos.eliminar',

            'categorias.ver',
            'categorias.crear',
            'categorias.editar',
            'categorias.eliminar',

            'movimientos.ver',
            'movimientos.crear',
            'movimientos.editar',
            'movimientos.eliminar',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'clave' => $permission,
            ]);
        }

        // Administrador: todos los permisos
        $admin->permissions()->sync(
            Permission::all()->pluck('id')
        );

        // Trabajador: permisos limitados
        $worker->permissions()->sync(
            Permission::whereIn('clave', [
                'productos.ver',
                'categorias.ver',
                'movimientos.ver',
                'movimientos.crear',
            ])->pluck('id')
        );
    }
}