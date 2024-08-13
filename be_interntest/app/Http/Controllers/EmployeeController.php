<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Division;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with('division');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('division_id')) {
            $query->where('division_id', $request->division_id);
        }

        $employees = $query->paginate(10);

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diambil',
            'data' => [
                'employees' => $employees->items()
            ],
            'pagination' => [
                'total' => $employees->total(),
                'per_page' => $employees->perPage(),
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'position' => 'required|string|max:255',
            'division_id' => 'required|uuid|exists:divisions,id_division',
            'image' => 'nullable|image|max:2048',
        ]);

        $employee = new Employee($validated);

        if ($request->hasFile('image')) {
            $employee->image = $request->file('image')->store('images', 'public');
        }

        $employee->id_employee = (string) Str::uuid();
        $employee->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil ditambahkan'
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'position' => 'required|string|max:255',
            'division_id' => 'required|uuid|exists:divisions,id_division',
            'image' => 'nullable|image|max:2048',
        ]);

        $employee->fill($validated);

        if ($request->hasFile('image')) {
            $employee->image = $request->file('image')->store('images', 'public');
        }

        $employee->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diperbarui'
        ]);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil dihapus'
        ]);
    }
}