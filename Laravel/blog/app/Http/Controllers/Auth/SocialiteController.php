<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Mockery\Generator\StringManipulation\Pass\Pass;

class SocialiteController extends Controller
{
    public function redirect($provider)
    {
        try {
            if (Str::lower($provider)  === 'google' || Str::lower($provider)  === 'github') {
                return Socialite::driver($provider)->redirect();
            }
        } catch (\Exception $ignored) {
        }
        return redirect()->route('login');
    }

    public function callback($provider)
    {
        try {
            if (Str::lower($provider)  === 'google' || Str::lower($provider)  === 'github') {
                $providerUser = Socialite::driver($provider)->user();
                $user = User::where('email', $providerUser->email)->first();
                if (!$user) {
                    $user = User::create([
                        'name' => $providerUser->name,
                        'email' => $providerUser->email,
                        'password' => Hash::make(Str::random(16)),
                        $provider . '_token' => $providerUser->token,
                        $provider . '_refresh_token' => $providerUser->refreshToken,
                    ]);
                } else {
                    $user->update([
                        $provider . '_token' => $providerUser->token,
                        $provider . '_refresh_token' => $providerUser->refreshToken,
                    ]);
                }
                Auth::login($user);

                return redirect()->route('posts.index');
            }
        } catch (\Exception $ignored) {
        }
        return redirect()->route('login');
    }
}
