package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {


    private Long id;
    private String name;

    private String email;

    private String phoneNumber;

    private String uniqueId;

    private String roleType;

}
