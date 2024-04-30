<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\User;

class UsersController extends Controller
{
    public function index(){
        $users=User::all();
        return response()->json(["data"=>$users]);
    }

    public function store(SaveUserRequest $request){
        $name=$request->name;
        $email=$request->email;
        $phone_number=$request->phone_number;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('public/uploads');
            $url = Storage::url($path);
        } else {
            $url = null;
        }
        $user=User::create([
            'name'=>$name,
            'email'=>$email,
            'phone_number'=> $phone_number,
            'file_path'=>$url
        ]);

        if($user){
            return response()->json(["data"=>$user,"message"=>'Success']);
        }else{
            return response()->json(["data"=>null,"message"=>'Something went Wrong']);
        }
    }
    public function update(SaveUserRequest $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(["message" => 'User not found'], 404);
        }

        $name=$request->name;
        $email=$request->email;
        $phone_number=$request->phone_number;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('public/uploads');
            $url = Storage::url($path);
        } else {
            $url = null;
        }
        $user->fill([
            'name'=>$name,
            'email'=>$email,
            'phone_number'=> $phone_number,
            'file_path'=>$url
        ]);

        if ($user->save()) {
            return response()->json(["data" => $user, "message" => 'User updated successfully']);
        } else {
            return response()->json(["message" => 'Failed to update user'], 500);
        }
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(["message" => 'User not found'], 404);
        }

        if ($user->delete()) {
            return response()->json(["message" => 'User deleted successfully']);
        } else {
            return response()->json(["message" => 'Failed to delete user'], 500);
        }
    }

}
