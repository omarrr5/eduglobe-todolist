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
        if (!Schema::hasTable('items')) {
            Schema::create('items', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('todo_id');
                $table->string('title');
                $table->timestamps();
            });

            if (Schema::hasTable('todos')) {
                Schema::table('items', function (Blueprint $table) {
                    $table->foreign('todo_id')->references('id')->on('todos')->onDelete('cascade');
                });
            }
        }
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
