<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller; // This line needs the correct path
use App\Models\User;
use App\Models\Pelanggan;
use App\Enums\RoleEnum;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Exception;
// If Controller doesn't exist, extend the base Laravel controller directly
// use Illuminate\Routing\Controller as BaseController;

class ApiAuthController extends Controller
{
    public function fromToken(Request $request): JsonResponse
    {
        $token = $request->header("Authorization");

        if (!$token) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Authorization token is required",
                ],
                401,
            );
        }

        try {
            $user = Auth::user();
        } catch (Exception $e) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Invalid token",
                ],
                401,
            );
        }

        if (!$user) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "User not found",
                ],
                401,
            );
        }
        
        return response()->json([
            "status" => "success",
            "data" => [
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "username" => $user->username,
                    "email" => $user->email,
                    "role" => $user->getRoleNames()->first(),
                ],
            ],
        ]);
    }

    /**
     * Login with username or email
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            "username" => "required|string",
            "password" => "required|string",
        ]);

        $field = filter_var($request->username, FILTER_VALIDATE_EMAIL)
            ? "email"
            : "username";

        if (
            !Auth::attempt([
                $field => $request->username,
                "password" => $request->password,
            ])
        ) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Invalid credentials",
                ],
                401,
            );
        }

        $user = User::where($field, $request->username)->firstOrFail();
        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            "status" => "success",
            "message" => "Login successful",
            "data" => [
                "user" => [
                    "id" => $user->id,
                    "name" => $user->name,
                    "username" => $user->username,
                    "email" => $user->email,
                    "role" => $user->getRoleNames()->first(),
                ],
                "token" => $token,
                "token_type" => "Bearer",
            ],
        ]);
    }

    /**
     * Register new user
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            "username" => ["required", "string", "max:255", "unique:users"],
            "name" => ["required", "string", "max:255"],
            "email" => [
                "required",
                "string",
                "lowercase",
                "email",
                "max:255",
                "unique:users",
            ],
            "password" => ["required", "confirmed", Rules\Password::defaults()],
        ]);

        $user = User::create([
            "username" => $request->username,
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        // Create pelanggan record
        Pelanggan::create(["user_id" => $user->id]);

        // Assign role
        $user->assignRole(RoleEnum::User->value);

        // Generate token
        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json(
            [
                "status" => "success",
                "message" => "User registered successfully",
                "data" => [
                    "user" => [
                        "id" => $user->id,
                        "username" => $user->username,
                        "name" => $user->name,
                        "email" => $user->email,
                        "role" => $user->getRoleNames()->first(),
                    ],
                    "token" => $token,
                    "token_type" => "Bearer",
                ],
            ],
            201,
        );
    }

    /**
     * Logout user (revoke current token)
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "status" => "success",
            "message" => "Logged out successfully",
        ]);
    }

    /**
     * Logout from all devices (revoke all tokens)
     */
    public function logoutAll(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json([
            "status" => "success",
            "message" => "Logged out from all devices successfully",
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->load("pelanggan");

        return response()->json([
            "status" => "success",
            "data" => [
                "id" => $user->id,
                "username" => $user->username,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->getRoleNames()->first(),
                "permissions" => $user->getAllPermissions()->pluck("name"),
                "pelanggan" => $user->pelanggan,
                "email_verified_at" => $user->email_verified_at,
                "created_at" => $user->created_at,
                "updated_at" => $user->updated_at,
            ],
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            "current_password" => "required|string",
            "new_password" => "required|string|min:8|confirmed",
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Current password is incorrect",
                ],
                422,
            );
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        // Optional: Revoke all tokens after password change
        // $user->tokens()->delete();

        return response()->json([
            "status" => "success",
            "message" => "Password changed successfully",
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            "name" => "sometimes|string|max:255",
            "username" =>
                "sometimes|string|max:255|unique:users,username," . $user->id,
            "email" => "sometimes|email|unique:users,email," . $user->id,
        ]);

        $user->update($request->only(["name", "username", "email"]));

        return response()->json([
            "status" => "success",
            "message" => "Profile updated successfully",
            "data" => [
                "id" => $user->id,
                "username" => $user->username,
                "name" => $user->name,
                "email" => $user->email,
            ],
        ]);
    }
}
