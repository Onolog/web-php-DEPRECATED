<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('New Split'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="splits index large-9 medium-8 columns content">
    <h3><?= __('Splits') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th><?= $this->Paginator->sort('id') ?></th>
                <th><?= $this->Paginator->sort('activity_id') ?></th>
                <th><?= $this->Paginator->sort('split') ?></th>
                <th><?= $this->Paginator->sort('distance') ?></th>
                <th><?= $this->Paginator->sort('duration') ?></th>
                <th><?= $this->Paginator->sort('avg_hr') ?></th>
                <th><?= $this->Paginator->sort('max_hr') ?></th>
                <th><?= $this->Paginator->sort('calories') ?></th>
                <th><?= $this->Paginator->sort('elevation_change') ?></th>
                <th><?= $this->Paginator->sort('elevation_gain') ?></th>
                <th><?= $this->Paginator->sort('elevation_loss') ?></th>
                <th><?= $this->Paginator->sort('max_speed') ?></th>
                <th class="actions"><?= __('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($splits as $split): ?>
            <tr>
                <td><?= $this->Number->format($split->id) ?></td>
                <td><?= $split->has('activity') ? $this->Html->link($split->activity->id, ['controller' => 'Activities', 'action' => 'view', $split->activity->id]) : '' ?></td>
                <td><?= $this->Number->format($split->split) ?></td>
                <td><?= $this->Number->format($split->distance) ?></td>
                <td><?= $this->Number->format($split->duration) ?></td>
                <td><?= $this->Number->format($split->avg_hr) ?></td>
                <td><?= $this->Number->format($split->max_hr) ?></td>
                <td><?= $this->Number->format($split->calories) ?></td>
                <td><?= $this->Number->format($split->elevation_change) ?></td>
                <td><?= $this->Number->format($split->elevation_gain) ?></td>
                <td><?= $this->Number->format($split->elevation_loss) ?></td>
                <td><?= $this->Number->format($split->max_speed) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['action' => 'view', $split->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['action' => 'edit', $split->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $split->id], ['confirm' => __('Are you sure you want to delete # {0}?', $split->id)]) ?>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
        </ul>
        <p><?= $this->Paginator->counter() ?></p>
    </div>
</div>
