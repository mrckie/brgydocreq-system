<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDocumentsController extends Controller
{
    public function fetchDocumentInfo()
    {
        $documents = Document::all()->each->makeHidden(['created_at', 'updated_at']);
        $status = Status::all();

        // return \response()->json($documents);


        return Inertia::render('admin/Documents', [
            'documents' => $documents,
            'status' => $status
        ]);
    }

    public function updateDocumentInfo(Request $request)
    {

        $validate = $request->validate([
            'document_id' => 'required|exists:documents,document_id',
            'document_name' => 'required|string|max:225',
            'description' => 'required|string|max:225',
            'price' => 'required|string|max:225',
            'document_photopath' => 'nullable|string|max:225',
            'status_id' => 'required|exists:statuses,status_id',
        ]);

        $document = Document::findOrFail($validate['document_id']);


        $document->update([
            'document_name' => $validate['document_name'],
            'description' => $validate['description'],
            'price' => $validate['price'],
            'document_photopath' => $validate['document_photopath'],
            'status_id' => $validate['status_id'],
        ]);
    }

    public function storeDocumentInfo(Request $request)
    {
        $validate = $request->validate([
            'document_name' => 'required|string|max:225',
            'description' => 'required|string|max:225',
            'price' => 'required|string|max:225',
            'document_photopath' => 'nullable|string|max:225',
            'status_id' => 'required|exists:statuses,status_id',
        ]);

        Document::create([
            'document_name' => $validate['document_name'],
            'description' => $validate['description'],
            'price' => $validate['price'],
            'document_photopath' => $validate['document_photopath'],
            'status_id' => $validate['status_id'],
        ]);
    }
}
