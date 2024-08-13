<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Admin::create([
            'id_admin' => (string) \Illuminate\Support\Str::uuid(),
            'name' => 'Admin 1',
            'username' => 'admin',
            'phone' => '081234567890',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('pastibisa'),
        ]);
    }
}
