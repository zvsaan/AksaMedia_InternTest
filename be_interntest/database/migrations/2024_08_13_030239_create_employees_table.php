<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->uuid('id_employee')->primary();
            $table->string('name');
            $table->string('phone');
            $table->string('position');
            $table->uuid('division_id');
            $table->foreign('division_id')->references('id_division')->on('divisions')->onDelete('cascade');
            $table->string('image')->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
