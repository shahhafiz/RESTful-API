<?php 

class Cms_login_model extends CI_Model{
  public function getUser($id = null){
    if ($id === null) {
      return $this->db->get('cms_login')->result_array();
    } else {
      return $this->db->get_where('cms_login',['login_ID' => $id])->result_array();
    }
  }

  public function deleteUser($id){
    $this->db->delete('cms_login',['login_ID' => $id]);
    return $this->db->affected_rows();
  }

  public function createUser($data){
    $this->db->insert('cms_login', $data);
    return $this->db->affected_rows();
  }

  public function updateUser($data, $id){
    $this->db->update('cms_login',$data, array('login_ID' => $id));
    return $this->db->affected_rows();
  }

  public function authenticateUser($name, $password){
    return $this->db->get_where('cms_login',['login_name' => $name, 'login_password' => $password])->result_array();
  }
}
?>