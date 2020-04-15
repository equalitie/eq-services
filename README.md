# City Hall

Ansible and scripts to build and maintain infrastructure.
Including:

- Docker
- Bind
- Deflect
  - autodeflect
  - eQpress [controller]
  - edgemanage
  - Apache Traffic Server edges w/banjax
- eQbackup [controller]
- Icinga [monitoring]
- Letsencrypt [server]

## Requirements

- Debian 9+
  - [Ansible 2.8+](<https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html>)
  - git `apt-get install git`
  - sudo `apt-get install sudo`

## Quick Install

- Clone CityHall repository in:  `/opt`
  - `git clone https://github.com/equalitie/cityhall.git`
- Install Ansible 2.8+
- Edit the temporary inventory file
- Run: `ansible-playbook init.yml -i my_cityhall_local_inventory_file`

## Examples 

Note: All servers in inventory must have the user and ssh setup first.

Building the controller

- clone this project to the location you want it to live.

  - ie;
    - `cd /opt`
    - `git clone https://github.com/equalitie/cityhall.git`
    - `cd cityhall`

- Configure the ansible

  - create a simple inventory file with just [cityhall] group information for localhost
    Example:

    ```
    [cityhall]
    fqdn_of_cityhall ansible_connection=local ansible_become_pass='the_become_password'
    ```

  - The run the init ansible playbook
    `ansible-playbook init.yml -i my_cityhall_local_inventory_file`
     see init prompts below

  - setup your config/inventory/invenory file

    - Recommend doing this one group at a time.
      Example would be to:
      - first add cityhall group
      - run the playbook
      - setup bind_service
        - also need to setup DNS names, etc in config/zones.yml. See config/zones.yml.example
      - run playbook
      - etc

  - setup config/edges.yml
  - run ```ansible-playbook site.tml --tags=newedges```

  - a full run looks like: ```ansible-playbook site.yml```

  - after the run you need to setup other controller pieces like:
    ```autodeflect, eqbackup, eqpress```
    Some have their own init.yml

## Deflect Edge Filebeat

add config/edges.yml fields

```
    filebeat:
      - remote: test1
      - remote: test2
```

under the dnet.

This will be the host name. The deflect_site_domain get automatically appened

Then add the 3 certs in ```config/filebeat/{rootca.hostname.pem,edgecert.hostname.pem,edgecert.hostname.key}``` 

## License

## Author Information
