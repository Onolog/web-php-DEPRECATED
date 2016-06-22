<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Splits Controller
 *
 * @property \App\Model\Table\SplitsTable $Splits
 */
class SplitsController extends AppController
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
        $splits = $this->paginate($this->Splits);

        $this->set(compact('splits'));
        $this->set('_serialize', ['splits']);
    }

    /**
     * View method
     *
     * @param string|null $id Split id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $split = $this->Splits->get($id, [
            'contain' => ['Activities']
        ]);

        $this->set('split', $split);
        $this->set('_serialize', ['split']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $split = $this->Splits->newEntity();
        if ($this->request->is('post')) {
            $split = $this->Splits->patchEntity($split, $this->request->data);
            if ($this->Splits->save($split)) {
                $this->Flash->success(__('The split has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The split could not be saved. Please, try again.'));
            }
        }
        $activities = $this->Splits->Activities->find('list', ['limit' => 200]);
        $this->set(compact('split', 'activities'));
        $this->set('_serialize', ['split']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Split id.
     * @return \Cake\Network\Response|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $split = $this->Splits->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $split = $this->Splits->patchEntity($split, $this->request->data);
            if ($this->Splits->save($split)) {
                $this->Flash->success(__('The split has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The split could not be saved. Please, try again.'));
            }
        }
        $activities = $this->Splits->Activities->find('list', ['limit' => 200]);
        $this->set(compact('split', 'activities'));
        $this->set('_serialize', ['split']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Split id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $split = $this->Splits->get($id);
        if ($this->Splits->delete($split)) {
            $this->Flash->success(__('The split has been deleted.'));
        } else {
            $this->Flash->error(__('The split could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
