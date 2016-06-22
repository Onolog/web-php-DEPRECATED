<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Split'), ['action' => 'edit', $split->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Split'), ['action' => 'delete', $split->id], ['confirm' => __('Are you sure you want to delete # {0}?', $split->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Splits'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Split'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="splits view large-9 medium-8 columns content">
    <h3><?= h($split->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th><?= __('Activity') ?></th>
            <td><?= $split->has('activity') ? $this->Html->link($split->activity->id, ['controller' => 'Activities', 'action' => 'view', $split->activity->id]) : '' ?></td>
        </tr>
        <tr>
            <th><?= __('Id') ?></th>
            <td><?= $this->Number->format($split->id) ?></td>
        </tr>
        <tr>
            <th><?= __('Split') ?></th>
            <td><?= $this->Number->format($split->split) ?></td>
        </tr>
        <tr>
            <th><?= __('Distance') ?></th>
            <td><?= $this->Number->format($split->distance) ?></td>
        </tr>
        <tr>
            <th><?= __('Duration') ?></th>
            <td><?= $this->Number->format($split->duration) ?></td>
        </tr>
        <tr>
            <th><?= __('Avg Hr') ?></th>
            <td><?= $this->Number->format($split->avg_hr) ?></td>
        </tr>
        <tr>
            <th><?= __('Max Hr') ?></th>
            <td><?= $this->Number->format($split->max_hr) ?></td>
        </tr>
        <tr>
            <th><?= __('Calories') ?></th>
            <td><?= $this->Number->format($split->calories) ?></td>
        </tr>
        <tr>
            <th><?= __('Elevation Change') ?></th>
            <td><?= $this->Number->format($split->elevation_change) ?></td>
        </tr>
        <tr>
            <th><?= __('Elevation Gain') ?></th>
            <td><?= $this->Number->format($split->elevation_gain) ?></td>
        </tr>
        <tr>
            <th><?= __('Elevation Loss') ?></th>
            <td><?= $this->Number->format($split->elevation_loss) ?></td>
        </tr>
        <tr>
            <th><?= __('Max Speed') ?></th>
            <td><?= $this->Number->format($split->max_speed) ?></td>
        </tr>
    </table>
</div>
