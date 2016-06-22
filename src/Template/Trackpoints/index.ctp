<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('New Trackpoint'), ['action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="trackpoints index large-9 medium-8 columns content">
    <h3><?= __('Trackpoints') ?></h3>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th><?= $this->Paginator->sort('id') ?></th>
                <th><?= $this->Paginator->sort('activity_id') ?></th>
                <th><?= $this->Paginator->sort('time') ?></th>
                <th><?= $this->Paginator->sort('latitude_deg') ?></th>
                <th><?= $this->Paginator->sort('longitude_deg') ?></th>
                <th><?= $this->Paginator->sort('altitude_meters') ?></th>
                <th><?= $this->Paginator->sort('distance_meters') ?></th>
                <th><?= $this->Paginator->sort('heart_rate_bpm') ?></th>
                <th><?= $this->Paginator->sort('speed') ?></th>
                <th class="actions"><?= __('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($trackpoints as $trackpoint): ?>
            <tr>
                <td><?= $this->Number->format($trackpoint->id) ?></td>
                <td><?= $trackpoint->has('activity') ? $this->Html->link($trackpoint->activity->id, ['controller' => 'Activities', 'action' => 'view', $trackpoint->activity->id]) : '' ?></td>
                <td><?= h($trackpoint->time) ?></td>
                <td><?= $this->Number->format($trackpoint->latitude_deg) ?></td>
                <td><?= $this->Number->format($trackpoint->longitude_deg) ?></td>
                <td><?= $this->Number->format($trackpoint->altitude_meters) ?></td>
                <td><?= $this->Number->format($trackpoint->distance_meters) ?></td>
                <td><?= $this->Number->format($trackpoint->heart_rate_bpm) ?></td>
                <td><?= $this->Number->format($trackpoint->speed) ?></td>
                <td class="actions">
                    <?= $this->Html->link(__('View'), ['action' => 'view', $trackpoint->id]) ?>
                    <?= $this->Html->link(__('Edit'), ['action' => 'edit', $trackpoint->id]) ?>
                    <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $trackpoint->id], ['confirm' => __('Are you sure you want to delete # {0}?', $trackpoint->id)]) ?>
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
