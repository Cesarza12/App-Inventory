<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */

    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Movimientos de inventario realizados por el usuario.
     */
    public function inventoryMovements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }

    /**
     * Roles asignados al usuario.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
    
        public function hasPermission(string $permission): bool
    {
        return $this->roles()
            ->whereHas('permissions', function ($query) use ($permission) {
                $query->where('clave', $permission);
            })
            ->exists();
    }

    /**
     * Obtiene los permisos efectivos según el modo de operación actual.
     */
    public function effectivePermissions()
    {
        $mode = session('operating_mode');

        // Si un administrador está trabajando en modo trabajador,
        // utiliza los permisos correspondientes al rol worker.
        if ($this->role === 'admin' && $mode === 'worker') {
            $workerRole = Role::where('nombre', 'worker')
                ->with('permissions')
                ->first();

            return $workerRole
                ? $workerRole->permissions->pluck('clave')->unique()->values()
                : collect();
        }

        // En modo normal, utiliza los permisos reales del usuario.
        return $this->roles()
            ->with('permissions')
            ->get()
            ->flatMap(function ($role) {
                return $role->permissions->pluck('clave');
            })
            ->unique()
            ->values();
    }

    /**
     * Comprueba si el usuario tiene un permiso efectivo
     * en el modo de operación actual.
     */
    public function hasEffectivePermission(string $permission): bool
    {
        return $this->effectivePermissions()->contains($permission);
    }
}