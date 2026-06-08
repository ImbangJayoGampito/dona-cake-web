<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;
class KategoriController extends Controller
{
    public function apiIndex()
    {
        $kategoris = Kategori::all();
        return response()->json(["status" => "success", "data" => $kategoris]);
    }
}
