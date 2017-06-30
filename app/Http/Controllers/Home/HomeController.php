<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class HomeController extends Controller
{
    public function getNewProducts()
    {
        $products = Product::with('images')
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->take(config('settings.home_product'))
            ->get();

        return Response()->json(['products' => $products], 200);
    }

    public function getCategories()
    {
        $categories = Category::with('categories')
            ->where('parent_id', '=', 0)
            ->get();

        return Response()->json(['categories' => $categories], 200);
    }
}
