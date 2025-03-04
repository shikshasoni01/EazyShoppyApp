package com.eazyapp.service.Implementation;

import com.eazyapp.dto.RoleDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Role;
import com.eazyapp.repository.RoleRepository;
import com.eazyapp.requestwrapper.RoleRequestWrapper;
import com.eazyapp.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public void  createRole(RoleRequestWrapper roleRequestWrapper) throws EazyShoppyException {

    Optional<Role> role= roleRepository.getRoleByRoleType(roleRequestWrapper.getRoleType());

    if (role.isEmpty()){
        Role newRole= new Role();
        newRole.setRoleType(roleRequestWrapper.getRoleType().toUpperCase());
        roleRepository.save(newRole);
    }else {
        throw  new EazyShoppyException("Role already exist",400);
    }
    }

    public Role getRoleById(long id) throws EazyShoppyException
    {
        Optional<Role> role= roleRepository.findById(id);
        if(role.isPresent())
        {
            return role.get();
        }
        else {
            throw  new EazyShoppyException("Role for this id  not exist",400);
        }
    }
    public List<RoleDTO> getAllRole() throws EazyShoppyException
    {
       List<Role> roles= roleRepository.findAll();
       List<RoleDTO> roleDTOS=new ArrayList<>();
       for (Role role: roles)
       {
           RoleDTO roleDTO=new RoleDTO();
           roleDTO.setId(role.getId());
           roleDTO.setRoleType(role.getRoleType());
           roleDTOS.add(roleDTO);
       }
       return roleDTOS;
    }
}
