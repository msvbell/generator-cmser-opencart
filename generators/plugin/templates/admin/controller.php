<?php

class ControllerExtension<%= className %> extends Controller {
    private $error = array();

    public function index() {
        $this->load->language('extension/<%= pluginType %>/<%= pluginName %>');

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/setting');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('<%= pluginNamespace %>', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');

            $this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=<%= pluginType %>', true));
        }
    }