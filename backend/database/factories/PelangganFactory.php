<?php namespace Database\Factories;

use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PelangganFactory extends Factory
{
    protected $model = Pelanggan::class;

    public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "alamat" => $this->faker->address(),
            "no_telepon" => $this->faker->phoneNumber(),
        ];
    }
}
