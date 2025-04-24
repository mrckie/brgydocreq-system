<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = [
            [
                'document_name' => 'Barangay Clearance',
                'description' => 'Issued by the barangay confirming the residents good standing and residency and is typically used for employment or legal purposes',
                'price' => 50,
            ],
            [
                'document_name' => 'Certificate of Low Income',
                'description' =>   "Verifies a resident's income level falls within the low-income bracket, typically used for scholarships, subsidies, or social benefits",
                'price' => 30,
            ],
            [
                'document_name' =>  'Certificate of Income',
                'description' => "A formal declaration of a resident’s income, requested for employment, loan applications, or other financial requirements.",
                'price' => 20,
            ],

            [
                'document_name' =>   'Certificate of Indigency',
                'description' =>   "A document certifying that a resident falls below the poverty line, typically required for financial aid, government programs, or social services.",
                'price' => 10,
            ],
            [
                'document_name' =>   'Barangay Certificate',
                'description' =>  "Confirms the residency of an individual within the barangay and may not necessarily state their legal standing.",
                'price' =>  90,
            ],
            [
                'document_name' =>   'Cedula',
                'description' => "Also known as a Community Tax Certificate and one of the basic requirements for most government transactions",
                'price' => 40,
            ],

        ];
        foreach ($documents as $document) {
            Document::create($document);
        }
    }
}
