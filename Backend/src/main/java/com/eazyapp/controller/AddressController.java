package com.eazyapp.controller;

import com.eazyapp.dto.AddressDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.requestwrapper.AddressRequestWrapper;
import com.eazyapp.service.AddressService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/create")
    public ResponseEntity<JSONObject> createAddress(@RequestBody AddressRequestWrapper addressRequestWrapper) throws EazyShoppyException {
        addressService.createAddress(addressRequestWrapper);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Address created successfully");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getAllAddresses")
    public ResponseEntity<JSONObject> getAllAddresses() throws EazyShoppyException {
        List<AddressDTO> addresses = addressService.getAllAddresses();
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Addresses listed successfully", addresses);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getAddressById")
    public ResponseEntity<JSONObject> getAddressById(@RequestParam Long id) throws EazyShoppyException {
        AddressDTO address = addressService.getAddressById(id);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Address retrieved successfully", address);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getAddressesByUserId")
    public ResponseEntity<JSONObject> getAddressesByUserId(@RequestParam Long userId) throws EazyShoppyException {
        List<AddressDTO> addresses = addressService.getAddressesByUserId(userId);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Addresses retrieved successfully", addresses);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}