<?php

namespace App\Http\Requests;

use App\Enums\DeviceType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PresetRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

     public function rules()
    {
        return [
            'device_id' => 'required|exists:devices,id',
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('presets', 'name')->ignore($this->preset),
            ],
            'type' => ['required', 'string', Rule::enum(DeviceType::class)],
            'settings' => 'required|array',
            'settings.power' => 'required|boolean',
            'settings.speed' => 'required_if:type,' . DeviceType::FAN->value . '|integer|min:0|max:100',
            'settings.brightness' => 'required_if:type,' . DeviceType::LIGHT->value . '|integer|min:0|max:100',
            'settings.color' => 'required_if:type,' . DeviceType::LIGHT->value . '|string|regex:/^#[a-fA-F0-9]{6}$/',
        ];
    }

    public function messages()
    {
        return [
            'device_id.exists' => 'The selected device does not exist',
            'type.in' => 'Preset type must be either Fan or Light',
            'name.unique' => 'Preset name must be unique.',
        ];
    }
}
