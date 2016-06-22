<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('List Trackpoints'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="trackpoints form large-9 medium-8 columns content">
    <?= $this->Form->create($trackpoint) ?>
    <fieldset>
        <legend><?= __('Add Trackpoint') ?></legend>
        <?php
            echo $this->Form->input('activity_id', ['options' => $activities]);
            echo $this->Form->input('time');
            echo $this->Form->input('latitude_deg');
            echo $this->Form->input('longitude_deg');
            echo $this->Form->input('altitude_meters');
            echo $this->Form->input('distance_meters');
            echo $this->Form->input('heart_rate_bpm');
            echo $this->Form->input('speed');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
