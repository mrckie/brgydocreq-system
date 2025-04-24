<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AdminInvitation;
use App\Models\BarangayOfficer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AdminRegistrationController extends Controller
{
    public function store(Request $request)
    {

        $validate = $request->validate([
            'officer_firstname' => 'required|string|max:255',
            'officer_middlename' => 'required|string|max:255',
            'officer_lastname' => 'required|string|max:255',
            'officer_suffix' => 'nullable|string|max:255',
            'officer_birthdate' => 'required|date',
            'officer_householdnum' => 'required|string|max:255',
            'admin_phonenum' => 'required|string|max:255',
            'admin_username' => 'required|string|unique:admins',
            'admin_email' => 'exists:admin_invitations,email',
            'admin_role' => 'exists:roles,role_name',
            'invite_token' => 'exists:admin_invitations,invite_token',
            'admin_password' =>  ['required', 'confirmed', Rules\Password::defaults()]
        ]);

        $invitation = AdminInvitation::where('invite_token', $validate['invite_token'])->where('expires_at', '>', now())->first();

        if (!$invitation || $invitation->used) {
            \abort(403, 'Invalid or expired invitation token.');
        }

        $barangayOfficer = BarangayOfficer::where([
            ['officer_firstname', $validate['officer_firstname']],
            ['officer_middlename', $validate['officer_middlename']],
            ['officer_lastname', $validate['officer_lastname']],
            ['officer_suffix', $validate['officer_suffix']],
            ['officer_birthdate', $validate['officer_birthdate']],
            ['officer_householdnum', $validate['officer_householdnum']],
        ])->first();

        if (!$barangayOfficer) {
            abort(404, 'Record Not Found');
        }

        $admin = Admin::create([
            'officer_id' => $barangayOfficer->officer_id,
            'role_id' => $invitation->role_id,
            'admin_email' => $invitation->email,
            'admin_username' => $validate['admin_username'],
            'admin_phonenum' => $validate['admin_phonenum'],
            'admin_password' => Hash::make($validate['admin_password']),
        ]);

        $invitation->update(['used' => true]);

        event(new Registered($admin));

        Auth::guard('admin')->login($admin);


        return to_route('admin.dashboard');
    }
}
