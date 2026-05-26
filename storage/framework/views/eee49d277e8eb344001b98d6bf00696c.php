    <div class="space-y-6">
        <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve(['header' => 'Kirim Ulasan Produk'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

            <div class="space-y-6">
                <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(session('message')): ?>
                    <?php if (isset($component)) { $__componentOriginal1c43fc0869207559466b11339ebb076c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal1c43fc0869207559466b11339ebb076c = $attributes; } ?>
<?php $component = TallStackUi\Components\Alert\Component::resolve(['color' => 'green','icon' => 'check-circle'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('alert'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Alert\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                        <?php echo e(session('message')); ?>

                     <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $attributes = $__attributesOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__attributesOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $component = $__componentOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__componentOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>
                <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                <form wire:submit.prevent="submit" class="space-y-4">
                    <div>
    					<label class="block text-sm font-medium text-slate-700 mb-2">Pilih Produk</label>

    					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($locked): ?>
        					
        					<input
            					type="text"
            					value="<?php echo e($products->firstWhere('id', $produk_id)?->nama_produk ?? '-'); ?>"
            					disabled
            					class="block w-full rounded border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
        					>
    					<?php else: ?>
        					
        					<select wire:model.live="produk_id" class="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
            					<option value="">-- Pilih Produk --</option>
            					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::openLoop(); ?><?php endif; ?><?php $__currentLoopData = $products; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $product): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::startLoopIteration(); ?><?php endif; ?>
                					<option value="<?php echo e($product->id); ?>"><?php echo e($product->nama_produk); ?></option>
            					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::endLoop(); ?><?php endif; ?><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::closeLoop(); ?><?php endif; ?>
        					</select>
    					<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

    					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['produk_id'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <p class="text-sm text-red-600 mt-1"><?php echo e($message); ?></p> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
					</div>

                    <div>
    					<label class="block text-sm font-medium text-slate-700 mb-2">Rating</label>
    					<div class="flex gap-1">
        					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::openLoop(); ?><?php endif; ?><?php for($i = 1; $i <= 5; $i++): ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::startLoopIteration(); ?><?php endif; ?>
            					<button
                					type="button"
                					wire:click="$set('rating', <?php echo e($i); ?>)"
                					class="text-3xl transition-colors duration-150 
                       					<?php echo e($i <= $rating ? 'text-yellow-400' : 'text-slate-300'); ?>

                       					hover:text-yellow-300"
            					>★</button>
        					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::endLoop(); ?><?php endif; ?><?php endfor; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::closeLoop(); ?><?php endif; ?>
    					</div>
    					<p class="text-xs text-slate-500 mt-1">Rating dipilih: <?php echo e($rating); ?> bintang</p>
    					<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['rating'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <p class="text-sm text-red-600 mt-1"><?php echo e($message); ?></p> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
					</div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Komentar</label>
                        <textarea wire:model="komentar" rows="5" class="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20" placeholder="Tulis pengalaman Anda..."></textarea>
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__errorArgs = ['komentar'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <p class="text-sm text-red-600 mt-1"><?php echo e($message); ?></p> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                    </div>

                    <?php if (isset($component)) { $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e = $attributes; } ?>
<?php $component = TallStackUi\Components\Button\Normal\Component::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('button'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Button\Normal\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'submit','primary' => true]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>
Kirim Ulasan <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $attributes = $__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__attributesOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e)): ?>
<?php $component = $__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e; ?>
<?php unset($__componentOriginal81da9b0d04b05fd8a605d2829e8f6a5e); ?>
<?php endif; ?>
                </form>
            </div>
         <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $attributes = $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $component = $__componentOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>

        <?php if (isset($component)) { $__componentOriginal5c806641b94f036edd70b23c3aa0efb3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3 = $attributes; } ?>
<?php $component = TallStackUi\Components\Card\Component::resolve(['header' => 'Ulasan Terakhir'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('card'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Card\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($existingReviews->isEmpty()): ?>
                <?php if (isset($component)) { $__componentOriginal1c43fc0869207559466b11339ebb076c = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal1c43fc0869207559466b11339ebb076c = $attributes; } ?>
<?php $component = TallStackUi\Components\Alert\Component::resolve(['color' => 'amber','icon' => 'information-circle'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('alert'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\TallStackUi\Components\Alert\Component::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::processComponentKey($component); ?>

                    Belum ada ulasan untuk produk ini.
                 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $attributes = $__attributesOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__attributesOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal1c43fc0869207559466b11339ebb076c)): ?>
<?php $component = $__componentOriginal1c43fc0869207559466b11339ebb076c; ?>
<?php unset($__componentOriginal1c43fc0869207559466b11339ebb076c); ?>
<?php endif; ?>
            <?php else: ?>
                <div class="space-y-4">
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::openLoop(); ?><?php endif; ?><?php $__currentLoopData = $existingReviews; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $review): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::startLoopIteration(); ?><?php endif; ?>
                        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p class="text-sm font-semibold"><?php echo e($review->pelanggan?->user?->name ?? 'Pelanggan'); ?></p>
                                    <p class="text-sm text-slate-500"><?php echo e($review->created_at->format('d M Y H:i')); ?></p>
                                </div>
                                <span class="text-yellow-500 text-sm"><?php echo e(str_repeat('★', $review->rating)); ?><?php echo e(str_repeat('☆', 5 - $review->rating)); ?></span>
                            </div>
                            <p class="mt-3 text-slate-700 dark:text-slate-300"><?php echo e($review->komentar ?: 'Tidak ada komentar.'); ?></p>
                        </div>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::endLoop(); ?><?php endif; ?><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::closeLoop(); ?><?php endif; ?>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
         <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $attributes = $__attributesOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__attributesOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3)): ?>
<?php $component = $__componentOriginal5c806641b94f036edd70b23c3aa0efb3; ?>
<?php unset($__componentOriginal5c806641b94f036edd70b23c3aa0efb3); ?>
<?php endif; ?>
    </div>
<?php /**PATH D:\pwebif\dona-cake-web\Modules/Ulasan\resources/views/livewire/ulasan-form/ulasan-form.blade.php ENDPATH**/ ?>