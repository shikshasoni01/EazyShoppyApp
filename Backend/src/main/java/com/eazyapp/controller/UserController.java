package com.eazyapp.controller;

import com.eazyapp.dto.UserDTO;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.requestwrapper.UserLoginRequestWrapper;
import com.eazyapp.requestwrapper.UserRequestWrapper;
import com.eazyapp.service.UserService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<JSONObject> createUser(@RequestBody UserRequestWrapper userRequestWrapper) {
        System.out.println("create user Start");
        userService.createUser(userRequestWrapper);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "User Created Successfully ");

        System.out.println("create user end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping(value ="/login")
    public ResponseEntity<JSONObject> login(
            @RequestBody UserLoginRequestWrapper userLoginRequestWrapper
    )  {

        System.out.println("login user Start");

        long userId= userService.login(userLoginRequestWrapper);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Login Successful",userId);

        System.out.println("login user end");

        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @PostMapping(value ="/logout")
    public ResponseEntity<JSONObject> logout()  {

        System.out.println("logout user Start");

        boolean userId= userService.logout();
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Logout Successful",userId);

        System.out.println("logout user end");

        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("/getUserById")
    public ResponseEntity<JSONObject> getUserById(@RequestHeader long id) {
        System.out.println("get user Start");
        UserDTO userDTO=userService.getUserById(id);

        JSONObject data = ResponseFormatter.formatter("Success", 200, "User Listed Successfully ",userDTO);

        System.out.println("get user end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<JSONObject> getAllUsers() {
        System.out.println("get user Start");

        List<UserDTO> userDTOS=userService.getAllUser();
        JSONObject data = ResponseFormatter.formatter("Success", 200, "User Listed Successfully ",userDTOS);

        System.out.println("get user end");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}

