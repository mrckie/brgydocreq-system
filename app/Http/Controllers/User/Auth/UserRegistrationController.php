<?php
namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Models\ResidentReference;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserRegistrationController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('user/auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'reference_number' => 'required|string|max:255|exists:resident_references,reference_number',
        ]);

        $residentReference = ResidentReference::where('reference_number', $validated['reference_number'])->where('expires_at', '>', now())->first();

        if (!$residentReference || $residentReference->used) {
            return back()->withErrors([
                'reference_number' => 'The reference number is invalid or has expired.',
            ]);
        }

        $user = User::create([
            'username' => $validated['username'],
            'resident_id' => $residentReference->resident_id,
            'user_email' => $residentReference->email,
            'user_phonenum' => $residentReference->phone_number,
            'user_password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('user.landing.home');

        $residentReference->update(['used' => true]);
    }
}
