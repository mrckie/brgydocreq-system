<?php

use App\Http\Controllers\User\Auth\UserAuthSessionController;
use App\Http\Controllers\User\Auth\UserConfirmablePasswordController;
use App\Http\Controllers\User\Auth\UserEmailVerificationNotificationController;
use App\Http\Controllers\User\Auth\UserEmailVerificationPromptController;
use App\Http\Controllers\User\Auth\UserNewPasswordController;
use App\Http\Controllers\User\Auth\UserPasswordResetLinkController;
use App\Http\Controllers\User\Auth\UserRegistrationController;
use App\Http\Controllers\User\Auth\UserResidentReferenceController;
use App\Http\Controllers\User\Auth\UserVerifyEmailController;
use App\Http\Controllers\User\Settings\UserDocumentReqController;
use App\Http\Controllers\User\Settings\UserNotificationController;
use App\Http\Controllers\User\Settings\UserPasswordController;
use App\Http\Controllers\User\Settings\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('user')->name('user.')->group(function () {
	Route::middleware(['guest:web'])->group(function () {

		Route::get('/register', [UserRegistrationController::class, 'create'])->name('register');
		Route::post('register/store', [UserRegistrationController::class, 'store'])->name('register.store');
		Route::get('/login', [UserAuthSessionController::class, 'create'])->name('login');
		Route::post('/login/store', [UserAuthSessionController::class, 'store'])->name('login.store');
		Route::get('/resident-reference', [UserResidentReferenceController::class, 'create'])->name('resident-reference');

		Route::post('/resident-reference/store', [UserResidentReferenceController::class, 'store'])->name('resident-reference.store');

		Route::get('/forgot-password', [UserPasswordResetLinkController::class, 'create'])->name('forgot-password');

		Route::post('/forgot-password', [UserPasswordResetLinkController::class, 'store'])->name('password.email');

		Route::get('/reset-password/{token}', [UserNewPasswordController::class, 'create'])->name('password.reset');

		Route::post('/reset-password', [UserNewPasswordController::class, 'store'])->name('password.store');
	});

	Route::middleware('auth:web')->group(function () {

		Route::inertia('/', 'landing/Welcome')->name('landing.home');
		Route::inertia('/about-us', 'landing/AboutUs')->name('landing.about-us');
		Route::inertia('/contact-us', 'landing/ContactUs')->name('landing.contact-us');

		Route::get('verify-email', UserEmailVerificationPromptController::class)
			->name('verification.notice');

		Route::get('verify-email/{id}/{hash}', UserVerifyEmailController::class)
			->middleware(['signed', 'throttle:6,1'])
			->name('verification.verify');

		Route::post('email/verification-notification', [UserEmailVerificationNotificationController::class, 'store'])
			->middleware('throttle:6,1')
			->name('verification.send');

		Route::get('confirm-password', [UserConfirmablePasswordController::class, 'show'])
			->name('password.confirm');

		Route::post('confirm-password', [UserConfirmablePasswordController::class, 'store']);

		Route::post('logout', [UserAuthSessionController::class, 'destroy'])
			->name('logout');

		Route::prefix('/settings')->name('settings.')->group(function () {

			Route::get('/profile', [UserProfileController::class, 'edit'])->name('profile.edit');
			Route::patch('/profile', [UserProfileController::class, 'update'])->name('profile.update');
			Route::delete('/profile', [UserProfileController::class, 'destroy'])->name('profile.destroy');
			Route::get('/document-request', [UserDocumentReqController::class, 'index'])->name('document-request');
			Route::get('/notification', [UserNotificationController::class, 'index'])->name('notification');

			Route::get('/password', [UserPasswordController::class, 'edit'])->name('password.edit');
			Route::put('/password', [UserPasswordController::class, 'update'])->name('password.update');

			Route::get('/appearance', function () {
				return Inertia::render('user/settings/Appearance');
			})->name('appearance');
		});
	});
});
