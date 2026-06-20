<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pelanggan;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Run role & permission seeder first
        $this->call(KategoriSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(ProdukSeeder::class);

        // Seed fake users and assign role
        User::factory(24)
            ->create()
            ->each(fn($user) => $user->assignRole(RoleEnum::User->value));

        // Seed test user
        User::factory()
            ->create([
                "username" => "test",
                "name" => "Test User",
                "email" => "test@example.com",
            ])
            ->assignRole(RoleEnum::User->value);
        // Create pelanggan based on all of the user
        User::all()->each(
            fn($user) => Pelanggan::factory()->create(["user_id" => $user->id]),
        );
    }
}
