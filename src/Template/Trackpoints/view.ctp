<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Edit Trackpoint'), ['action' => 'edit', $trackpoint->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete Trackpoint'), ['action' => 'delete', $trackpoint->id], ['confirm' => __('Are you sure you want to delete # {0}?', $trackpoint->id)]) ?> </li>
        <li><?= $this->Html->link(__('List Trackpoints'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Trackpoint'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?> </li>
    </ul>
</nav>
<div class="trackpoints view large-9 medium-8 columns content">
    <h3><?= h($trackpoint->id) ?></h3>
    <table class="vertical-table">
        <tr>
            <th><?= __('Activity') ?></th>
            <td><?= $trackpoint->has('activity') ? $this->Html->link($trackpoint->activity->id, ['controller' => 'Activities', 'action' => 'view', $trackpoint->activity->id]) : '' ?></td>
        </tr>
        <tr>
            <th><?= __('Time') ?></th>
            <td><?= h($trackpoint->time) ?></td>
        </tr>
        <tr>
            <th><?= __('Id') ?></th>
            <td><?= $this->Number->format($trackpoint->id) ?></td>
        </tr>
        <tr>
            <th><?= __('Latitude Deg') ?></th>
            <td><?= $this->Number->format($trackpoint->latitude_deg) ?></td>
        </tr>
        <tr>
            <th><?= __('Longitude Deg') ?></th>
            <td><?= $this->Number->format($trackpoint->longitude_deg) ?></td>
        </tr>
        <tr>
            <th><?= __('Altitude Meters') ?></th>
            <td><?= $this->Number->format($trackpoint->altitude_meters) ?></td>
        </tr>
        <tr>
            <th><?= __('Distance Meters') ?></th>
            <td><?= $this->Number->format($trackpoint->distance_meters) ?></td>
        </tr>
        <tr>
            <th><?= __('Heart Rate Bpm') ?></th>
            <td><?= $this->Number->format($trackpoint->heart_rate_bpm) ?></td>
        </tr>
        <tr>
            <th><?= __('Speed') ?></th>
            <td><?= $this->Number->format($trackpoint->speed) ?></td>
        </tr>
    </table>
</div>
