package com.eazyapp.controller;

import com.eazyapp.dto.RoleDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.model.Role;
import com.eazyapp.requestwrapper.RoleRequestWrapper;
import com.eazyapp.service.RoleService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/create")
    public ResponseEntity<JSONObject> createRole(@RequestBody RoleRequestWrapper roleRequestWrapper) throws EazyShoppyException
    {
        System.out.println("create role Start");
        roleService.createRole(roleRequestWrapper);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Role Created Successfully ");

        System.out.println("end role end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/getAllRole")
    public ResponseEntity<JSONObject> getAllRole()
    {
        System.out.println("get role Start");
        List<RoleDTO> roles=roleService.getAllRole();

        JSONObject data = ResponseFormatter.formatter("Success", 200, "Role Listed Successfully ",roles);

        System.out.println("get role end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/getRoleById")
    public ResponseEntity<JSONObject> getRoleById(@RequestHeader Long id)
    {
        System.out.println("get role Start");
        Role role=roleService.getRoleById(id);

        JSONObject data = ResponseFormatter.formatter("Success", 200, "Role Listed Successfully ",role);

        System.out.println("get role end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
