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

    public function getProductsByCategory(Request $request, $name)
    {
        try {
            $category = Category::where('slug', '=', $name)->firstOrFail();
        } catch (ModelNotFoundException $ex) {
            return Response()->json([$ex], 404);
        }

        $categoryId = $category->id;
        $products = Product::with('images')
            ->with('category')
            ->where('category_id', '=', $categoryId);
        if ($request->name) {
            $products = $products->orderBy('name', $request->name);
        }
        if ($request->price) {
            $products = $products->orderBy('price', $request->price);
        }
        if ($request->rate) {
            $products = $products->orderBy('rate', $request->rate);
        }
        $products = $products->paginate(config('settings.paginate'));

        return Response()->json(['products' => $products], 200);
    }

    public function getProductsSearch(Request $request)
    {
        $products = Product::with('images')
            ->with('category')
            ->where('name', 'LIKE', "%{$request->search}%")
            ->paginate(config('settings.search_paginate'));

        return Response()->json(['products' => $products], 200);
    }

    public function getProduct($name)
    {
        try {
            $product = Product::where('slug', '=', $name)
                ->with('images')
                ->with('category')
                ->firstOrFail();
        } catch (ModelNotFoundException $ex) {
            return Response()->json([$ex], 404);
        }
        
        return Response()->json(['product' => $product], 200);
    }
}
