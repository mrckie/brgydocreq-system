<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'description' => 'required|string|max:255',
            'price' => 'required|string|max:225',
            'status_id' => 'required|exists:statuses,status_id',
            'document_photopath' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $document = Document::findOrFail($validate['document_id']);

        if ($request->hasFile('document_photopath')) {
            if ($document->document_photopath) {
                Storage::disk('public')->delete($document->document_photopath);
            }
            $file = $request->file('document_photopath');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('admin', $filename, 'public');
            $validate['document_photopath'] = $path;
        }


        $document->update($validate);
    }

    public function storeDocumentInfo(Request $request)
    {
        $validate = $request->validate([
            'document_name' => 'required|string|max:225',
            'description' => 'required|string|max:225',
            'price' => 'required|string|max:225',
            'document_photopath' => 'nullable|file|mimes:jpg,jpeg,png,svg|max:2048',
            'status_id' => 'required|exists:statuses,status_id',
        ]);

        if ($request->hasFile('document_photopath')) {
            $path = $request->file('document_photopath')->store('admin', 'public');
            $validate['document_photopath'] = $path;
        }

        Document::create([$validate]);
    }
}
