package com.eazyapp.requestwrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestWrapper {

    private String name;

    private String email;

    private String phoneNumber;
    //private String uniqueId;

    private String password;
    private long roleId;

}
