<?php 
/*
Plugin Name: CAS Auto Custom Inventory
Plugin URI: 
Description: This plugin has the purpose to create a custom template for inventory
Author:
Author URI:
Version: 0.1
*/

use CasautoCustomInventory\EndPoint;
use CasautoCustomInventory\Main;
use CasautoCustomInventory\Scripts;
// use CasautoCustomInventory\settings\SettingsHomePage;

defined ('ABSPATH') or die ('Hey, you can\t access this file');

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}

if(!class_exists('CasautoCustomInventory')){
    class CasautoCustomInventory{
        private static $instance = null;
        
      
        function __construct()
        {
              
           $this->register();
        
        }
        public function register(){
          $main = new Main();
         $scripts= new Scripts();
          $endpoint = new EndPoint();
        //  $settingsHome = new SettingsHomePage();
        }

        public static function getInstance()
          {
              if (self::$instance == null) {
                  
                  self::$instance = new CasautoCustomInventory();
              }
  
              return self::$instance;
          }

          function activate()
          {
  
              //Flush rewrite rules
              flush_rewrite_rules();
          }
  
          function deactivate()
          {
              //Flush rewrite rules
  
              flush_rewrite_rules();
          }
          static function uninstall()
          {
              flush_rewrite_rules();
          }  
    }
}

if(class_exists('CasautoCustomInventory')){
    
    $casautoCustomInventory =CasautoCustomInventory::getInstance();
}
//activation
register_activation_hook(__FILE__, array($casautoCustomInventory, 'activate'));

//deactivate
register_deactivation_hook(__FILE__, array($casautoCustomInventory, 'deactivate'));

//uninstall

register_uninstall_hook(__FILE__, 'CasautoCustomInventory::uninstall');