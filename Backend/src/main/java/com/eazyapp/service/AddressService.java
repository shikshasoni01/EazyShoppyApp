package com.eazyapp.service;

import com.eazyapp.dto.AddressDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.requestwrapper.AddressRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AddressService {
    void createAddress(AddressRequestWrapper addressRequestWrapper) throws EazyShoppyException;

    AddressDTO getAddressById(long id) throws EazyShoppyException;

    List<AddressDTO> getAllAddresses() throws EazyShoppyException;

    List<AddressDTO> getAddressesByUserId(Long userId) throws EazyShoppyException;
}
