<?php

namespace App\Enums;

enum DeviceType: string
{
    case FAN = 'Fan';
    case LIGHT = 'Light';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function toArray(): array
    {
        $array = [];
        foreach (self::cases() as $case) {
            $array[$case->name] = $case->value;
        }
        return $array;
    }
}
