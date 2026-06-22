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
        // Run role & permission seeder first (idempotent)
        $this->call(KategoriSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(ProdukSeeder::class);

        if (app()->environment('local')) {
            $this->call(PesananSeeder::class);

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
        } else {
            // Seed a test user without factory for production
            $testUser = User::firstOrCreate(
                ["email" => "test@example.com"],
                [
                    "username" => "test",
                    "name" => "Test User",
                    "password" => bcrypt("password"),
                ]
            );
            $testUser->assignRole(RoleEnum::User->value);

            // Create pelanggan record if not exists
            Pelanggan::firstOrCreate(["user_id" => $testUser->id]);
        }
    }
}
