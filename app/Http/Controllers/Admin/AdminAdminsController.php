<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAdminsController extends Controller
{

    public function fetchAdminInfo()
    {
        $admins = Admin::with(['barangayOfficer.address:address_id,purok', 'role'])
            ->whereHas('role', function ($query) {
                $query->where('role_name', '!=', 'super_admin');
            })
            ->get();

        $roles = Role::select('role_id', 'role_name')->where('role_name', '!=', 'super admin')->get();

        $flattenAdmins = $admins->map(function ($admin) {
            return [
                'admin_id' => $admin->admin_id,
                'admin_username' => $admin->admin_username,
                'admin_email' => $admin->admin_email,
                'admin_photopath' => $admin->admin_photopath,
                'admin_role' => $admin->role->role_name,
                'officer_firstname' => $admin->barangayOfficer->officer_firstname,
                'officer_middlename' => $admin->barangayOfficer->officer_middlename,
                'officer_lastname' => $admin->barangayOfficer->officer_lastname,
                'officer_suffix' => $admin->barangayOfficer->officer_suffix,
                'officer_birthdate' => $admin->barangayOfficer->officer_birthdate,
                'officer_precinct' => $admin->barangayOfficer->officer_precinct,
                'officer_householdnum' => $admin->barangayOfficer->officer_householdnum,
                'officer_position' => $admin->barangayOfficer->officer_position,
                'officer_gender' => $admin->barangayOfficer->officer_gender,
                'officer_purok' => $admin->barangayOfficer->address->purok,
            ];
        });


        return Inertia::render('admin/Admins', [
            'admins' => $flattenAdmins,
            'roles' => $roles
        ]);
    }

    public function updateAdminInfo(Request $request)
    {
        $validate = $request->validate([
            'admin_id' => 'required|exists:admins,admin_id',
            'admin_username' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255',
            'admin_photopath' => 'nullable|string|max:255',
            'admin_role' => 'required|string|max:255',
            'officer_firstname' => 'required|string|max:255',
            'officer_middlename' => 'required|string|max:255',
            'officer_lastname' => 'required|string|max:255',
            'officer_suffix' => 'nullable|string|max:255',
            'officer_birthdate' => 'required|date',
            'officer_precinct' => 'required|string|max:255',
            'officer_householdnum' => 'required|string|max:255',
            'officer_position' => 'required|required|string|max:255',
            'officer_gender' => 'required|string|max:20',
            'officer_purok' => 'required|string|max:255',
        ]);

        $admin = Admin::findOrFail($validate['admin_id']);

        $admin->update([
            'admin_username' => $validate['admin_username'],
            'admin_email' => $validate['admin_email'],
            'admin_photopath' => $validate['admin_photopath'],
            'admin_role' => $validate['admin_role'],
        ]);

        $admin->barangayOfficer->update([
            'officer_firstname' => $validate['officer_firstname'],
            'officer_middlename' => $validate['officer_middlename'],
            'officer_lastname' => $validate['officer_lastname'],
            'officer_suffix' => $validate['officer_suffix'],
            'officer_birthdate' => $validate['officer_birthdate'],
            'officer_precinct' => $validate['officer_precinct'],
            'officer_householdnum' => $validate['officer_householdnum'],
            'officer_position' => $validate['officer_position'],
            'officer_gender' => $validate['officer_gender'],
        ]);

        $admin->barangayOfficer->address->update([
            'purok' => $validate['officer_purok'],
        ]);

        $admin->role->update([
            'role_name' => $validate['admin_role']
        ]);


        return back()->with('success', "Administrator successfully updated");
    }
}
