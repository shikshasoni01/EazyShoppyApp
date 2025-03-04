package com.eazyapp.service;

import com.eazyapp.dto.UserDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.requestwrapper.UserLoginRequestWrapper;
import com.eazyapp.requestwrapper.UserRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    void createUser(UserRequestWrapper userRequestWrapper) throws EazyShoppyException;

    UserDTO getUserById(long id) throws EazyShoppyException;

    List<UserDTO> getAllUser() throws EazyShoppyException;

     long login(UserLoginRequestWrapper userLoginRequestWrapper) throws EazyShoppyException;

    boolean logout( ) throws EazyShoppyException;
}
