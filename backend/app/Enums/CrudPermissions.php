<?php

namespace App\Enums;

enum CrudPermissions: string
{
    case Create = 'create';
    case Read   = 'read';
    case Update = 'update';
    case Delete = 'delete';

    function WithModule(ModuleEnum $module): string
    {
        return $this->value . '-' . $module->value;
    }
    static function AllPermissionsWithModule(ModuleEnum $module): array
    {
        return [
            self::Create->WithModule($module),
            self::Read->WithModule($module),
            self::Update->WithModule($module),
            self::Delete->WithModule($module),
        ];
    }
}
