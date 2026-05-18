<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Run role & permission seeder first
        $this->call(RoleSeeder::class);

        // Seed fake users and assign role
        User::factory(24)->create()->each(fn($user) => $user->assignRole(RoleEnum::User->value));

        // Seed test user
        $testUser = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'username' => 'test',
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);

        $testUser->assignRole(RoleEnum::User->value);

        // Seed product catalog for Ulasan review testing
        $this->call(ProductSeeder::class);
    }
}
