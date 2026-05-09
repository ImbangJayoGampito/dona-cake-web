<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\RoleEnum;
use App\Enums\ModuleEnum;
use App\Enums\CrudPermissions;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // -------------------------------------------------------
        // Roles
        // -------------------------------------------------------
        $admin    = RoleEnum::Admin->value;
        $karyawan = RoleEnum::Karyawan->value;
        $user     = RoleEnum::User->value;

        // -------------------------------------------------------
        // Permissions per role
        // -------------------------------------------------------
        $adminPermissions = array_merge(
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Produk),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Pesanan),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Booking),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Keuangan),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Laporan),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::KatalogMenu),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Auth),
        );

        $karyawanPermissions = array_merge(
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Produk),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Pesanan),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::Booking),
            CrudPermissions::AllPermissionsWithModule(ModuleEnum::KatalogMenu),
            [
                CrudPermissions::Read->WithModule(ModuleEnum::Keuangan),
                CrudPermissions::Read->WithModule(ModuleEnum::Laporan),
            ],
        );

        $userPermissions = [
            CrudPermissions::Read->WithModule(ModuleEnum::KatalogMenu),
            CrudPermissions::Create->WithModule(ModuleEnum::Pesanan),
            CrudPermissions::Read->WithModule(ModuleEnum::Pesanan),
            CrudPermissions::Create->WithModule(ModuleEnum::Booking),
            CrudPermissions::Read->WithModule(ModuleEnum::Booking),
            CrudPermissions::Read->WithModule(ModuleEnum::Laporan),
        ];

        // -------------------------------------------------------
        // Seed all permissions to DB
        // -------------------------------------------------------
        $allPermissions = array_unique(array_merge(
            $adminPermissions,
            $karyawanPermissions,
            $userPermissions,
        ));

        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // -------------------------------------------------------
        // Create roles and sync permissions
        // -------------------------------------------------------
        Role::firstOrCreate(['name' => $admin])
            ->syncPermissions($adminPermissions);

        Role::firstOrCreate(['name' => $karyawan])
            ->syncPermissions($karyawanPermissions);

        Role::firstOrCreate(['name' => $user])
            ->syncPermissions($userPermissions);

        // -------------------------------------------------------
        // Default admin user
        // -------------------------------------------------------
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'username' => 'admin',
                'name'     => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );
        $adminUser->assignRole($admin);
    }
}
