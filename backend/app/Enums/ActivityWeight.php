<?php

namespace App\Enums;

enum ActivityWeight: string
{
    case LOGIN = "login";
    case ORDER = "order";
    case BOOKING = "booking";
    case REVIEW = "review";
    case VIEW_PRODUCT = "view_product";
    case SEARCH = "search";
    case ADD_TO_CART = "add_to_cart";
    

    /**
     * Get all activity weights as an associative array.
     * Weights according to CP300 Table 29.
     *
     * @return array<string, float> [activity_name => weight]
     */
    public static function getAll(): array
    {
        return [
            'login' => 0.2,
            'order' => 1.0,
            'booking' => 1.0,
            'review' => 0.9,
            'view_product' => 0.5,
            'search' => 0.4,
            'add_to_cart' => 0.8,
        ];
    }

    /**
     * Get the weight for a specific activity.
     *
     * @param string $activityName
     * @return float
     */
    public static function getWeight(string $activityName): float
    {
        $weights = self::getAll();
        return $weights[$activityName] ?? 0.3; // Default fallback weight
    }

    /**
     * Convert activity name to enum case.
     *
     * @param string $activityName
     * @return self
     */
    public static function fromActivityName(string $activityName): self
    {
        foreach (self::cases() as $case) {
            if ($case->name === $activityName) {
                return $case;
            }
        }
        return self::VIEW_PRODUCT; // Default fallback
    }
}
