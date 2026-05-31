<?php

namespace App\Http\Controllers;

use App\Services\FinancialService;
use App\Services\ProductionQueueService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    protected FinancialService $financialService;
    protected ProductionQueueService $productionQueueService;

    public function __construct(FinancialService $financialService, ProductionQueueService $productionQueueService)
    {
        $this->financialService = $financialService;
        $this->productionQueueService = $productionQueueService;
    }

    /**
     * Get financial dashboard summary.
     */
    public function financialSummary(Request $request): JsonResponse
    {
        $request->validate([
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        $startDate = $request->has('tanggal_mulai') ? \Carbon\Carbon::parse($request->tanggal_mulai) : null;
        $endDate = $request->has('tanggal_selesai') ? \Carbon\Carbon::parse($request->tanggal_selesai)->endOfDay() : null;

        $summary = $this->financialService->getSummary($startDate, $endDate);
        $byCategory = $this->financialService->getRevenueByCategory($startDate, $endDate);
        $popular = $this->financialService->getPopularProducts(10, $startDate, $endDate);

        return response()->json([
            'status' => 'success',
            'data' => [
                'summary' => $summary,
                'revenue_by_category' => $byCategory,
                'popular_products' => $popular,
            ],
        ]);
    }

    /**
     * Get revenue chart data.
     */
    public function revenueChart(Request $request): JsonResponse
    {
        $request->validate([
            'periode' => 'nullable|in:daily,weekly,monthly',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        $period = $request->get('periode', 'daily');
        $startDate = $request->has('tanggal_mulai') ? \Carbon\Carbon::parse($request->tanggal_mulai) : now()->subMonth();
        $endDate = $request->has('tanggal_selesai') ? \Carbon\Carbon::parse($request->tanggal_selesai)->endOfDay() : now();

        $data = $this->financialService->getRevenueByPeriod($period, $startDate, $endDate);

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ]);
    }

    /**
     * Get customer behavior report.
     */
    public function customerBehavior(): JsonResponse
    {
        $report = $this->financialService->getCustomerBehaviorReport();

        return response()->json([
            'status' => 'success',
            'data' => $report,
        ]);
    }

    /**
     * Get production queue.
     */
    public function productionQueue(): JsonResponse
    {
        $queue = $this->productionQueueService->getQueue();
        $todayLoad = $this->productionQueueService->getTodayLoad();

        return response()->json([
            'status' => 'success',
            'data' => [
                'queue' => $queue,
                'today_load' => $todayLoad,
            ],
        ]);
    }
}