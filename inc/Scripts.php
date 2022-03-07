<?php 


namespace CasautoCustomInventory;

class Scripts{

    public function __construct()
    {
        add_action( 'wp_enqueue_scripts', array($this, 'addScripts') );
    }

    public function addScripts(){
        if(is_page("inventory")){
          
            wp_enqueue_script('custom-inventory',  plugin_dir_url(__DIR__)  . '/build/js/index.js', array('wp-element'));
            wp_enqueue_style('custom-inventory-css',  plugin_dir_url(__DIR__)  . '/build/css/main.css');
         
        }
      
      
    }
}