<?php

namespace App\Services;

use Nwidart\Modules\Facades\Module;
use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Route;

class SidebarMenu
{
    public string $title;
    public string $icon;
    public string $route;
    public RoleEnum $role;
    public int $order;
    public int $nestOrder;
    private bool $isValid = true;
    /** @var SidebarMenu[] */
    public array $children = [];
    public function __construct(array $data = [], $nestOrder = 0, array &$invalidMenus = [])
    {
        # For the routes, check if it actually exist or not in the routes file
        # Otherwise we'll just skip this
        $routeExists = true;

        $this->title = $data['title'] ?? '';
        $this->icon = $data['icon'] ?? '';
        $this->role = $data['role'] ?? RoleEnum::Admin;
        $this->order = $data['order'] ?? 0;
        $this->nestOrder = $nestOrder;
        foreach ($data['children'] ?? [] as $child) {
            $this->children[] = new SidebarMenu($child, $nestOrder + 1, $invalidMenus);
        }

        $hasChildren = $this->hasChildren();
        if (!$hasChildren) {
            if (Route::has($data['route'] ?? '')) {
                $this->route = $data['route'] ?? '#';
                $routeExists = true;
            } else {
                $this->route = '#';
                $routeExists = false;
            }
        }
        if (!$routeExists && !$hasChildren) {
            $errors = [];
            if (!$routeExists) $errors[] = "Route '{$this->route}' does not exist";
            if (!$hasChildren) $errors[] = "No children provided";
            $invalidMenus[]  = [
                'title' => $this->title,
                'route' => $this->route,
                'error' => implode(' / ', $errors)
            ];
            $this->isValid = false;
        }
    }

    public function isValid(): bool
    {
        return $this->isValid;
    }

    public function hasChildren(): bool
    {
        return !empty($this->children);
    }
    public function AccordionRepresentation(string $prefix = '', $user = null): string
    {
        $html = '';
        $id = 'sidebar-' . \Illuminate\Support\Str::slug($this->title) . '-' . $this->nestOrder;

        if (!$this->isValid() || $user && !$user->hasRole($this->role->value)) {
            return $html;
        }

        $hasChildren = $this->hasChildren();
        // An accordion is on top of each other or something
        if ($hasChildren) {
            $html .= '<x-side-bar.item text="' . e($this->title) . '"';
            // Default chevron-right

            if ($this->icon) {
                $html .= ' icon="' . $this->icon . '"';
            } else {
                $html .= ' icon="chevron-right" ';
            }

            $html .= ' id="' . $id . '"';

            $html .= '>';

            // Recursively render children
            foreach ($this->children as $child) {
                $html .= $child->AccordionRepresentation($prefix . '&nbsp;&nbsp;', $user);
            }

            $html .= '</x-side-bar.item>';
        } else {
            $html .= '<x-side-bar.item';
            $html .= ' text="' . e($this->title) . '"';
            $html .= ' icon="' . e($this->icon) . '"';
            if ($this->route !== '#') {
                $html .= ' route="' . e(route($this->route)) . '"'; // ← resolve route() in PHP, no colon
            } else {
                $html .= ' href="#"';
            }
            $html .= ' />';
        }
        return $html;
    }
}
class SidebarService
{
    public $items = [];
    public $invalidMenus = [];
    private bool $loaded = false;
    public function getItems()
    {
        if (!$this->loaded) {
            $this->appendItem();
        }
        return $this->items;
    }
    public function appendItem()
    {
        $modules = Module::all();
        $this->items = [];
        $dataToShow = [];
        foreach ($modules as $module) {
            $sidebar = config(strtolower($module->getName()) . '.sidebar') ?? [];

            $dataToShow[] = [
                'title' => $module->getName(),
                'config' => $sidebar
            ];
            if (empty($sidebar)) {
                continue;
            }


            foreach ($sidebar as $item) {
                $invalidMenuToPut = [];
                $this->items[] = new SidebarMenu($item, 0, $invalidMenuToPut);
                $this->invalidMenus = array_merge($this->invalidMenus, $invalidMenuToPut);
            }
        }
        
        $this->loaded = true;
    }
}
