<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TodosController extends Controller
{
    public function index($id)
    {
        $todos = Todo::where('user_id', $id)->get();
        return response()->json($todos, 200);
    }
    
    public function store(Request $request , $userId)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task = new Todo();
        $task->title = $validatedData['title'];
        $task->user_id  = $userId;

        $task->save();

        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    }

    public function storeItem(Request $request, Todo $todo)
    {
        $request->validate([
            'title' => 'required|string',
        ]);

        $item = new Item([
            'title' => $request->input('title'),
        ]);

        $todo->items()->save($item);

        return response()->json(['message' => 'Item created successfully', 'item' => $item], 201);
    }

    public function update(Request $request, Todo $todo){
        $data = $request->validate([
            'title' => 'required|string',
            'completed' => 'required|boolean'
        ]);
        $todo->update($data);
        return response($todo, 200);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response('Deleted todo item', 200);
    }
}
