<?php

use App\Http\Controllers\Admin\AdminAdminsController;
use App\Http\Controllers\Admin\AdminArchivesController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminDocumentRequestController;
use App\Http\Controllers\Admin\AdminDocumentsController;
use App\Http\Controllers\Admin\AdminOnProcessController;
use App\Http\Controllers\Admin\AdminResidentsController;
use App\Http\Controllers\Admin\Auth\AdminAuthSessionController;
use App\Http\Controllers\Admin\Auth\AdminInvitationController;
use App\Http\Controllers\Admin\Auth\AdminPasswordResetLinkController;
use App\Http\Controllers\Admin\Settings\AdminPasswordController;
use App\Http\Controllers\Admin\Settings\AdminProfileController;
use App\Http\Controllers\Admin\Auth\AdminRegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->group(function () {

	Route::middleware(['guest:admin'])->group(function () {
		Route::get('/register/validate', [AdminInvitationController::class, 'validateToken'])->name('register.validate');
		Route::get('/register', [AdminInvitationController::class, 'show'])->name('register');

		Route::post('/register/store', [AdminRegistrationController::class, 'store'])->name('register.store');
		Route::get('/login', [AdminAuthSessionController::class, 'create'])->name('login');
		Route::post('/login/store', [AdminAuthSessionController::class, 'store'])->name('login.store');
		Route::get('/forgot-password', [AdminPasswordResetLinkController::class, 'create'])->name('forgot-password');
	});

	Route::middleware(['auth:admin', 'verified:admin'])->group(function () {

		Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
		Route::get('/document-request', [AdminDocumentRequestController::class, 'index'])->name('document-request');
		Route::get('/on-process', [AdminOnProcessController::class, 'index'])->name('on-process');
		Route::get('/archives', [AdminArchivesController::class, 'index'])->name('archives');
		Route::get('/documents', [AdminDocumentsController::class, 'fetchDocumentInfo'])->name('documents');
		Route::post('/documents/{document_id}', [AdminDocumentsController::class, 'updateDocumentInfo'])->name('documents.update');
		Route::post('/documents/store', [AdminDocumentsController::class, 'storeDocumentInfo'])->name('documents.store');
		Route::get('/residents', [AdminResidentsController::class, 'fetchResidentInfo'])->name('residents');
		Route::patch('/residents/{resident_id}', [AdminResidentsController::class, 'updateResidentInfo'])->name('residents.update');
		Route::post('/residents/store', [AdminResidentsController::class, 'storeResidentInfo'])->name('residents.store');
		Route::get('/admins', [AdminAdminsController::class, 'fetchAdminInfo'])->name('admins');
		Route::patch('/admins/{admin_id}', [AdminAdminsController::class, 'updateAdminInfo'])->name('admins.update');
		Route::post('/invite', [AdminInvitationController::class, 'sendInvitation'])->name('invite');
		Route::post('logout', [AdminAuthSessionController::class, 'destroy'])->name('logout');

		Route::prefix('/settings')->name('settings.')->group(function () {
			Route::redirect('settings', 'settings/Profile');

			Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
			Route::patch('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
			Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('profile.destroy');

			Route::get('/password', [AdminPasswordController::class, 'edit'])->name('password.edit');
			Route::put('/password', [AdminPasswordController::class, 'update'])->name('password.update');

			Route::get('/appearance', function () {
				return Inertia::render('admin/settings/Appearance');
			})->name('appearance');
		});
	});
});
