<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Trackpoints Controller
 *
 * @property \App\Model\Table\TrackpointsTable $Trackpoints
 */
class TrackpointsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Activities']
        ];
        $trackpoints = $this->paginate($this->Trackpoints);

        $this->set(compact('trackpoints'));
        $this->set('_serialize', ['trackpoints']);
    }

    /**
     * View method
     *
     * @param string|null $id Trackpoint id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $trackpoint = $this->Trackpoints->get($id, [
            'contain' => ['Activities']
        ]);

        $this->set('trackpoint', $trackpoint);
        $this->set('_serialize', ['trackpoint']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $trackpoint = $this->Trackpoints->newEntity();
        if ($this->request->is('post')) {
            $trackpoint = $this->Trackpoints->patchEntity($trackpoint, $this->request->data);
            if ($this->Trackpoints->save($trackpoint)) {
                $this->Flash->success(__('The trackpoint has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The trackpoint could not be saved. Please, try again.'));
            }
        }
        $activities = $this->Trackpoints->Activities->find('list', ['limit' => 200]);
        $this->set(compact('trackpoint', 'activities'));
        $this->set('_serialize', ['trackpoint']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Trackpoint id.
     * @return \Cake\Network\Response|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $trackpoint = $this->Trackpoints->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $trackpoint = $this->Trackpoints->patchEntity($trackpoint, $this->request->data);
            if ($this->Trackpoints->save($trackpoint)) {
                $this->Flash->success(__('The trackpoint has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The trackpoint could not be saved. Please, try again.'));
            }
        }
        $activities = $this->Trackpoints->Activities->find('list', ['limit' => 200]);
        $this->set(compact('trackpoint', 'activities'));
        $this->set('_serialize', ['trackpoint']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Trackpoint id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $trackpoint = $this->Trackpoints->get($id);
        if ($this->Trackpoints->delete($trackpoint)) {
            $this->Flash->success(__('The trackpoint has been deleted.'));
        } else {
            $this->Flash->error(__('The trackpoint could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
