package com.eazyapp.service.Implementation;

import com.eazyapp.dto.AddressDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Address;
import com.eazyapp.model.User;
import com.eazyapp.repository.AddressRepository;
import com.eazyapp.repository.UserRepository;
import com.eazyapp.requestwrapper.AddressRequestWrapper;
import com.eazyapp.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createAddress(AddressRequestWrapper addressRequestWrapper) throws EazyShoppyException {

        User user = userRepository.findById(addressRequestWrapper.getUserId())
                .orElseThrow(() -> new EazyShoppyException("User not found", 400));

        Address address = new Address();
        address.setStreet(addressRequestWrapper.getStreet());
        address.setCity(addressRequestWrapper.getCity());
        address.setState(addressRequestWrapper.getState());
        address.setZipCode(addressRequestWrapper.getZipCode());
        address.setCountry(addressRequestWrapper.getCountry());
        address.setUser(user);

        addressRepository.save(address);
    }

    @Override
    public AddressDTO getAddressById(long id) throws EazyShoppyException {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new EazyShoppyException("Address not found", 400));

        return convertToDTO(address);
    }

    @Override
    public List<AddressDTO> getAllAddresses() throws EazyShoppyException {
        List<Address> addresses = addressRepository.findAll();
        return addresses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AddressDTO> getAddressesByUserId(Long userId) throws EazyShoppyException {
        List<Address> addresses = addressRepository.findAddressesByUserId(userId);
        return addresses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AddressDTO convertToDTO(Address address) {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState());
        addressDTO.setZipCode(address.getZipCode());
        addressDTO.setCountry(address.getCountry());
        addressDTO.setUserId(address.getUser().getId());
        return addressDTO;
    }
}