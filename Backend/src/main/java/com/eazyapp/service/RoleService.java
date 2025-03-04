package com.eazyapp.service;

import com.eazyapp.dto.RoleDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Role;
import com.eazyapp.requestwrapper.RoleRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {

    void createRole(RoleRequestWrapper roleRequestWrapper) throws EazyShoppyException;

    Role getRoleById(long id) throws EazyShoppyException;

    List<RoleDTO> getAllRole() throws EazyShoppyException;
}
