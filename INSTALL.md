# This is quick install HOWTO to get you started
## [draft] - TODO

1. Clone this repo and change directory to the repo
1. Install ansible
1. Create a temporary ansible inventory
>   (Used for the local setup only and removed when done)
>   host:~/cityhall$ vi inv.remove
>  
>   [cityhall]
>   myfqdn.domain.name ansible_connection=local ansible_become_pass='mysudopassword' 
>  
>   [esc][esc]:wq
>  
>   host:~/cityhall$ 
1. Run the ansible playbook init.yml
>  This creates you customized config and the config/* directories. Most
>  of this config will endup in group_vars/all.yml. So check this file after done to see
>  if any config changed are needed.
>
>  Example:
>  host:~/cityhall$ ansible-playbook init.yml -i inv.remove
>  ...
>  Answer prompts. See README for details [TODO]
>  ...
>  host:~/cityhall$
>  host:~/cityhall$ rm inv.remove
>  host:~/cityhall$ vi group_vars/all.yml (update and config)
1. Edit the site inventory file
>  host:~/cityhall$ vi config/inventory/inventory
>
>  Recommended steps:
>  Always check you connections manually first with the user/key/pass that you put in your inventory. A easy
>  way is to do: ansible -m setup myremote.host.name
>
   * setup 2 servers that will be the primary and secondary nameserver ready to be deployed
     to by ansible role, add authorized_keys, etc.
   * edit the inventory file groups [cityhall], [bind_service], [backup_controller], [deflect_controller]
     Note: all these groups have our cityhall controller host and then the bind_service with have the 2 servers
           you setup above and the cityhall server also.
   * copy config/zones.yml.example to config/zones.yml and edit it to fit you needs.
   * copy config/zones/mydomain.co.yml.example config/zones/your.domain.yml and edit it to fit you needs.
     Note: The configured zones in config/zones.yml needs to have the matching config/zones/your.domain.yml
   * run the site.yml playbook
     host:~/cityhall$ ansible-playbook site.yml
     Note: Sometimes in this step ansible gets upgraded and then later roles fail. Usually, if this happens, you can
           just run the playbook again.
   * Now add any other hosts / groups in the inventory files.
     Note: That for the monitoring server. Add [icinga_server] first and run the playbook again or with the -l option.
           This will get the server built first to that the [icinga_hosts] can easily get their keys and access.

## [TODO] -- expand below
1. Setup your edges with config/edges.yml [TODO] example
1. Setup autodeflect with its init.yml. root?
1. Setup dnet. builddnet
1. Setup eqpress with its inits.
1. Setup eqbackup
1. [cityhall] any letsencrypt non-auto.yml for sites that need letsencrypt certs but are not deflect controlled
1. [cityhall] add files beat keys
1. With edge key loaded and as root. Build edges ansible-playbook deploy.yml in cityhall
    This only works with autodeflect and config/edges.yml setup. You can
    ansible-playbook site.yml -l cityhall --tags='newedges' to update any changed made. The edge inventory
    and playbook are dynamic based on setups

Note: There are firewall overides, etc that you can do to customize things in the config/* directory. Also note
      that ```most``` configuration made in init can be changed in group_vars/all.yml
