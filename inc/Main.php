<?php

namespace CasautoCustomInventory;

class Main{
    public function __construct()
    {
    add_filter('template_include', array($this, 'loadTemplate'), 99);
     
    }

    function loadTemplate($template) {
        
        if (is_page('inventory')) {
           
          return plugin_dir_path(__FILE__) . 'template.php';
        }
        return $template;
      }
  
}