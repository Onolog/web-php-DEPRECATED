<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $split->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $split->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Splits'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List Activities'), ['controller' => 'Activities', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New Activity'), ['controller' => 'Activities', 'action' => 'add']) ?></li>
    </ul>
</nav>
<div class="splits form large-9 medium-8 columns content">
    <?= $this->Form->create($split) ?>
    <fieldset>
        <legend><?= __('Edit Split') ?></legend>
        <?php
            echo $this->Form->input('activity_id', ['options' => $activities, 'empty' => true]);
            echo $this->Form->input('split');
            echo $this->Form->input('distance');
            echo $this->Form->input('duration');
            echo $this->Form->input('avg_hr');
            echo $this->Form->input('max_hr');
            echo $this->Form->input('calories');
            echo $this->Form->input('elevation_change');
            echo $this->Form->input('elevation_gain');
            echo $this->Form->input('elevation_loss');
            echo $this->Form->input('max_speed');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
