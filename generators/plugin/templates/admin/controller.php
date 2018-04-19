<?php

class ControllerExtension<%= className %> extends Controller {
    private $error = array();

    public function index()
    {
        $this->load->language('extension/<%= pluginType %>/<%= pluginName %>'); // load strings

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/setting');

        // Save settings on OK button
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('<%= pluginNamespace %>', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=<%= pluginType %>', true));
        }

        // Set breadcrumbs
        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=<%= pluginType %>', true)
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title'),
            'href' => $this->url->link('extension/<%= pluginType %>/<%= pluginName %>', 'user_token=' . $this->session->data['user_token'], true)
        );

        // TODO: add your code here

        // Green button
        $data['action'] = $this->url->link('extension/<%= pluginType %>/<%= pluginName %>', 'user_token=' . $this->session->data['user_token'], true);

        // Cancel button
        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=<%= pluginType %>', true);

        $data['user_token'] = $this->session->data['user_token'];

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/<%= pluginType %>/<%= pluginName %>', $data));
    }

    /*
     * Uncomment if your plugin will work with DB
     *
    public function install(){
        if ($this->user->hasPermission('modify', 'marketplace/extension')) {
            $this->load->model('extension/payment/<%= pluginName %>');

            $this->model_extension_<%= pluginNamespace %>->install(); // Don't forget to uncomment method in model.php
        }
    }

    public function uninstall(){
        if ($this->user->hasPermission('modify', 'marketplace/extension')) {
            $this->load->model('extension/payment/<%= pluginName %>');

            $this->model_extension_<%= pluginNamespace %>->uninstall(); // Don't forget to uncomment method in model.php
        }
    }*/

    public function validate(){
        if (!$this->user->hasPermission('modify', 'extension/payment/<%= pluginName %>')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        // TODO: add your validation code here

        return !$this->error;
    }
}
