<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Division;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        $employees = [
            [
                'name' => 'Employee 1',
                'phone' => '0812345678910',
                'position' => 'Junior Developer',
                'division_name' => 'Full Stack',
                'image' => 'foto.png'
            ]
        ];

        foreach ($employees as $employeeData) {
            $division = Division::where('name', $employeeData['division_name'])->first();

            Employee::create([
                'id_employee' => (string) Str::uuid(),
                'name' => $employeeData['name'],
                'phone' => $employeeData['phone'],
                'position' => $employeeData['position'],
                'division_id' => $division->id_division,
                'image' => $employeeData['image'],
            ]);
        }
    }
}