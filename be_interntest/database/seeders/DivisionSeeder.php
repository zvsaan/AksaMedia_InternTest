<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Division;

class DivisionSeeder extends Seeder
{
    public function run()
    {
        $divisions = [
            'Mobile Apps',
            'QA',
            'Full Stack',
            'Backend',
            'Frontend',
            'UI/UX Designer'
        ];

        foreach ($divisions as $division) {
            Division::create([
                'id_division' => (string) \Illuminate\Support\Str::uuid(),
                'name' => $division,
            ]);
        }
    }
}