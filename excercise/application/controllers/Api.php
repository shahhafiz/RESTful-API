<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Api extends RestController {
    public function __construct(){
        parent::__construct();
        $this->load->model('Cms_login_model','model');

        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
          die();
        }
    }
    
    function index_get(){
        $login_ID = $this->get('login_ID');
        
        $auth = $this->get('auth');
        $login_name = $this->get('login_name');
        $login_password = $this->get('login_password');

        if($auth == null || $auth == 'false'){
          if($login_ID == null){
            $user = $this->model->getUser();
          } else {
            $user = $this->model->getUser($login_ID);
          }
          
          if($user){
            $this->response( $user, 200 );
          } else {
            $this->response( "id not found");
          }
        } else if ($auth == 'true'){ //Authenticate user
          $user = $this->model->authenticateUser($login_name, $login_password);
          if($user){
            $this->response( $user, 200 );
          } else {
            $this->response( "user not found",404);
          }
        }
    }

    function index_post(){
        $data = [
          'login_name' => $this->post('login_name'),
          'login_password' => $this->post('login_password'),
          'mobile_no' => $this->post('mobile_no'),
          'gender' => $this->post('gender')
        ];
    
        if($this->model->createUser($data) > 0){
          $this->response([
            'status' => true,
            'message' => 'New user created.'
          ], 200 );
        } else {
          // $this->response( {message: "failed to create new user!"});
        } 
    }

    function index_delete(){
        $login_ID = $this->delete('login_ID');
        if($login_ID == null){
          $this->response( "provide an id");
        } else {
          if($this->model->deleteUser($login_ID) > 0){
            $this->response( "deleted" );
          } else {
            $this->response( "id not found");
          }
        }
    }

    function index_put(){
        $login_ID = $this->put('login_ID');
        $data = [
            'login_name' => $this->put('login_name'),
            'login_password' => $this->put('login_password'),
            'mobile_no' => $this->put('mobile_no'),
            'gender' => $this->put('gender')
        ];
      
        if($this->model->updateUser($data, $login_ID) > 0){
          $this->response( "user data has been updated");
        } else {
          $this->response( "failed to update new data!");
        } 
      }
}