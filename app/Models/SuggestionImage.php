<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuggestionImage extends Model
{
    protected $guarded = [];

    public function suggestion()
    {
        return $this->belongsTo(Suggestion::class);
    }
}
